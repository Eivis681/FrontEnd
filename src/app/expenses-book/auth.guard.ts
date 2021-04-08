import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
        private service: DataService) { }

    canActivate() {
        if (!this.service.logedIn) {
            this.router.navigate(['/login']);
            return false
        } else {
            return true;
        }
    }

}
