import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from '../guards/admin.guard';
import { AdminComponent } from './admin.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: "users", component: UsersComponent },
      { path: "projects", component: ProjectsListComponent },
      { path: "", redirectTo: "projects", pathMatch: "full" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AdminGuard]
})
export class AdminRoutingModule {}
