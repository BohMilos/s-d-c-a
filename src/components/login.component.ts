import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  showPasswordField: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  login() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password.';
      return;
    }

    this.userService.getUsers().subscribe({
      next: (response: any) => {
        const users = response.users; // Extract the users array from the response
        console.log('Users received:', users);
        const user = users.find(
          (u: any) =>
            u.username === this.username && u.password === this.password
        );
        if (user) {
          // Start a session and store user ID
          sessionStorage.setItem('userId', user.id);
          // Navigate to home page upon successful login
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Invalid username or password.';
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
