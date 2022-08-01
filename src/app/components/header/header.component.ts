import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  username: string | null = "";
  isUserLoggedIn: boolean = false;
  subscription: Subscription;

  constructor(private authService: AuthService) {
    this.subscription = this.authService.onTogleLogin().subscribe(value => {this.isUserLoggedIn = value});
    this.subscription = this.authService.onTogleUser().subscribe(value => {this.username = value});
    this.authService.checkTask();
    this.authService.checkUser();
    this.username = "";
    if(this.isUserLoggedIn)
      this.username = this.authService.getUserName();
    this.title = "";
  }

  ngOnInit(): void {
  }

}
