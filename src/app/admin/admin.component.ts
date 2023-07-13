import { AuthStorageService } from './../services/auth-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userName: any;

  constructor(public authStorage: AuthStorageService) { }

  ngOnInit(): void {
    let userInfo = this.authStorage.getAuthenticatedUser();

    this.userName = userInfo.firstName + ', ' + userInfo.lastName;
  }

}
