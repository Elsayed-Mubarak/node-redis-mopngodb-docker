import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftSideBarComponent } from 'src/app/components/main-components/left-side-bar/left-side-bar.component';
import { RightSideBarComponent } from 'src/app/components/main-components/right-side-bar/right-side-bar.component';



@NgModule({
  declarations: [
    LeftSideBarComponent,
    RightSideBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LeftSideBarComponent,
    RightSideBarComponent
  ]
})
export class SidesModule { }
