import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: string = "";
  password: string = "";
  formData: FormGroup;

  constructor(private authService : AuthService, private router : Router) {
    this.formData = new FormGroup({
      userName: new FormControl("user"),
      password: new FormControl("user"),
   });
  }

  ngOnInit(): void {
  }

  onClickSubmit(data: any) {
    this.userName = data.userName;
    this.password = data.password;

    this.authService.login({id:0, username: this.userName, password: this.password})
      .subscribe( data => {
        if(data) {
          this.authService.togleLoginTask();
          this.authService.saveUser(this.userName, this.password);
          this.authService.checkUser();
          this.router.navigate(['/issues']);
        }
    });
 }

}
