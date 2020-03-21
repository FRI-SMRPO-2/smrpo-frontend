import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"]
})
export class ProjectsComponent implements OnInit {
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

  constructor() {}

  ngOnInit(): void {}

  changePage(event) {
    console.log(event);
  }
}
