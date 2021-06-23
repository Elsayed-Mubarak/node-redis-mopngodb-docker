import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { HelperService } from 'src/app/core/helper/helper.service';
import { PasswordValidator } from 'src/app/core/validation/password.validator';
import { RestPasswordService } from 'src/app/services/rest-password.service';

@Component({
  selector: 'app-rest-password',
  templateUrl: './rest-password.component.html',
  styleUrls: ['./rest-password.component.scss']
})

export class RestPasswordComponent implements OnInit {
  restPasswordForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private restPasswordService: RestPasswordService,
    private helper: HelperService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.restPasswordForm = this.restPasswordFormInit();
  }

  restPasswordFormInit() {
    return this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(/(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]],
      newPassword: ['', [Validators.required, Validators.pattern(/(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]]
    }, { validator: PasswordValidator });
  }

  get password() {
    return this.restPasswordForm.get('password');
  }

  get newPassword() {
    return this.restPasswordForm.get('newPassword');
  }

  submitRestPasswordForm() {
    if (this.restPasswordForm.valid) {
      this.restPasswordService.restPassword(this.password.value).subscribe(data => {
        this.helper.alert(data['message']);
        this.router.navigate(['/login'], { replaceUrl: true });
        this.authService.logoutTemp();
      },
        err => {
          if (err === 'Unknown Error' || err === 'Too Many Requests') {
            this.helper.alert('Too Many requests from this team...Team Blocked...try again after one hour', true);
            this.authService.logoutTemp();
            this.authService.logout();
          } else if (err.includes('Too Many requests from this team...Team Blocked...try again after one hour')) {
            this.helper.alert(err, true);
            this.authService.logout();
          } else {
            this.helper.alert("Please Try Again Later", true);
          }
        });
    } else {
      if (this.restPasswordForm.get('password').errors && this.restPasswordForm.get('password').errors.required) {
        return this.helper.alert("Password required", true);
      } else if (
        this.restPasswordForm.get('password').errors &&
        (this.restPasswordForm.get('password').errors.pattern)
      ) {
        return this.helper.alert(
          "Password not allowed Must contain characters, numbers and at least one special and capital character",
          true
        );
      } else if (
        this.restPasswordForm.get('newPassword').errors &&
        this.restPasswordForm.get('newPassword').errors.required
      ) {
        return this.helper.alert("New Password Required", true);
      } else if (
        this.restPasswordForm.errors &&
        this.restPasswordForm.errors.misMatch
      ) {
        return this.helper.alert(
          "New password and password not match", true
        );
      }
    }
  }

}
