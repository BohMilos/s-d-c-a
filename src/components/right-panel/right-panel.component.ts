import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css'],
})
export class RightPanelComponent {
  @Output() chatInstancesUpdated = new EventEmitter<any[]>();
  @Output() messageLengthAdd: EventEmitter<number> = new EventEmitter<number>();
  @Output() chatEnded = new EventEmitter<boolean>();

  chatHistory: any[] = [];
  newMessage: string = '';
  chatInstances: any[] = [];

  constructor(private http: HttpClient) {}

  sendMessage() {
    if (this.newMessage.trim() === '') {
      return;
    }
    const userTimestamp = new Date();
    const messageBody = { text: this.newMessage };
    const messageLength = this.newMessage.replace(/\s/g, '').length;
    this.http.post<any>('https://httpbin.org/post', messageBody).subscribe(
      (response) => {
        const serverTimestamp = new Date();
        this.chatHistory.push({
          sender: 'Me',
          text: this.newMessage,
          timestamp: userTimestamp,
        });

        const selectedUserString = sessionStorage.getItem(
          'selectedUserForChat'
        );
        let selectedUser;
        if (selectedUserString !== null) {
          selectedUser = JSON.parse(selectedUserString);
          console.log(selectedUser.username);
        }

        const responseLength = response.json.text.length;
        const lastDigitOfIP = response.origin.slice(-1);
        const serverResponse = 'A'.repeat(responseLength) + lastDigitOfIP;
        this.chatHistory.push({
          sender: selectedUser?.username || 'Unknown User',
          text: serverResponse,
          timestamp: serverTimestamp,
        });
        this.newMessage = '';
      },
      (error) => {
        console.error('Error sending message:', error);
      }
    );
    this.messageLengthAdd.emit(messageLength);
  }

  endChat() {
    // Save the chat history before clearing it
    if (this.chatHistory.length > 0) {
      console.log(this.chatHistory);
      this.chatInstances.push(this.chatHistory);
      console.log(this.chatInstances);
      this.chatInstancesUpdated.emit(this.chatInstances);
    }
    this.chatHistory = [];
    this.newMessage = '';
    this.chatEnded.emit(true);
  }
   
  updateChatInstances() {
    this.chatInstancesUpdated.emit(this.chatInstances);
  }
}