import { Injectable } from "@angular/core";
import { UserStore } from "./user.store";

@Injectable({
  providedIn: "root"
})
export class RootStore {
  readonly userStore = new UserStore();
}
