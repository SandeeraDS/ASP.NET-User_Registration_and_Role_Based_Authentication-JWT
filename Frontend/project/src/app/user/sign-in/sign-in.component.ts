import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserService } from "src/app/shared/user.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent implements OnInit {
  @ViewChild("loginForm") signinForm: NgForm;
  userName: string = "";
  password: string = "";
  isLoginError: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  OnSubmit() {
    this.userName = this.signinForm.value.UserName;
    this.password = this.signinForm.value.Password;

    console.log(this.userName);
    console.log(this.password);

    this.userService.userAuthentication(this.userName, this.password).subscribe(
      (data: any) => {
        if (data.access_token != null) {
          localStorage.setItem("userToken", data.access_token);
          this.router.navigate(["/home"]);
        }
      },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
        this.signinForm.reset();
      }
    );
  }
}
