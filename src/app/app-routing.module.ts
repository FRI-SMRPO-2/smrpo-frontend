import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { AuthResolver } from './resolvers/auth.resolver';

const routes: Routes = [
  {
    path: "login",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule),
    resolve: { _: AuthResolver }
  },
  {
    path: "",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  { path: "**", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthResolver]
})
export class AppRoutingModule {}
