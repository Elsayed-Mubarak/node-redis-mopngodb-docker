import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class RestPasswordService {

  constructor(private http: HttpClient) { }
  restPassword(data?: string) {
    return this.http.post(`${environment.host}/team/reset-password`, { password: data })
  }
}
