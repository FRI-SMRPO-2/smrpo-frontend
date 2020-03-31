import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectService } from '../services/project.service';
import { RootStore } from '../store/root.store';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  projectList = [];
  title = "";

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private rootStore: RootStore
  ) {}

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(data => {
      this.projectList = data;
    });
  }

  projectSelected(index: number) {
    this.title = this.projectList[index].name;
  }
}
