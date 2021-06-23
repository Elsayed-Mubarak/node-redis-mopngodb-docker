import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/authentication.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { HttpXsrfInterceptor } from './core/interceptors/csrf.interceptor';
import { HttpRequestInterceptor } from './core/interceptors/httpRequest.interceptor';
import { ToastBarComponent } from './components/entry-components/toast-bar/toast-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModules } from './modules/shared/shared-modules.module';

@NgModule({
  declarations: [
    AppComponent,
    ToastBarComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModules
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    { provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
