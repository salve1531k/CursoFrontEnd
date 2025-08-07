import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate() : boolean {
    if(this.authService.esteAutenticado()){
      return true;
    }else{
      this.router.navigate(['/login'])
      return false;
    }
  }

}
