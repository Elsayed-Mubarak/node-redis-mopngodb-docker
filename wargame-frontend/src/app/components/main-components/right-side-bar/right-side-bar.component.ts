import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-right-side-bar',
  templateUrl: './right-side-bar.component.html',
  styleUrls: ['./right-side-bar.component.scss']
})
export class RightSideBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  scoreBoard() {
    this.router.navigate(["/score-board"], { replaceUrl: false });
  }

  challenges() {
    this.router.navigate(["/challenges"], { replaceUrl: false });
  }

}
