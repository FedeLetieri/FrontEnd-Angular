import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { REST_SERVER_URL } from 'app/configuration'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(authData: string): Observable<string> {
    return this.http.post<string>(`${REST_SERVER_URL}/login`, authData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }
}
