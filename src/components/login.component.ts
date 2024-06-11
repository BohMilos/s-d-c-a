import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  firstName: string = ''; /*napr. Emily*/
  lastName: string = '';  /*napr. Johnson*/
  password: string = ''; /*napr. emilyspass*/
  errorMessage: string = '';
  showPasswordField: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  login() {
    if (!this.firstName || !this.lastName || !this.password) {
      this.errorMessage = 'Please enter first name, last name, and password.';
      return;
    }

    this.userService.getUsers().subscribe({
      next: (response: any) => {
        const users = response.users; // Extract the users array from the response
        console.log('Users received:', users);
        const user = users.find(
          (u: any) =>
            u.firstName === this.firstName &&
            u.lastName === this.lastName &&
            u.password === this.password
        );
        if (user) {
          // Start a session and store user ID
          sessionStorage.setItem('userId', user.id);
          // Navigate to home page upon successful login
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Invalid first name, last name, or password.';
        }
      },
      error: (error: any) => {
        console.error('Error fetching users:', error);
        this.errorMessage = 'Error fetching users. Please try again later.';
      },
    });
  }

  togglePasswordVisibility() {
    this.showPasswordField = !this.showPasswordField;
  }
}
