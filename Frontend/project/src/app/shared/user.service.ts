import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./model/user.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  readonly rootUrl = "http://localhost:60320/api";

  constructor(private http: HttpClient) {}

  registerUser(user: User) {
    const body: User = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName
    };
    return this.http.post(this.rootUrl + "/Account/Register", body);
  }
}
