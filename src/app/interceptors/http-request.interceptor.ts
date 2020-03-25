import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { RootStore } from '../store/root.store';

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
        headers: req.headers.set("Authorization", `Token ${token}`)
      });

    // Če api vrne 401, redirectaj na login (Če user ni prijavljen)
    return next.handle(req).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          console.log(err);
          if (err.status === 401) {
            this.rootStore.userStore.logout();
            this.router.navigate(["/login"]);
          }
          // Če želiš preoblikovat daš v objekt
          return throwError(err);
        }
      })
    );
  }
}
