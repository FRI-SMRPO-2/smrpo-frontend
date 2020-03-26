import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { RootStore } from '../store/root.store';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient, private rootStore: RootStore) {}

  login(data: { username: string; password: string }) {
    return this.http.post<{ token: string }>("api/auth", data).pipe(
      tap(res => {
        this.rootStore.userStore.authToken = res.token;
      })
    );
  }
}
