/**
    * @description      : 
    * @author           : dev1
    * @group            : 
    * @created          : 03/06/2021 - 13:58:00
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 03/06/2021
    * - Author          : dev1
    * - Modification    : 
**/
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  constructor(
  ) {}

  public get token(): string {
    return localStorage.getItem("userPermission");
  }

  public get tokenTemp(): string {
    return localStorage.getItem("tempPermission");
  }

  public get forgetToken(): string {
    return localStorage.getItem("permission");
  }

  public set token(token: string) {
    localStorage.setItem("userPermission", token);
  }

  public set tokenTemp(token: string) {
    localStorage.setItem("tempPermission", token);
  }

  public logout() {
    // this.mailService.inbox_mails$.next([]);
    // this.mailService.star_mails$.next([]);
    // this.mailService.sent_mails$.next([]);
    // this.mailService.spam_mails$.next([]);
    // this.mailService.junk_mails$.next([]);
    // this.userService.contactList$.next([]);
    // this.userService.pending_pages$.next([]);
    // this.userService.userInfo$.next(null);
    // this.userService.userInfo_update$.next(null);
    // this.mailService.count_inbox_mails$.next(null);
    // this.mailService.count_star_mails$.next(null);
    // this.mailService.count_spam_mails$.next(null);
    // this.mailService.count_sent_mails$.next(null);
    // this.mailService.count_junk_mails$.next(null);
    // this.userService.count_contactList$.next(null);
    // this.userService.count_pendingList$.next(null);
    // this.mailService.inbox_pages$.next([]);
    // this.mailService.star_pages$.next([]);
    // this.mailService.sent_pages$.next([]);
    // this.mailService.spam_pages$.next([]);
    // this.mailService.junk_pages$.next([]);
    // this.userService.pending_pages$.next([]);
    // this.userService.contacts_pages$.next([]);
    // this.mailService.count_inbox_mails_sidebar$.next(null);
    // this.mailService.count_star_mails_sidebar$.next(null);
    // this.mailService.count_spam_mails_sidebar$.next(null);
    // this.mailService.count_junk_mails_sidebar$.next(null);
    localStorage.removeItem("userPermission");
  }

  public logoutTemp() {
    localStorage.removeItem("tempPermission");
  }
}
