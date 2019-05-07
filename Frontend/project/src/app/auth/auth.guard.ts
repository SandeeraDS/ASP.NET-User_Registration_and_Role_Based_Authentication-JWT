import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../shared/user.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem("userToken") != null) {
      //this is do for role based routing
      let roles = next.data["roles"] as Array<string>;
      if (roles) {
        var match = this.userService.roleMatch(roles);
        if (match) {
          return true;
        } else {
          this.router.navigate(["/forbidden"]);
        }
      } else return true;
    } else {
      this.router.navigate(["/user/login"]);
      return false;
    }
  }
}
