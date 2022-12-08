import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    private http: HttpClient
  ) { }

  sendMessage(body: Object): Observable<Object> {
    return this.http.post('http://localhost:3000/email', body, { responseType: 'text' })
  }
}
