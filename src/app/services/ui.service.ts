import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showLogin: boolean = false;
  private subjectLogin = new Subject<any>();

  constructor() { }

  togleLoginTask(): void {
    this.showLogin = !this.showLogin;
    this.subjectLogin.next(this.showLogin);
  }

  onTogleLogin(): Observable<any> {
    return this.subjectLogin.asObservable();
  }
}
