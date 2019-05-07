import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  //all htpp request pass through this function
  constructor(private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem("userToken") != null) {
      const clonedReq = req.clone({
        headers: req.headers.set(
          "Authorization",
          "Bearer " + localStorage.getItem("userToken")
        )
      });
      return next.handle(clonedReq).pipe(
        tap(
          succ => {},
          err => {
            if (err.status == 401) {
              localStorage.removeItem("userToken");
              this.router.navigateByUrl("/user/login");
            }
          }
        )
      );
    } else return next.handle(req.clone());
  }
}
