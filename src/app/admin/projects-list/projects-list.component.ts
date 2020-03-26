import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ProjectModalComponent } from '../../modals/project-modal/project-modal.component';

@Component({
  selector: "app-projects-list",
  templateUrl: "./projects-list.component.html",
  styleUrls: ["./projects-list.component.scss"]
})
export class ProjectsListComponent implements OnInit {
  columns = ["name", "leader", "metodologija", "members", "options"];
  ElementData = [
    {
      position: "SMRPO-1",
      name: "Vavpotič",
      weight: "Marko",
      symbol:
        "Luka, Aleks, Benjamin, Klavdija Luka, Aleks, Benjamin, Klavdija Luka, Aleks, Benjamin, Klavdija"
    },
    {
      position: "SMRPO-2",
      name: "Vavpotič",
      weight: "Marko",
      symbol: "Luka, Aleks, Benjamin, Klavdija"
    },
    {
      position: "SMRPO-3",
      name: "Vavpotič",
      weight: "Marko",
      symbol: "Luka, Aleks, Benjamin, Klavdija"
    },
    {
      position: "SMRPO-4",
      name: "Vavpotič",
      weight: "Marko",
      symbol: "Luka, Aleks, Benjamin, Klavdija"
    },
    {
      position: "SMRPO-5",
      name: "Vavpotič",
      weight: "Marko",
      symbol: "Luka, Aleks, Benjamin, Klavdija"
    },
    {
      position: "SMRPO-6",
      name: "Vavpotič",
      weight: "Marko",
      symbol: "Luka, Aleks, Benjamin, Klavdija"
    },
    {
      position: "SMRPO-7",
      name: "Vavpotič",
      weight: "Marko",
      symbol: "Luka, Aleks, Benjamin, Klavdija"
    },
    {
      position: "SMRPO-8",
      name: "Vavpotič",
      weight: "Marko",
      symbol: "Luka, Aleks, Benjamin, Klavdija"
    },
    {
      position: "SMRPO-9",
      name: "Vavpotič",
      weight: "Marko",
      symbol: "Luka, Aleks, Benjamin, Klavdija"
    },
    {
      position: "SMRPO-10",
      name: "Vavpotič",
      weight: "Marko",
      symbol: "Luka, Aleks, Benjamin, Klavdija"
    }
  ];

  totalResults = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  addProject() {
    this.dialog.open(ProjectModalComponent);
  }

  changePage(event) {
    console.log(event);
  }
}
