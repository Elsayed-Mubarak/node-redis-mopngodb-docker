/**
    * @description      : 
    * @author           : dev1
    * @group            : 
    * @created          : 03/06/2021 - 13:56:28
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 03/06/2021
    * - Author          : dev1
    * - Modification    : 
**/
import { Injectable } from "@angular/core";
import { TokenService } from "./token.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";


@Injectable({
  providedIn: "root",
})
export class AuthService {
  userData = {};

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  public async logout() {
    this.dialog.closeAll();
    // this.userService.logout().subscribe(res => {
    // });
    // this.tokenService.logout();
    // this.cookieService.removeAllCookies();
    this.router.navigate(["/login"], { replaceUrl: true });
  }

  public logoutTemp() {
    this.tokenService.logoutTemp();
  }

  public async logIn(data) {
    this.tokenService.token = data["token"];

    // this.router.navigate(["/home"], { replaceUrl: false });
  }

  public logInTemp(data) {
    this.tokenService.tokenTemp = data["token"];
  }

}
