import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss"]
})
export class ProjectComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  productBacklog = [
    { title: "Zgodba #1", priority: "musthave" },
    { title: "Zgodba #2", priority: "shouldhave" },
    { title: "Zgodba #3", priority: "couldhave" }
  ];

  sprintBacklog = [{ title: "Zgodba #4", priority: "musthave" }];

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
