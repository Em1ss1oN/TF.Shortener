import { Http, Response, Request, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Registration } from './registration';
import { User } from './user';
import { ISerializable } from './serializable';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MembershipService {

    private accountRegisterApi: string = 'api/account/register/';
    private accountLoginApi: string = 'api/account/login/';
    private accountLogoutApi: string = 'api/account/logoff/';

    private headers = new Headers({ 'Content-Type': 'application/json' });


    constructor(private http: Http) {
    }

    register(newUser: Registration): Observable<LoginResponse> {
        return this.http.post(this.accountRegisterApi, JSON.stringify(newUser), { 'headers': this.headers })
            .map((response: Response) => {
                let result = new LoginResponse().deserialize(response.json());
                if (result.Success) {
                    this.setAuthenticatedUser(new User(newUser.Login, newUser.Password));
                }
                return result;
            });
    }

    login(creds: User): Observable<LoginResponse> {
        return this.http.post(this.accountLoginApi, JSON.stringify(creds), { 'headers': this.headers })
            .map((response: Response) => {
                let result = new LoginResponse().deserialize(response.json());
                if (result.Success) {
                    this.setAuthenticatedUser(creds);
                }
                return result;
            });
    }

    logout(): Observable<LoginResponse> {
        return this.http.post(this.accountLogoutApi, { 'headers': this.headers })
            .map((response: Response) => {
                let result = new LoginResponse().deserialize(response.json());
                if (result.Success) {
                    this.clearAuthenticatedUser();
                }
                return result;
            });
    }

    setAuthenticatedUser(user: any) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    clearAuthenticatedUser() {
        localStorage.removeItem('user');
    }

    isUserAuthenticated(): boolean {
        var _user: any = localStorage.getItem('user');
        if (_user != null)
            return true;
        else
            return false;
    }

    getLoggedInUser(): User {
        var user: User;

        if (this.isUserAuthenticated()) {
            var data = localStorage.getItem('user');
            try {
                var userData = JSON.parse(data);
                user = new User(userData.Login, userData.Password);
            } catch (e) {

            } 
        }

        return user;
    }
}

export class LoginResponse implements ISerializable<LoginResponse> {
    Success: boolean;
    Message: string;
    User: string;

    deserialize(input): LoginResponse {
        this.Message = input.Message;
        this.Success = input.Success;
        this.User = input.User;
        return this;
    }
}