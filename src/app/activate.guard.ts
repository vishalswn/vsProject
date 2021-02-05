import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
//import { RegisterService } from './register.service';
import { HttpService } from 'src/app/http.service';
@Injectable({
  providedIn: 'root'
})
export class ActivateGuard implements CanActivate {
  constructor(private userservice:HttpService,private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if(this.userservice.isLoggedIn()){
        return true;
      }else{
        alert("you don,t have permission,redirect to home");
        this.router.navigate(["register"]); 
        return false; 
      }
     //return this.userservice.isLoggedIn;
    
  }
  
}
