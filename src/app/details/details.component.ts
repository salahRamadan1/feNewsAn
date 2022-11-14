import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthNewsService } from '../componentService/auth-news.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  idUser: any;
  err: string = '';
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _AuthNewsService: AuthNewsService
  ) {
    this.idUser = this._ActivatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getById();
  }
  dataNewsDetails: any = [];
  getById() {
    this._AuthNewsService.getNewsById(this.idUser).subscribe((res) => {
      if (res.message == 'success') {
        this.dataNewsDetails = res.news;
      } else {
        this.err =
          '<h1 class="text-center text-danger pt-5 mt-5">Maybe there is a problem</h1>';
      }
    });
  }
}
