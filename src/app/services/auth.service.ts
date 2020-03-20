import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { RootStore } from "../store/root.store";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient, private rootStore: RootStore) {}

  //TODO:
  login(data: { username: string; password: string }) {
    return this.http.post("todo url", data).pipe(
      tap(res => {
        console.log(res);
        this.rootStore.userStore.authToken = ""; //TODO: token iz responsa
      })
    );
  }
}
