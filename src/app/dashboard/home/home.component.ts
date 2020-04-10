import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService } from '../../services/project.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  projects = [];

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit() {
    this.projectService.getAllProjects().subscribe((data) => {
      this.projects = data;
    });
  }

  openProject(id: number) {
    this.router.navigate(["project", id]);
  }
}
