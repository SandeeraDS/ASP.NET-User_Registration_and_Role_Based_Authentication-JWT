import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { UserComponent } from "./user/user.component";
import { SignUpComponent } from "./user/sign-up/sign-up.component";
import { SignInComponent } from "./user/sign-in/sign-in.component";
// import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
  { path: "", redirectTo: "/user/login", pathMatch: "full" },
  {
    path: "user",
    component: UserComponent,
    children: [
      { path: "registration", component: SignUpComponent },
      { path: "login", component: SignInComponent }
    ]
  },
  { path: "home", component: HomeComponent }
];
