/**
    * @description      : 
    * @author           : dev1
    * @group            : 
    * @created          : 03/06/2021 - 13:57:07
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 03/06/2021
    * - Author          : dev1
    * - Modification    : 
**/
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "./auth.service";
import { TokenService } from "./token.service";
import { Observable, of } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private auth: AuthService,
    private httpClient: HttpClient
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (this.tokenService.token !== null) {
      return of(true);
    } else {
      return of(false);
      // return this.userService.generateCredentials().pipe(
      //   map(res => {
      //     this.auth.logIn
      //     localStorage.setItem("userPermission", res['token']);
      //     return true;
      //   }),
      //   catchError((err) => {
      //     this.auth.logout();
      //     return of(false);
      //   })
      // )
    }
  }
}
