import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../componentService/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  islogeIn: boolean = false;
  constructor(private _AuthService: AuthService , private _Router:Router) {}

  ngOnInit(): void {
    this._AuthService.decodeUser.subscribe(() => {
      if (this._AuthService.decodeUser.getValue() == null) {
        this.islogeIn = false;
      } else {
        this.islogeIn = true;
      }
    });
  }

  logOut() {
    this._AuthService.removeUserToken();
    this._Router.navigate(['login'])

  }
}
