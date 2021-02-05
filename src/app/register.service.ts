import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from './../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

   constructor(private http: HttpClient,private router:Router) {
    }
   
    public get<T>(endpoint: string): Observable<T> {
      return this.http.get<T>(`${environment.apiUrl}${endpoint}`);
    }

   loadGet(data: any): Observable<any> {
    return this.http.get('http://192.168.1.17:8001/api/register/');
   }
  //getToken() {
   // return localStorage.getItem("token")
 // }
 // isLoggedIn() {
 //   return this.getToken() !== null;
 // }
}
