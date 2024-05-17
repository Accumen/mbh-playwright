import { Page} from "@playwright/test";

export default class UsersPage{

    constructor(public page: Page){}

    //variables

    // choose users from side navigation menu
    async selectUsers(){
        await this.page.getByRole('link',{name:'Users'}).click();
    }

    //search name, email (fillable)
    async searchUser(user){
        await this.page.getByLabel('Search name, email').click();
        await this.page.getByLabel('Search name , email').fill(user);
        await this.page.getByLabel('Search name , email').press('Enter');
    }

    //status drop down
    async userStatus(ustatus){
        await this.page.getByLabel('Active').locator('div').nth(3).click();
        await this.page.getByText(ustatus,{exact:true}).click();
        /**ustatus key
         * active
         * inactive
         */
    }

    //clear button
    async clearSelections(){
        await this.page.getByRole('button',{name:'CLEAR'}).click();
    }
   
    //add users button
    async addUser(){
        await this.page.getByRole('button',{name:'Add Users'}).click();
    }

    //new user screen
    async newUser(fname,lname,email,cadmin,contents,users,clinical,reports,mapping,ustatus){
        //first name
        await this.page.getByLabel('First Name *').click();
        await this.page.getByLabel('First Name *').fill(fname);
        //last name
        await this.page.getByLabel('Last Name *').click();
        await this.page.getByLabel('Last Name *').fill(lname);
        //email
        await this.page.getByLabel('Email *').click();
        await this.page.getByLabel('Email *').fill(email);
        //client admin (checkbox)
        if (cadmin != 'yes'){
            //contents (checkbox)
            if(contents == 'yes'){
                //check box for contents
                await this.page.locator('#mat-checkbox-5 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
            }
            //users (checkbox)
            if (users == 'yes'){
                //check box for users
                await this.page.locator('#mat-checkbox-6 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
            }
            //clinical navigation (checkbox)
            if (clinical == 'yes'){
                //check box for clinical navigation
                await this.page.locator('#mat-checkbox-7 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
            }
            //reports (checkbox)
            if(reports == 'yes'){
                //check box for reports
                await this.page.locator('#mat-checkbox-8 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
            }
            //mapping (checkbox)
            if(mapping == 'yes'){
                //check box for mapping
                await this.page.locator('#mat-checkbox-9 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
            }
        }
        else{
            //check the client admin box and all other boxes are checked automatically
            await this.page.locator('#mat-checkbox-4').click();
        }
        //status drop down
        await this.page.getByLabel('Status').locator('div').nth(3).click();
        await this.page.getByText(ustatus,{exact: true}).click();
            /**ustatus key
             * Active
             * Inactive
             * Unverified
             */
    }

    //save user button
    async saveUser(){
        await this.page.getByRole('button',{name:'Save User'}).click();
    }

    //back arrow button
    async backArrow(){
        await this.page.getByRole('button',{name:''}).click()
    }

    //select user from search list
    async selectUserfromSearch(user){
        await this.page.getByRole('link',{name:user, exact:true}).click();
    }

    //edit user information
    async editUserfName(fname){
        await this.page.getByLabel('First Name *').click();
        await this.page.getByLabel('First Name *').fill(fname);
    }

    async editUserlName(lname){
        await this.page.getByLabel('Last Name *').click();
        await this.page.getByLabel('Last Name *').fill(lname);
    }

    async editUserEmail(email){
        await this.page.getByLabel('Email *').click();
        await this.page.getByLabel('Email *').fill(email);
    }

    async editUserCredentials(cadmin,contents,users,clinical,reports,mapping){
        //client admin (checkbox)
        if (cadmin != 'yes'){
            //contents (checkbox)
            if(contents == 'yes'){
                //check box for contents
                await this.page.locator('#mat-checkbox-5 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
            }
            //users (checkbox)
            if (users == 'yes'){
                //check box for users
                await this.page.locator('#mat-checkbox-6 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
            }
            //clinical navigation (checkbox)
            if (clinical == 'yes'){
                //check box for clinical navigation
                await this.page.locator('#mat-checkbox-7 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
            }
            //reports (checkbox)
            if(reports == 'yes'){
                //check box for reports
                await this.page.locator('#mat-checkbox-8 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
            }
            //mapping (checkbox)
            if(mapping == 'yes'){
                //check box for mapping
                await this.page.locator('#mat-checkbox-9 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
            }
        }
        else{
            //check the client admin box and all other boxes are checked automatically
            await this.page.locator('#mat-checkbox-4').click();
        }
    }

    //regions 
    async addeditUserRegions(region){
        switch(region){
            case 1:{
                await this.page.locator('id=mat-checkbox-20-input').click();
                break;
            }
            case 2:{
                await this.page.locator('id=mat-checkbox-22-input').click();
                break;
            }
            case 3:{
                await this.page.locator('id=mat-checkbox-20-input').click();
                await this.page.locator('id=mat-checkbox-22-input').click();
                break;
            }
        }

    }

    //reset password button
    async resetPassword(){
        await this.page.getByRole('button',{name:'Reset Password'}).click();
    }
    
    //delete button
    async deleteUser(){
        await this.page.getByTitle('Delete').click();
    }

    

}