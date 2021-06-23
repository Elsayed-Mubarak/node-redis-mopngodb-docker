import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RestPasswordComponent } from 'src/app/components/rest-password/rest-password.component';
import { SidesModule } from '../sides/sides.module';
//import { RankContentComponent } from 'src/app/components/score-board/rank-content/rank-content.component';
import { SharedModules } from '../shared/shared-modules.module';

const routes: Routes = [
  {
    path: '',
    component: RestPasswordComponent
  }
]

@NgModule({
  declarations: [
    RestPasswordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SidesModule,
    SharedModules,
  ]
})
export class ResetPasswordModule { }
