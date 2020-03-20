import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";
import { Router } from "@angular/router";
import { RootStore } from "../store/root.store";
import { Observable, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { catchError } from "rxjs/operators";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private router: Router, private rootStore: RootStore) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Pripne apiURL(iz env) na začetek request url-ja
    req = req.clone({
      url:
        environment.apiURL +
        (req.url.charAt(0) === "/" ? req.url : `/${req.url}`)
    });

    // Če v userStore obstaja user token, ga dodamo v request header
    const token = this.rootStore.userStore.authToken;
    if (token)
      req = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${token}`)
      }); //TODO: Spremeni auth glede na kaj mamo

    // Če api vrne 401, redirectaj na login (Če user ni prijavljen)
    return next.handle(req).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.rootStore.userStore.logOut();
            this.router.navigate(["/login"]);
          }
          // Če želiš preoblikovat daš v objekt
          return throwError(err);
        }
      })
    );
  }
}
