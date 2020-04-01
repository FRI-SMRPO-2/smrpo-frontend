import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ProjectRoleType } from '../../interfaces/project.interface';
import { ProjectModalComponent } from '../../modals/project-modal/project-modal.component';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: "app-projects-list",
  templateUrl: "./projects-list.component.html",
  styleUrls: ["./projects-list.component.scss"]
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
    this.projectService.getAllProjects().subscribe(data => {
      this.projects = data.map(p => this.mapUsersByRoles(p));
    });
  }

  private mapUsersByRoles(project) {
    const mapByRole = (role: ProjectRoleType) =>
      project.users.filter(u => u.role === role).map(u => u.username);

    project.developers = mapByRole("Developer");
    project.projectManager = mapByRole("Project manager");
    project.methodologyMaster = mapByRole("Methodology master");

    return project;
  }

  addProject() {
    this.dialog
      .open(ProjectModalComponent)
      .afterClosed()
      .subscribe(res => {
        if (!res) return;

        this.projects = [...this.projects, this.mapUsersByRoles(res)];
      });
  }

  changePage(event) {
    //console.log(event);
  }
}
