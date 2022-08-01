import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError, Subscription } from 'rxjs';
import { tap, delay, catchError, retry } from 'rxjs/operators';
import { User } from '../components/login/user';
import { Subject } from 'rxjs';

const httpOptions = { headers: new HttpHeaders( { 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserLoggedIn: boolean = false;
  private issueRestUrl = 'http://localhost:8000/api/login/';
  private subjectLogin = new Subject<any>();
  private subjectName = new Subject<any>();
  user?: User;

  constructor(private httpClient : HttpClient) {
    if(localStorage.getItem('userName') !== null)
      this.isUserLoggedIn = true;
    this.subjectLogin.next(this.isUserLoggedIn);
  }

  onTogleLogin(): Observable<any> {
    return this.subjectLogin.asObservable();
  }

  onTogleUser(): Observable<any> {
    return this.subjectName.asObservable();
  }

  checkUser()
  {
    this.subjectName.next(this.getUserName());
  }

  togleLoginTask(): void {
    this.isUserLoggedIn = !this.isUserLoggedIn;
    this.subjectLogin.next(this.isUserLoggedIn);
  }

  checkTask()
  {
    this.subjectLogin.next(this.isUserLoggedIn);
  }

  saveUser(userName: string, password: string)
  {
    localStorage.setItem('userName', userName);
    localStorage.setItem('password', password);
  }

  getUserName()
  {
    return localStorage.getItem('userName');
  }

  getPassword()
  {
    return localStorage.getItem('password');
  }

  login(user: User): Observable<User> {
    return this.httpClient.post<User>(this.issueRestUrl, user, httpOptions);
  }

  logout(): void {
    localStorage.removeItem('userName');
    localStorage.removeItem('password');
  }
}
