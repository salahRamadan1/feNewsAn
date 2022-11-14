import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthNewsService } from '../componentService/auth-news.service';
import { AuthService } from '../componentService/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _AuthNewsService: AuthNewsService
  ) {
    this.getNewsUser();
  }

  ngOnInit(): void {
    this.getNewsUser();
  }

  clear(){
    (<HTMLInputElement> document.getElementById('title')).value='',
    (<HTMLInputElement> document.getElementById('desc')).value=''

  }
  term:string = '';
  // form news
  formNews: FormGroup = new FormGroup({
    title: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
    desc: new FormControl(null, [
      Validators.required,
      Validators.minLength(20),
    ]),
  });
  // form edit news
  editNews: FormGroup = new FormGroup({
    title: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]),
    desc: new FormControl(null, [
      Validators.required,
      Validators.minLength(20),
    ]),
  });
  // function add news
  addNote() {
    let data = {
      title: this.formNews.value.title,
      desc: this.formNews.value.desc,
      createdBy: this._AuthService.decodeUser.getValue().user._id,
      token: localStorage.getItem('userToken'),
    };
    this._AuthNewsService.addNews(data).subscribe((res) => {
      this.getNewsUser();
    });
  }
  // function get news for user
  getNewsUser() {
    this._AuthNewsService.getNewsUser().subscribe((res) => {
      
      if(res.message == 'success'){
        
        this.dataNew = res.data;
      } 
    });
  }
  // function  delete news
  delete(id: string) {
    let data = {
      _id: id,
      token: localStorage.getItem('userToken'),
    };
    this._AuthNewsService.deleteNews(data).subscribe((res) => {
      this.getNewsUser();
    });
  }
  id: string = '';  
  dataNew: any = [];
  // functions update  
  //  function edit
  idEdit(newsId: string) {
    this.id = newsId;
    for (let i = 0; i < this.dataNew.length; i++) {
      if (this.dataNew[i]._id == newsId) {
        this.editNews.controls['title'].setValue(this.dataNew[i].title);
        this.editNews.controls['desc'].setValue(this.dataNew[i].desc);
      }
    }
  }
 
// function update news
  updateNews() {
    let data = {
      title: this.editNews.value.title,
      desc: this.editNews.value.desc,
      _id: this.id,
      token:<string>localStorage.getItem('userToken')
    };
    this._AuthNewsService.updateNews(data).subscribe((res) => {
      
      this.getNewsUser();
      if(res.message == 'success'){
        alert('success')
      }
      
    });
  }
}
