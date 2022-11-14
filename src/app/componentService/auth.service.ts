import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient , private _Router:Router ) {
     if(localStorage.getItem('userToken') != null) {
   this.setUserInfo()
     }
     else{
    this.removeUserToken()
     }
  }
   decodeUser:any = new BehaviorSubject(null)
  setUserInfo() {
    let token = localStorage.getItem('userToken');
   this.decodeUser.next(jwtDecode( <string>token));
  
  }
  removeUserToken(){
    localStorage.removeItem('userToken')
    this.decodeUser.next(null)
    // this._Router.navigate(['/home'])
  }

  registerNewsUser(obj: string): Observable<any> {
    return this._HttpClient.post('http://localhost:2000/user/singUp', obj);
  }

  loginNewsUser(obj: string): Observable<any> {
    return this._HttpClient.post('http://localhost:2000/user/signIn', obj);
  }

}
