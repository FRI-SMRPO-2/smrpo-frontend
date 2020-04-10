import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from '../admin/admin.component';
import { ProjectResolver } from '../resolvers/project.resolver';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProductBacklogComponent } from './project/product-backlog/product-backlog.component';
import { ProjectComponent } from './project/project.component';
import { SprintBacklogComponent } from './project/sprint-backlog/sprint-backlog.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "project/:id",
        component: ProjectComponent,
        resolve: { project: ProjectResolver },
        children: [
          { path: "product-backlog", component: ProductBacklogComponent },
          { path: "sprint-backlog", component: SprintBacklogComponent },
          { path: "", redirectTo: "product-backlog", pathMatch: "full" },
        ],
      },
      { path: "home", component: HomeComponent },
      { path: "admin", component: AdminComponent },
      { path: "", redirectTo: "home", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProjectResolver],
})
export class DashboardRoutingModule {}
