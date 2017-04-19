export class User {
    Login: string;
    Password: string;
    RememberMe: boolean;

    constructor(username: string,
        password: string) {
        this.Login = username;
        this.Password = password;
        this.RememberMe = true;
    }
}
