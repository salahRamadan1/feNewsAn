import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { AuthService } from './auth.service';
  
@Injectable({
  providedIn: 'root'
})
export class AuthNewsService {

  constructor( private _HttpClient:HttpClient , private _AuthService:AuthService) { }
  //   to add news
  addNews(obj:any):Observable<any>{
    return  this._HttpClient.post('http://localhost:2000/news/addNews' , obj)
  }
  //  to get user news
  getNewsUser():Observable<any>{
  return this._HttpClient.get('http://localhost:2000/news/userNews' , {headers:{
     _id:this._AuthService.decodeUser.getValue().user._id
}})
  }
  // delete
  deleteNews(obj:any):Observable<any>{
    return  this._HttpClient.delete('http://localhost:2000/news/deleteNews' , {body:obj})


  }
  // update
  updateNews(obj:any):Observable<any>{
    return  this._HttpClient.put('http://localhost:2000/news/updateNews' , obj)
    
  }
  // get all news
  getAllNews():Observable<any>{
    return this._HttpClient.get('http://localhost:2000/news/getAllNews')
  }
//  get new by id 
  getNewsById(obj:any):Observable<any>{

    return this._HttpClient.get('http://localhost:2000/news/getById' , {headers:{
      _id:obj
    }})
  }

}
