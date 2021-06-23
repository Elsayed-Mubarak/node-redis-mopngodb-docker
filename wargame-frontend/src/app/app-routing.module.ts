import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./modules/landing/landing.module").then((m) => m.LandingModule),
  },
  {
    path: "score-board",
    loadChildren: () =>
      import("./modules/score-board/score-board.module").then((m) => m.ScoreBoardModule),
  },
  {
    path: "challenges",
    loadChildren: () =>
      import("./modules/challenges/challenges.module").then((m) => m.ChallengesModule),
  },
  {
    path: "rest-password",
    loadChildren: () =>
      import("./modules/rest-password/rest-password.module").then((m) => m.ResetPasswordModule),
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
