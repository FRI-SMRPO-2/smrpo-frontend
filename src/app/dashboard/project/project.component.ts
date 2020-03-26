import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { ProjectService } from '../../services/project.service';
import { RootStore } from '../../store/root.store';

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss"]
})
export class ProjectComponent implements OnInit {
  isLoaded = false;

  productBacklog = [
    { title: "Zgodba #1", priority: "musthave" },
    { title: "Zgodba #2", priority: "shouldhave" },
    { title: "Zgodba #3", priority: "couldhave" }
  ];

  sprintBacklog = [{ title: "Zgodba #4", priority: "musthave" }];

  constructor(
    private route: ActivatedRoute,
    private rootStore: RootStore,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(({ id }) => {
          this.isLoaded = false;
          return this.projectService.getProjectById(id);
        })
      )
      .subscribe(project => {
        this.rootStore.projectStore.setActiveProject(project);
        setTimeout(() => {
          this.isLoaded = true;
        }, 300);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log("CHANG");
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
