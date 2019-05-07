import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { UserComponent } from "./user/user.component";
import { SignUpComponent } from "./user/sign-up/sign-up.component";
import { SignInComponent } from "./user/sign-in/sign-in.component";
import { AuthGuard } from "./auth/auth.guard";
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";
import { ForbiddenComponent } from "./forbidden/forbidden.component";
// import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: "adminpanel",
    component: AdminPanelComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin"] }
  },
  {
    path: "forbidden",
    component: ForbiddenComponent,
    canActivate: [AuthGuard]
  },
  { path: "", redirectTo: "/user/login", pathMatch: "full" },
  {
    path: "user",
    component: UserComponent,
    children: [
      { path: "registration", component: SignUpComponent },
      { path: "login", component: SignInComponent }
    ]
  }
];
