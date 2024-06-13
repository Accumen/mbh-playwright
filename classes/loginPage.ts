import {Page} from "@playwright/test"

export default class LoginPage{

    constructor(public page: Page){}
    
    public email;
    public password;

    async enterEmail(email: string){
        await this.page.getByPlaceholder("Enter your email")
        .fill(email);
    }

    async enterPassword(password: string){
        await this.page.getByPlaceholder("Enter your password")
        .fill(password);
    }

    async clickLoginBtn(){
        await this.page.getByRole('button',{name: 'Log in to your account'}).click();
    }
    
}

