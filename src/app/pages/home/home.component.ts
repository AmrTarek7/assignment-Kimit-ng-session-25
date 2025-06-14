import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AddUserComponent } from '../../components/add-user/add-user.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { UsersService } from '../../core/services/users.service';
import { AddUserBootstrapComponent } from '../../add-user-bootstrap/add-user-bootstrap.component';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  checked?: boolean;
}
@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,

    MatCheckboxModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  UsersList!: IUser[];
  isEdit: boolean = false;
  selectedUsers: IUser[] = [];
  disableBtnDeleteAll: boolean = true;

  private dialog = inject(MatDialog);
  private _userService = inject(UsersService);

  openFormDialog(user?: IUser): void {
    this.dialog.open(AddUserComponent, {
      width: '600px',
      data: user || null,
    });
  }

  getAllUsers(): void {
    this._userService.getUsers().subscribe({
      next: (res) => {
        this.UsersList = res.map((user: any) => ({
          ...user,
          checked: false,
        }));
        console.log('Users List:', this.UsersList);
      },
      error: (err) => console.error('Error fetching users:', err),
    });
  }

  onDeleteUser(id: string): void {
    this._userService.deleteUser(id).subscribe({
      next: () => {
        console.log('User deleted successfully');
        this.getAllUsers();
      },
    });
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  onSelctedProducts(event: MatCheckboxChange, user: IUser): void {
    console.log(event);
    user.checked = event.checked;
    if (event.checked) {
      this.selectedUsers.push(user);

      console.log('Selected users:', this.selectedUsers);
    } else {
      this.selectedUsers = this.selectedUsers.filter((u) => u.id !== user.id);
      console.log('UnSelected users:', this.selectedUsers);
    }

    this.disableBtnDeleteAll = this.selectedUsers.length === 0;
  }

  onEditUser(user: IUser): any {
    console.log('User to update:', user);
    this.openFormDialog(user);
  }
  //

  onDeleteAllProducts(): void {
    for (let i = 0; i < this.selectedUsers.length; i++) {
      const user = this.selectedUsers[i];

      this.onDeleteUser(user.id);
    }
    this.UsersList.forEach((product) => (product.checked = false));
    this.selectedUsers = [];

    this.disableBtnDeleteAll = true;
  }
}
