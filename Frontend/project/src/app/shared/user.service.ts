import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./model/user.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  readonly rootUrl = "http://localhost:60320";

  constructor(private http: HttpClient) {}

  registerUser(user: User, roles: string[]) {
    const body = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Roles: roles
    };
    return this.http.post(this.rootUrl + "/api/Account/Register", body);
  }

  userAuthentication(userName, password) {
    var data =
      "username=" + userName + "&password=" + password + "&grant_type=password";

    var reqHeader = new HttpHeaders({
      "Content-Type": "application/x-www-urlencoded",
      "No-Auth": "True"
    });

    return this.http.post(this.rootUrl + "/login", data, {
      headers: reqHeader
    });
  }

  getUserClaims() {
    return this.http.get(this.rootUrl + "/api/Account/GetUserClaims");
  }

  getAllRoles() {
    return this.http.get(this.rootUrl + "/api/Role/GetAllRoles");
  }
}
