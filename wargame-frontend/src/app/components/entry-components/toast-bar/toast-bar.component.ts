/**
    * @description      : 
    * @author           : dev1
    * @group            : 
    * @created          : 03/06/2021 - 14:16:23
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 03/06/2021
    * - Author          : dev1
    * - Modification    : 
**/
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-toast-bar',
  templateUrl: './toast-bar.component.html',
  styleUrls: ['./toast-bar.component.scss']
})
export class ToastBarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
  }

}
