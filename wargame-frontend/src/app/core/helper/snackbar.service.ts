import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastBarComponent } from '../../components/entry-components/toast-bar/toast-bar.component';

@Injectable({
  providedIn: "root",
})
export class SnackbarService {
  durationInSeconds = 5;
  constructor(private _snackBar: MatSnackBar) { }

  // ============== snackBar example =====================
  openSnackBar(data) {
    this._snackBar.openFromComponent(ToastBarComponent, {
      duration: this.durationInSeconds * 1000,
      data: data,
      panelClass: 'toast'
    });
  }
}
