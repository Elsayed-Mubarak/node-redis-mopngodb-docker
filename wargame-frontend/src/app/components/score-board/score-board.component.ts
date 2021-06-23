import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss']
})
export class ScoreBoardComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  arr = [1, 2, 4, 5, 6, 9];

  pageSize: number = 6;
  currentPage: number = 0;
  length: number = 300;
  // pageIndex: number = 0;

  constructor() { }

  ngOnInit() {
    this.paginator.page.subscribe(data => {
      this.currentPage = data.pageIndex;
    });
  }

}
