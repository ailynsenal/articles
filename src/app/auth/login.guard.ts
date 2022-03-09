import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor( private router: Router,
    private authService: AuthService) {}
    
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean> {
    var isAuthenticated = this.authService.isLoggedIn();
    if (!isAuthenticated) {
        this.router.navigate(['/login']);
        return false;
    }
    return isAuthenticated;
  }
}
