import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CountdownModule, CountdownGlobalConfig, CountdownConfig } from 'ngx-countdown';

import { LandingComponent } from 'src/app/components/landing/landing.component';
import { SidesModule } from '../sides/sides.module';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  }
]


@NgModule({
  declarations: [
    LandingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CountdownModule,
    SidesModule
  ],
  providers: [
    { provide: CountdownGlobalConfig },
  ]
})
export class LandingModule { }
