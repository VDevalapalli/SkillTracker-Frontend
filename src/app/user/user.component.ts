import { AuthStorageService } from './../services/auth-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userName: any;

  constructor(public authStorage: AuthStorageService) { }

  ngOnInit(): void {
    let userInfo = this.authStorage.getAuthenticatedUser();

    this.userName = userInfo.firstName + ', ' + userInfo.lastName;
  }

}
