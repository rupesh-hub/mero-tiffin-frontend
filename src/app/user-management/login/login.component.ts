import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/_services/header.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  
  username: string | any;
  password: string | any;
  isSubmitted: boolean = true;
  errorMessage: string = '';
  public isLoggedIn: boolean = false;
  public loginForm: any;

  constructor(private _headerService: HeaderService, private _router: Router) {}

  ngOnInit(): void {
    this._headerService.isLoggedIn.subscribe((response: boolean) => {
      if (response) this._router.navigate(['/products']);
      this.isLoggedIn = response;
    });
  }

  public loginUser(loginForm: NgForm): void {
    this._headerService.isLoggedIn.next(true);
    this._router.navigate(['/products']);
  }
}
