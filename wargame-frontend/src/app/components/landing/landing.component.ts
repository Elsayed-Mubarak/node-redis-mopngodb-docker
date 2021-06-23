import { Component, OnInit, ViewChild } from "@angular/core";
import { CountdownComponent, CountdownConfig } from "ngx-countdown";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent implements OnInit {
  @ViewChild("countdown", { static: false })
  private counter: CountdownComponent;
  moreThan24Hours: CountdownConfig;

  compDate: Date;
  dateToDay: Date;

  constructor() {}

  ngOnInit() {
    this.compDate = new Date();
    this.dateToDay =  new Date();
    let timeInseconds = 0;
    timeInseconds = ((this.compDate.getTime() / 1000) + 3 * 24 * 60 * 60) - (this.dateToDay.getTime() / 1000);
    this.moreThan24Hours = {
      leftTime: timeInseconds,
      format: "dd:HH:mm:ss",
      timezone: '+0000',
      prettyText: (text) => {
        return text
          .split(':')
          .map((v, index) => `<span class="item${index}">${v}</span>`)
          .join(':');
      },
    };
  }
}
