import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Registration } from './registration';
import { MembershipService } from './membership.service';
import { User } from './user';


@Component({
    selector: 'my-login',
    templateUrl: './Components/login.html',
})
export class LoginComponent implements OnInit {

    login = new User('', '');
    registration = new Registration('', '', '');
    loginError = false;
    loginErrorText;
    registerError = false;
    registerErrorText;
    loggedIn = false;
    inProgress = false;
    user: User;

    constructor(private service: MembershipService, private router: Router) { }

    ngOnInit(): void {
        this.loggedIn = false;
        this.user = new User('', '');
        this.service.clearAuthenticatedUser();
    }

    onLogin() {
        this.inProgress = true;
        this.service.login(this.login).subscribe(result => {
                if (result.Success) {
                    this.loginError = false;
                    this.loggedIn = true;
                    this.user = this.service.getLoggedInUser();
                } else {
                    this.setLoginError(result.Message);
                }
                this.inProgress = false;
            },
            error => {
                console.error(error);
                this.setLoginError(error);
                this.inProgress = false;
            });
    }

    setLoginError(value: String) {
        this.loginError = true;
        this.loginErrorText = value;
    }

    onRegister() {
        this.inProgress = true;
        this.service.register(this.registration).subscribe(result => {
                if (result.Success) {
                    this.registerError = false;
                    this.loggedIn = true;
                    this.user = this.service.getLoggedInUser();
                } else {
                    this.setRegisterError(result.Message);
                }
                this.inProgress = false;
            },
            error => {
                console.error(error);
                this.setRegisterError(error);
                this.inProgress = false;
            });
    }

    setRegisterError(value: String) {
        this.registerError = true;
        this.registerErrorText = value;
    }

    logout() {
        this.service.logout().subscribe(response => {
                if (response.Success) {
                    this.user = new User('', '');;
                    this.loggedIn = false;
                }
            },
            error => console.error(error));
    }
}
