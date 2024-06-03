import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-middle-panel',
  templateUrl: './middle-panel.component.html',
  styleUrls: ['./middle-panel.component.css'],
})
export class MiddlePanelComponent implements OnChanges {
  @Input() selectedUser: any;
  @Input() chatInstances!: any[];

  detailedUserInfo: any;
  testGenderInfo: any;
  userPostalInfo: any;
  showPostalInfo: boolean = true;
  showDetails: boolean = true;

  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedUser'] && changes['selectedUser'].currentValue) {
      this.fetchDetailedUserInfo();
      this.fetchTestGenderInfo(this.selectedUser.firstName);
      this.fetchUserPostalInfo(this.selectedUser.address.postalCode);
    }
  }

  fetchDetailedUserInfo() {
    this.userService
      .getDetailedUserInfo(this.selectedUser.id)
      .subscribe((userInfo: any) => {
        this.detailedUserInfo = userInfo;
      });
  }

  fetchTestGenderInfo(firstName: string) {
    const genderizeUrl = `https://api.genderize.io?name=${firstName}`;
    this.http.get(genderizeUrl).subscribe((response: any) => {
      this.testGenderInfo = response;
    });
  }

  fetchUserPostalInfo(postalCode: string) {
    this.userService.getUserInfoByPostalCode(postalCode).subscribe((userInfo: any) => {
      this.userPostalInfo = userInfo;
    });
  }

  togglePostalInfo() {
    this.showPostalInfo = !this.showPostalInfo;
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }
}