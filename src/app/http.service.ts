import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { FormComponent } from './form/form.component';
import { environment } from './../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public readonly http: HttpClient,private router:Router) { }
  
  public get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${environment.apiUrl}${endpoint}`);
  }
  //setHeader(){
  //	const header = new HttpHeaders().set('Authorization', 'Token 0bf3aa7ead7d8ef83bb0d121a67f6324ad52e050');
  //	return header;
  //}
  isLoggedIn() {
    return this.getToken() !== null;
  }
  getToken() {
    return localStorage.getItem("token")
  }
  public register<T, D>(endpoint: string, data: D): Observable<T> {
    //console.log('data',data);
    let token = localStorage.getItem("token"); 
    let headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.post<T>(`${environment.apiUrl}${endpoint}`, data , {headers : headers});
  }
  public <T, D>(endpoint: string, data: D): Observable<T> {
   // console.log('data',data);
    let token = localStorage.getItem("token"); 
    let headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.post<T>(`${environment.apiUrl}${endpoint}`, data , {headers : headers});
  }
  public loadPost<T, D>(endpoint: string, data: D): Observable<T> {
    return this.http.post<T>(`${environment.apiUrl}${endpoint}`, data);
  }
  sendToken(token: string) {
    localStorage.setItem("token", token);
  }
  public loginpost<T, D>(endpoint: string,data: D):Observable<T>{
    return this.http.post<T>(`${environment.apiUrl}${endpoint}`, data);
  }
  public reset<T,D>(endpoint: string,data: D):Observable<T>{
    let token = localStorage.getItem("token");    
    let headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.put<T>(`${environment.apiUrl}${endpoint}`, data, {headers: headers});
  } 
  public forgetpass<T,D>(endpoint: string,data: D):Observable<T> { 
    return this.http.post<T>(`${environment.authUrl}${endpoint}`, data);
  }
  public resetnewpass<T,D>(endpoint: string,data: D):Observable<T> {
    // let resetpasstoken = localStorage.getItem("resettoken");
    // let headers = new HttpHeaders().set('Authorization', `Token ${resetpasstoken}`);
    return this.http.post<T>(`${environment.authUrl}${endpoint}`, data);
  } 
  public getprofile<T,D>(endpoint: string):Observable<T>{
    let token = localStorage.getItem("token");    
    let headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.get<T>(`${environment.apiUrl}${endpoint}` , {headers: headers});
    
  }
  public updateprofile<T,D>(endpoint:string,data:D):Observable<T>{
    let token = localStorage.getItem("token");    
    let headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    
    return this.http.put<T>(`${environment.apiUrl}${endpoint}` ,data , {headers: headers});
  }

  public getblog<T,D>(endpoint:string):Observable<T>{
    let token = localStorage.getItem("token"); 
    let headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.get<T>(`${environment.apiUrl}${endpoint}`, {headers: headers} );

  }

  public updateblog<T,D>(endpoint:string,data:D):Observable<T>{
    let token = localStorage.getItem("token");    
    let headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.put<T>(`${environment.apiUrl}${endpoint}` ,data , {headers: headers});
  }
  public deleterow<T,D>(endpoint:string):Observable<T>{
    let token = localStorage.getItem("token");    
    let headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.delete<T>(`${environment.apiUrl}${endpoint}` , {headers: headers});
  }
  public getuserlist<T,D>(endpoint:string):Observable<T>{
    let token = localStorage.getItem("token");    
    let headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.get<T>(`${environment.chatUrl}${endpoint}` , {headers: headers});
  }

}
