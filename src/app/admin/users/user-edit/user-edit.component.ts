import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  editUserForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private userService: UserService, 
    private router: Router, 
    private route: ActivatedRoute
  ) {
    this.editUserForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  ngOnInit() {
    const userId: string | null = this.route.snapshot.paramMap.get('id');

    if (userId !== null) {
      this.userService.getUserById(userId).subscribe(user => {
        this.editUserForm.patchValue(user);
      });
    } else {
      console.error('User ID is null');
      // Optionally redirect the user or show an error
      this.router.navigate(['/users']);
    }
  }

  onSubmit() {
    const userId: string | null = this.route.snapshot.paramMap.get('id');

    if (userId && this.editUserForm.valid) {
      this.userService.updateUser(userId, this.editUserForm.value)
        .subscribe(
          () => this.router.navigate(['/users']),
          err => console.error('Edit user failed', err)
        );
    } else {
      console.error('Form is invalid or User ID is null');
    }
  }
}
