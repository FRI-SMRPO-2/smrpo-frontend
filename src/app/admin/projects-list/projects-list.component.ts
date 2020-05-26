import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ProjectModalComponent } from '../../modals/project-modal/project-modal.component';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: "app-projects-list",
  templateUrl: "./projects-list.component.html",
  styleUrls: ["./projects-list.component.scss"],
})
export class ProjectsListComponent implements OnInit {
  columns = ["name", "leader", "metodologija", "members", "options"];
  projects = [];

  totalResults = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(
    private dialog: MatDialog,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe((data) => {
      this.projects = data.map((p) => this.mapUsersByRoles(p));
    });
  }

  private mapUsersByRoles(project) {
    project.devs = project.developers.map((d) => d.username);
    project.productOwner = project.product_owner.username;
    project.scrumMaster = project.scrum_master.username;

    return project;
  }

  addProject() {
    this.dialog
      .open(ProjectModalComponent)
      .afterClosed()
      .subscribe((res) => {
        if (!res) return;

        this.projects = [...this.projects, this.mapUsersByRoles(res)];
      });
  }

  editProject(project, index: number) {
    console.log(index);
    this.dialog
      .open(ProjectModalComponent, {
        data: {
          project,
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.projects[index] = this.mapUsersByRoles(res);
          this.projects = [...this.projects];
        }
      });
  }

  changePage(event) {
    //console.log(event);
  }
}
