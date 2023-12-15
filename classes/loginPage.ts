import {Page} from "@playwright/test"


export default class LoginPage{

    constructor(public page: Page){}

    public email;//cts-secure@accumen.com
    public password;//IU$24680

    async enterEmail(email: string){
        await this.page.getByPlaceholder("Enter your email")//"input[name='email']"
        .fill(email);
    }

    async enterPassword(password: string){
        await this.page.getByPlaceholder("Enter your password")//"input[name='password']"
        .fill(password);
    }

    async clickLoginBtn(){
        await this.page.getByRole('button',{name: 'Log in to your account'}).click();//"input[value='Login']"
    }
    
}

//loginpage class tested successful 10/23/2023 by Mary Perez