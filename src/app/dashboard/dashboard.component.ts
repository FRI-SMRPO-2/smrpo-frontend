import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RootStore } from '../store/root.store';

import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  projectList = [];
  title = '';
  isSuperuser: boolean;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private rootStore: RootStore
  ) {}

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(data => {
      this.projectList = data;
    });

    this.rootStore.userStore.user$.subscribe(user => this.isSuperuser = user.is_superuser);
  }

  projectSelected(index: number) {
    this.title = this.projectList[index].name;
  }
}
