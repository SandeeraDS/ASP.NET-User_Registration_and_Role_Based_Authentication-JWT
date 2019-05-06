import { Component, OnInit, ViewChild } from "@angular/core";
import { User } from "../shared/model/user.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit {
  @ViewChild("userRegistrationForm") signupForm: NgForm;

  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  constructor() {}

  ngOnInit() {
    this.signupForm.reset();
  }

  OnSubmit() {}
}
