import { Component, OnInit } from '@angular/core';
 
import { AuthNewsService } from '../componentService/auth-news.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private _AuthNewsService: AuthNewsService  ) {}

  ngOnInit(): void {
    this.getAllNews();
  }
  newsData: any = [];
 term:string = ''

 
  getAllNews() {
    this._AuthNewsService.getAllNews().subscribe((res) => {
      if (res.message == 'success') {
        this.newsData = res.data;
      }
    
    });
  }
}
