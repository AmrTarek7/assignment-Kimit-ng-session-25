import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../core/services/users.service';
import { SharedService } from '../../core/services/shared.service';

@Component({
  selector: 'app-add-user',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(10),
    ]),
  });

  private dialogRef = inject(MatDialogRef<AddUserComponent>);
  private _userService = inject(UsersService);
  private _sharedService = inject(SharedService);

  onAddUser() {
    if (this.userForm.valid) {
      this._userService.addUser(this.userForm.value).subscribe({
        next: (response) => {
          console.log('User added successfully:', response);
          this.onSomeAction();
          this.close();
        },
        error: (error) => console.error('Error adding user:'),
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

  onSomeAction() {
    // عند حدوث الشيء المطلوب، أخبر component A
    this._sharedService.triggerUserRefresh();
  }

  ngOnInit(): void {}
}
