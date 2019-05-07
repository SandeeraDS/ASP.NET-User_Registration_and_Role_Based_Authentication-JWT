import { Component, OnInit, ViewChild } from "@angular/core";
import { User } from "../../shared/model/user.model";
import { NgForm } from "@angular/forms";
import { UserService } from "../../shared/user.service";
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
  roles: any[];

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

    this.userService.getAllRoles().subscribe((data: any) => {
      //add property callled selected
      data.forEach(obj => (obj.selected = false));
      this.roles = data;
      console.log(this.roles);
    });
  }

  updateSelectedRoles(index) {
    this.roles[index].selected = !this.roles[index].selected;
    console.log(this.roles);
  }

  OnSubmit() {
    var selectedRoles = this.roles.filter(x => x.selected).map(y => y.Name);
    console.log(selectedRoles);

    this.user.UserName = this.signupForm.value.UserName;
    this.user.Email = this.signupForm.value.Email;
    this.user.Password = this.signupForm.value.Password;
    this.user.FirstName = this.signupForm.value.FirstName;
    this.user.LastName = this.signupForm.value.LastName;

    console.log(this.user);

    this.userService
      .registerUser(this.user, selectedRoles)
      .subscribe((data: any) => {
        if (data.Succeeded) {
          this.signupForm.reset();
          if (this.roles) this.roles.map(x => (x.selected = false));
          this.toastr.success("User Registration Successful");
        } else {
          this.toastr.error(data.Errors[0]);
        }
      });
  }
}
