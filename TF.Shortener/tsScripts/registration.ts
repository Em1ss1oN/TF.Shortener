export class Registration {
    Login: string;
    Password: string;
    ConfirmPassword: string;

    constructor(username: string,
        password: string,
        confirnation: string) {
        this.Login = username;
        this.Password = password;
        this.ConfirmPassword = confirnation;
    }
}
