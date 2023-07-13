import { UserAuthService } from './../services/user-auth.service';
import { AuthStorageService } from './../services/auth-storage.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup( {
    userName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private router: Router, private userAuthService: UserAuthService, private authStorage: AuthStorageService) { }

  ngOnInit(): void {
    if(this.authStorage.isLoggedIn()) {
      let role = this.authStorage.getRole();

      if(!role) {
        console.log('User Not Authenticated');
      } else if(role === 'Admin') {
        console.log("Logged in User Role: "+ role);
        this.router.navigate(['/admin']);
      } else {
        console.log("Logged in User Role: "+ role);
        this.router.navigate(['/user']);
      }
    }
  }

  login() {
    this.userAuthService.login(this.loginForm.value.userName, this.loginForm.value.password).subscribe(
      (response: any) => {
        console.log("Auth Token: " + response.token);
        console.log("Auth User: " + response.userInfo)
        this.authStorage.setAuthenticatedUser(response.userInfo);
        this.authStorage.setToken(response.token);

        const role = response.userInfo.userRole;

        if(role === 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user'])
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  get f() {
    return this.loginForm.controls;
  }

}
