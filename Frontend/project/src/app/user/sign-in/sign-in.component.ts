import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent implements OnInit {
  @ViewChild("loginForm") signinForm: NgForm;
  isLoginError: boolean = false;

  constructor() {}

  ngOnInit() {}

  OnSubmit() {}
}
