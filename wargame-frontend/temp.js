/*

input:focus,
button:active,
button:focus {
  outline: none;
}

.container-fluid {
  height: 100%;
//  background-image: url('/assets/wargames/Main-BG-2.jpg');
  font-size: 14px;
  overflow: hidden;
  padding-top: 200px;
}

.coming_soon_logo {
  text-align: center;
  position: relative;
  z-index: 1;

  .soon_logo {
    @media (min-width: 0px) and (max-width: 1199px) {
      width: 60%;
    }

    @media (min-width: 1200px) and (max-width: 1599px) {
      width: 65%;
    }

    @media (min-width: 1600px) and (max-width: 1749px) {
      width: 80%;
    }

  }
}

.logodiv {
  background-color: #303F5D;
  opacity: 80%;
  width: fit-content;
  height: fit-content;
  border-bottom: 10px solid #700200;
  text-align: center;
}

.logim {
  padding-top: 5px;
}
.word {
 // background-color: #700200;
  background-image: url('/assets/wargames/BG-Tex-Intro.png');
  background-size: 100% 100%;

  width: 50%;
  opacity: 80%;
  color: #FFDA87;
  margin: auto;
  margin-bottom: 10px;
  padding-bottom: 20px;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
  text-shadow: 4px 4px 4px #48414194;
}
.subtitle {
  margin: 0px;
}
.buttondiv {
  margin: auto;
  text-align: center;
}

.logButton {
  background-color: #980000;
  border: none;
  width: 239px;
  color: white;
  height: 36px;
 margin-right: 5px;
 font-weight: bold;

}

.loginButton {
    background-color: #980000;
    border: none;
    width: 120px;
    color: white;
    height: 36px;
    margin-right: 5px;
   font-weight: bold;

  }

.loginActive {
  background-color: #980000;
  border: none;
  color: white;
  height: 36px;

  width: 398px;
  margin-right: 5px;
  font-weight: bold;
}
.loginnotActive {
  background-color: #980000;
  border: none;
  color: white;
  height: 36px;
  font-weight: bold;
  width: 80px;
  margin-right: 5px;
}
.sigupPutton {
  font-weight: bold;
  background-color: #0055ac;
  border: none;
  width: 239px;
  color: white;
  height: 36px;
}
.sigupActive {
  background-color: #0055ac;
  border: none;
  color: white;
  height: 36px;
  width: 398px;
  font-weight: bold;
}
.sigupnotActive {
  background-color: #0055ac;
  border: none;
  color: white;
  height: 36px;
  width: 80px;
  font-weight: bold;
}

input:focus,
button:active,
button:focus {
  outline: none;
}
.logButton{
    margin-left: 0px;
    background-color: #700200;
    opacity: 75%;
    border: none;
    width: 488px;
    color: #FFDA87;
    height: 36px;
    margin-top: 5px;
    font-weight: bold;
}
.INPUT{
    margin-top: 5px !important;
    margin-bottom: 5px;
    width: 488px;
    border: none;
    padding: 8px;
    background-color: #010711;
    opacity: 30%;
    border: #91B5CC;
    border-radius: 5px;
    border-style: revert;

}


small {
  color: #FFDA87;
  background: #700200;
  padding: 4px;
}

@media screen and (min-width: 511px) {
  .INPUT{
    width: 488px;
  }


  .logButton{
    width: 488px;
}
}

@media screen and (max-width: 520px) {
  .INPUT{
    width: 323px;
  }

  .logButton {
    width: 323px;
  }
}


*/


/**

<!--<ul *ngFor="let myList of myList">
  <li>{{(myList.name) !=="isec" ? (myList.name) :"isec" }}</li>
</ul>
 -->

<div class="container-fluid">
  <div class="row mb-4">
    <div class="col-3">
      <app-left-side-bar></app-left-side-bar>
    </div>

    <div class="col-lg-2 col-sm-2 col-xs-6">
      <div class="coming_soon_logo">
        <div>
          <img src="/assets/wargames/logo.png" class="soon_logo" />
        </div>
      </div>
    </div>

    <div class="col-lg-5  col-sm-2 "> </div>
  </div>
  <div class="row mb-4">
    <div class="word">
      <p class="subtitle">Enter The New Password</p>
    </div>
  </div>
  <div class="row mb-4">
    <div class="buttondiv">
      <form [formGroup]="restPasswordForm">
        <div *ngIf="password.invalid && password.touched">
          <small *ngIf="password.errors?.required">*Password is required</small>
          <small *ngIf="password.errors?.pattern">{{password.errors?.pattern.value}}* Password not allowed Must contain
            characters, numbers and at least one special and capital character</small>
        </div>
        <div>
          <input formControlName="password" placeholder="Password" type="password" class="INPUT">
        </div>
        <small *ngIf="restPasswordForm.errors?.misMatch">*new password and password not match</small>
        <div>
          <input formControlName="newPassword" placeholder="new Password" type="password" class="INPUT">
        </div>
        <button class="logButton" type="submit" (click)="submitRestPasswordForm()">CONFIRM</button>
      </form>
    </div>
  </div>
  <div class="col-3">
    <app-right-side-bar></app-right-side-bar>
  </div>
</div>




 */
