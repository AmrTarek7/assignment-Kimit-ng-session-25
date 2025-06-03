import { SharedService } from './../../core/services/shared.service';
import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AddUserComponent } from '../../components/add-user/add-user.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { UsersService } from '../../core/services/users.service';
import { AddUserBootstrapComponent } from '../../add-user-bootstrap/add-user-bootstrap.component';
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
}
@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  UsersList!: IUser[];
  isEdit: boolean = false;
  private dialog = inject(MatDialog);
  private _userService = inject(UsersService);
  private _sharedService = inject(SharedService);

  openFormDialog(): void {
    this.dialog.open(AddUserComponent, {
      width: '600px',
    });
  }

  getAllUsers(): void {
    this._userService.getUsers().subscribe({
      next: (res) => {
        this.UsersList = res;
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

    this._sharedService.refreshUsers$.subscribe(() => {
      this.getAllUsers();
    });
  }

  onUpdateUser(user: IUser): any {
    console.log('User to update:', user);
  }
}
