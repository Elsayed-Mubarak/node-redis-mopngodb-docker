import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rank-content',
  templateUrl: './rank-content.component.html',
  styleUrls: ['./rank-content.component.scss']
})
export class RankContentComponent implements OnInit {

  @Input() rankNo: number;
  @Input() pageIndex: number;
  @Input() pageSize: number;

  constructor() { }

  ngOnInit() {
  }

}
