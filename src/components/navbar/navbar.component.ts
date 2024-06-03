import {
    Component,
    HostListener,
    Input,
    OnChanges,
    SimpleChanges,
  } from '@angular/core';
  import { UserService } from '../../services/user.service';
  import { Router } from '@angular/router';
  
  @Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
  })
  export class NavbarComponent implements OnChanges {
    @Input() messageLength: number = 0;
    @Input() chatInstancesLength: number = 0;
    loggedInUser: any = null;
    loginTime: string;
    clickCount: number = 0;
  
    constructor(private userService: UserService, private router: Router) {
      const now = new Date();
      this.loginTime = this.formatDateTime(now);
    }
  
    ngOnInit() {
      this.initializeUserData();
    }
  
    ngOnChanges(changes: SimpleChanges) {
      if (changes['chatInstancesLength']) {
        this.chatInstancesLength =
          changes['chatInstancesLength'].currentValue || 0;
      }
    }
  
    initializeUserData() {
      this.userService.getUsers().subscribe((response: any) => {
        const users = response.users;
        const userId = sessionStorage.getItem('userId');
        if (userId) {
          this.loggedInUser =
            users.find((user: any) => user.id === parseInt(userId, 10)) || null;
        }
      });
    }
  
    logout() {
      const characterCount = this.messageLength;
      const loginDuration = this.calculateLoginDuration();
      const confirmationMessage = `Character count: ${characterCount}\nLogin time: ${this.loginTime}\nLogin duration: ${loginDuration}`;
  
      if (confirm(confirmationMessage)) {
        sessionStorage.clear();
        this.router.navigate(['/login']);
      }
    }
  
    formatDateTime(date: Date): string {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    }
  
    calculateLoginDuration(): string {
      const currentTimestamp = new Date();
      const [datePart, timePart] = this.loginTime.split(' ');
      const [day, month, year] = datePart
        .split('.')
        .map((part) => parseInt(part, 10));
      const [hours, minutes, seconds] = timePart
        .split(':')
        .map((part) => parseInt(part, 10));
      const loginDate = new Date(year, month - 1, day, hours, minutes, seconds);
      const durationInMilliseconds =
        currentTimestamp.getTime() - loginDate.getTime();
  
      const durationSeconds = String(
        Math.floor((durationInMilliseconds / 1000) % 60)
      ).padStart(2, '0');
      const durationMinutes = String(
        Math.floor((durationInMilliseconds / (1000 * 60)) % 60)
      ).padStart(2, '0');
      const durationHours = String(
        Math.floor(durationInMilliseconds / (1000 * 60 * 60))
      ).padStart(2, '0');
  
      return `${durationHours}:${durationMinutes}:${durationSeconds}`;
    }
  
    @HostListener('document:click', ['$event'])
    onClick(event: MouseEvent) {
      this.clickCount++;
    }
  }