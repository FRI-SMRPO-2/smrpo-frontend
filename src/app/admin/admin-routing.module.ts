import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      { path: "users", component: UsersComponent },
      { path: "projects", component: ProjectsListComponent },
      { path: "", redirectTo: "projects", pathMatch: "full" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
