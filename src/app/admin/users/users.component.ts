import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UserModalComponent } from '../../modals/user-modal/user-modal.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  columns = ["username", "fullname", "email", "options"];
  users = [];

  totalResults = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private dialog: MatDialog, private userService: UserService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  addUser() {
    this.dialog
      .open(UserModalComponent)
      .afterClosed()
      .subscribe(data => {
        if (!data) return;
        this.users = [
          ...this.users,
          {
            id: data.id,
            name: `${data.first_name} ${data.last_name}`,
            username: data.username,
            email: data.email
          }
        ];
      });
  }

  changePage(event) {
    //console.log(event);
  }
}
