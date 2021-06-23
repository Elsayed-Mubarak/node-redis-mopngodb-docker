import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SidesModule } from '../sides/sides.module';;
import { SharedModules } from '../shared/shared-modules.module';
import { ChallengesComponent } from 'src/app/components/challenges/challenges.component';
import { ChallengeItemComponent } from 'src/app/components/challenges/challenge-item/challenge-item.component';
import { ChallengePageComponent } from 'src/app/components/challenges/challenge-page/challenge-page.component';

const routes: Routes = [
  {
    path: '',
    component: ChallengesComponent
  }
]

@NgModule({
  declarations: [
    ChallengesComponent,
    ChallengeItemComponent,
    ChallengePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SidesModule,
    SharedModules,
  ]
})
export class ChallengesModule { }
