import { Component,ViewChild} from "@angular/core";
import { Router } from "@angular/router";
import {RightPanelComponent} from '../right-panel/right-panel.component';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css'],
})

export class HomePageComponent {
    @ViewChild('rightPanel') rightPanel!: RightPanelComponent;
    selectedUser: any;
    userSelectedForChat: any;
    chatInstances: any[] = [];
    messageLength: number = 0;
    isChatStarted: boolean = false;

    constructor(private router: Router) {}

    ngOnInit(){
        if (!sessionStorage.getItem('userId')){
            this.router.navigate(['/login']);
        }
    }

    onUserSelected(user: any){
        this.selectedUser = user;
    }

    updateChatInstances(instances: any[]){
        this.chatInstances = instances;
        this.isChatStarted = instances.length > 0;
    }

    updateMessageLength(length: number){
        this.messageLength += length;
    }

    toggleChat(started: boolean){
        this.isChatStarted = started;
    }
}