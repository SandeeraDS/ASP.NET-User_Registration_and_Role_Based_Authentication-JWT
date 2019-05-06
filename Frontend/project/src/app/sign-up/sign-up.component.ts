import { Component, OnInit, ViewChild } from "@angular/core";
import { User } from "../shared/model/user.model";
import { NgForm } from "@angular/forms";
import { UserService } from "../shared/user.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit {
  @ViewChild("userRegistrationForm") signupForm: NgForm;

  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.signupForm.reset();
    this.user = {
      UserName: "",
      Password: "",
      Email: "",
      FirstName: "",
      LastName: ""
    };
  }

  OnSubmit() {
    this.user.UserName = this.signupForm.value.UserName;
    this.user.Email = this.signupForm.value.Email;
    this.user.Password = this.signupForm.value.Password;
    this.user.FirstName = this.signupForm.value.FirstName;
    this.user.LastName = this.signupForm.value.LastName;

    console.log(this.user);

    // this.user.email = this.signupForm.value.userData.email;
    // this.user.secretQuestion = this.signupForm.value.secret;
    // this.user.answer = this.signupForm.value.questionAnswer;
    // this.user.gender = this.signupForm.value.gender;
    // console.log(this.signupForm.value);
    // console.log(this.user.UserName);
    this.userService.registerUser(this.user).subscribe((data: any) => {
      if (data.Succeeded) {
        this.signupForm.reset();
        this.toastr.success("User Registration Successful");
      } else {
        this.toastr.error(data.Errors[0]);
      }
    });
  }
}
