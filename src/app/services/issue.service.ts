import { Injectable } from '@angular/core';
import { Issue } from '../components/issue/issue';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const httpOptions = { headers: new HttpHeaders( { 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private issueRestUrl = 'http://localhost:8000/api/issue';

  constructor(private httpClient : HttpClient) {

  }

  getIssues() : Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(this.issueRestUrl, httpOptions)
    .pipe(
       catchError(this.httpErrorHandler)
    );
 }

 getIssue(id: number) : Observable<Issue> {
    return this.httpClient.get<Issue>(this.issueRestUrl + "/" + id, httpOptions)
    .pipe(
       retry(3),
       catchError(this.httpErrorHandler)
    );
 }

 addIssue(issue: Issue): Observable<Issue> {
  return this.httpClient.post<Issue>(this.issueRestUrl, issue, httpOptions)
  .pipe(
     retry(3),
     catchError(this.httpErrorHandler)
  );
}

 private httpErrorHandler (error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
       console.error("A client side error occurs. The error message is " + error.message);
    }
    else {
      console.error(
      "An error happened in server. The HTTP status code is "  + error.status + " and the error returned is " + error.message);
    }

    return throwError("Error occurred. Pleas try again");
 }

}
