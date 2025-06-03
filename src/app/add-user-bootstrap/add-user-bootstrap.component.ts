import {
  Component,
  TemplateRef,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  NgbDatepickerModule,
  NgbAlertModule,
  NgbModalModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../core/services/users.service';

@Component({
  selector: 'app-add-user-bootstrap',
  standalone: true,
  imports: [
    CommonModule,
    NgbDatepickerModule,
    NgbAlertModule,
    NgbModalModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-user-bootstrap.component.html',
  styleUrl: './add-user-bootstrap.component.css',
})
export class AddUserBootstrapComponent {
  // Modal Service
  private modalService = inject(NgbModal);

  // Users service
  private _userService = inject(UsersService);

  // Close result signal (optional)
  closeResult: WritableSignal<string> = signal('');

  // Reactive form
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

  // Open modal
  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult.set(`Closed with: ${result}`);
        },
        () => {
          this.closeResult.set('Dismissed');
        }
      );
  }

  // Handle form submit
  onSubmit(modal: any): void {
    if (this.userForm.valid) {
      this._userService.addUser(this.userForm.value).subscribe({
        next: (res) => {
          console.log('✅ User added successfully:', res);
          modal.close('User saved');
          this.userForm.reset(); // Reset form after success
        },
        error: (err) => {
          console.error('❌ Error adding user:', err);
        },
      });
      console.log(this.userForm.value);
      modal.close('User saved');
    }
  }
}
