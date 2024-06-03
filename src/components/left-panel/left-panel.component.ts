import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css'],
})
export class LeftPanelComponent implements OnInit {
  @Output() userSelected = new EventEmitter<any>();
  @Output() chatStarted = new EventEmitter<boolean>();
  @Input() rightPanel: any;

  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    const loggedInUserId = sessionStorage.getItem('userId');
    if (loggedInUserId) {
      this.userService.getUsers().subscribe((response: any) => {
        const users = response.users;
        this.users = users.filter(
          (user: any) => user.id !== parseInt(loggedInUserId)
        );
        this.users = this.users.map((user: any) => ({
          ...user,
          showButtons: false,
        }));
      });
    }
  }

  showDetails(user: any) {
    this.userSelected.emit(user);
  }

  startChat(user: any) {
    sessionStorage.setItem('selectedUserForChat', JSON.stringify(user));
    this.userSelected.emit(user);
    if (this.rightPanel) {
      this.rightPanel.endChat();
    }
    this.chatStarted.emit(true);
  }

  toggleButtons(user: any) {
    user.showButtons = !user.showButtons;
  }
}