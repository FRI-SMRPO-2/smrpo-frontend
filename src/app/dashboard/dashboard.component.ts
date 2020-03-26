import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectService } from '../services/project.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  projectList = [];
  title: string = "";

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(data => {
      this.projectList = data;
    });

    this.route.params.subscribe(console.log);
  }

  projectSelected(index: number) {
    this.title = this.projectList[index].name;
  }
}
