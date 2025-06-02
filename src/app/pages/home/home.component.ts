import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AddUserComponent } from '../../components/add-user/add-user.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { UsersService } from '../../core/services/users.service';
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
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  UsersList!: IUser[];

  readonly dialog = inject(MatDialog);

  openFormDialog(): void {
    this.dialog.open(AddUserComponent, {
      width: '600px',
    });
  }

  private _userService = inject(UsersService);
  getAllUsers(): void {
    this._userService.getUsers().subscribe({
      next: (res) => {
        this.UsersList = res;
        console.log('Users List:', this.UsersList);
      },
      error: (err) => console.error('Error fetching users:', err),
    });
  }

  ngOnInit(): void {
    this.getAllUsers();
  }
}
