import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../componentService/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  ngOnInit(): void {}
  RegisterForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required]),
    age: new FormControl(null, [Validators.required, Validators.min(16)]),
  });
  errApi: string = '';
  successApi: string = '';
  register() {
    this._AuthService
      .registerNewsUser(this.RegisterForm.value)
      .subscribe((data) => {
        if (data.message == 'success') {
          this.successApi =
            'Register is done  Wait 3 second for it to take you to the login page ';

          this._Router.navigate(['login']);
        } else {
          this.errApi = 'EMAIL ALREADY EXIT';
        }
      });
  }
}
