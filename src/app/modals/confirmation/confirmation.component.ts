import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: "app-confirmation",
  templateUrl: "./confirmation.component.html",
  styleUrls: ["./confirmation.component.scss"],
})
export class ConfirmationComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  accept() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close();
  }
}
