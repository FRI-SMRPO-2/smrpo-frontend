import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ConfirmationComponent } from '../../modals/confirmation/confirmation.component';
import { UserModalComponent } from '../../modals/user-modal/user-modal.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  columns = ["username", "fullname", "email", "options"];
  users = [];

  totalResults = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  addUser() {
    this.dialog
      .open(UserModalComponent)
      .afterClosed()
      .subscribe((data) => {
        if (!data) return;
        this.users = [
          ...this.users,
          {
            id: data.id,
            name: `${data.first_name} ${data.last_name}`,
            username: data.username,
            email: data.email,
          },
        ];
        this.snackBar.open("Dodajanje novega uporabnika uspešno", "", {
          duration: 1500,
          panelClass: ["snackbar-success"],
        });
      });
  }

  editUser(user, index: number) {
    this.dialog
      .open(UserModalComponent, {
        data: {
          user,
        },
      })
      .afterClosed()
      .subscribe((data) => {
        if (!data) return;
        this.users[index] = {
          ...data,
          name: `${data.first_name} ${data.last_name}`,
        };
        this.users = [...this.users];
        this.snackBar.open("Uporabnik uspešno posodobljen", "", {
          duration: 1500,
          panelClass: ["snackbar-success"],
        });
      });
  }

  deleteUser(user, index) {
    this.dialog
      .open(ConfirmationComponent, {
        data: {
          title: "Odstranitev uporabnika",
          message: `Ali ste prepričani, da želite izbrisati uporabnika z uporabniškim imenom
        ${user.username}?`,
        },
      })
      .afterClosed()
      .subscribe((isAccepted) => {
        if (isAccepted) {
          this.userService.deleteUser(user.id).subscribe(
            (data) => {
              this.users.splice(index, 1);
              this.users = [...this.users];
              this.snackBar.open("Uporabnik je bil uspešno izbrisan", "", {
                duration: 1500,
                panelClass: ["snackbar-success"],
              });
            },
            (err) => console.log(err)
          );
        }
      });
  }

  changePage(event) {
    //console.log(event);
  }
}
