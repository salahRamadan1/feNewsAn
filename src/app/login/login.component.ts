import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../componentService/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  ngOnInit(): void {}
  errApi: string = '';
  loginSuccess: string = '';
  loginUser: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });
  logIn() {
    this._AuthService.loginNewsUser(this.loginUser.value).subscribe((res) => {
      if (res.message == 'success') {
        this.loginSuccess =
          'Log in  is done  Wait 3 second for it to take you to the login page ';
        localStorage.setItem('userToken', res.token);
        this._AuthService.setUserInfo();
        setTimeout(() => {
          this._Router.navigate(['home']);
        }, 3000);
      }
      res.message == 'password incorrect'
        ? (this.errApi = 'password incorrect')
        : '';

      res.message == 'Email NOT FOUND' ? (this.errApi = 'Email NOT FOUND') : '';
    });
  }
}
