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
        await this.page.getByText('Search name , email').click();
        await this.page.getByText('Search name , email').fill(user);
        await this.page.getByText('Search name , email').press('Enter');
    }

    //status drop down
    async userStatus(ustatus){
        await this.page.getByLabel('Active').locator('div').nth(3).click();
        await this.page.getByRole('option',{name:ustatus,exact:true}).click();
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
        //await this.page.getByLabel('First Name *').click();
        //await this.page.getByLabel('First Name *').fill(fname);
        await this.page.getByRole("textbox", { name: "First Name", exact: true }).click();
        await this.page.getByRole("textbox", { name: "First Name", exact: true }).fill(fname);

        //last name
        //await this.page.getByText('Last Name*').click();
        //await this.page.getByPlaceholder('Last Name*').fill(lname);
        await this.page.getByRole("textbox", { name: "Last Name", exact: true }).click();
        await this.page.getByRole("textbox", { name: "Last Name", exact: true }).fill(lname);
        //email
        await this.page.getByRole("textbox", { name: "Email", exact: true }).click();
        await this.page.getByRole("textbox", { name: "Email", exact: true }).fill(email);
        //client admin (checkbox)
        if (cadmin != 'yes'){
            //contents (checkbox)
            if(contents == 'yes'){
                //check box for contents
                await this.page.locator('id=mat-mdc-checkbox-3-input').click();
            }
            //users (checkbox)
            if (users == 'yes'){
                //check box for users
                await this.page.locator('id=mat-mdc-checkbox-4-input').click();
            }
            //clinical navigation (checkbox)
            if (clinical == 'yes'){
                //check box for clinical navigation
                await this.page.locator('id=mat-mdc-checkbox-5-input').click();
            }
            //reports (checkbox)
            if(reports == 'yes'){
                //check box for reports
                await this.page.locator('id=mat-mdc-checkbox-6-input').click();
            }
            //mapping (checkbox)
            if(mapping == 'yes'){
                //check box for mapping
                await this.page.locator('id=mat-mdc-checkbox-7-input').click();
            }
        }
        else{
            //check the client admin box and all other boxes are checked automatically
            await this.page.locator('id=mat-mdc-checkbox-1-input').click();
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
        await this.page.locator('id=toast-container',{hasText:'User saved successfully'}).isVisible();
    }

    //back arrow button
    async backArrow(){
        await this.page.getByRole('button',{name:'Back'}).click()
    }

    //select user from search list
    async selectUserfromSearch(user){
        await this.page.getByRole('link',{name:user, exact:true}).click();
    }

    //edit user information
    async editUserfName(fname){
        await this.page.getByPlaceholder('First Name').click();
        await this.page.getByPlaceholder('First Name').fill(fname);
    }

    async editUserlName(lname){
        await this.page.getByPlaceholder('Last Name').click();
        await this.page.getByPlaceholder('Last Name').fill(lname);
    }

    async editUserEmail(email){
        await this.page.getByPlaceholder('Email').click();
        await this.page.getByPlaceholder('Email').fill(email);
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
        await this.page.getByTitle('Delete').first().click();
    }

          //pagination
          async usersPagination(num){
            await this.page.getByText('›',{exact:true}).scrollIntoViewIfNeeded();
            await this.page.getByRole('link', { name: num }).click({delay:1000});
        }
        //check current page of pagination
        async paginationCheck(){
            await this.page.getByText('›',{exact:true}).scrollIntoViewIfNeeded();
        }

       // adjust number of rows visible on screen
       async adjustRowCount(row: string){
        await this.page.getByLabel('15').locator('div').nth(2).scrollIntoViewIfNeeded();
        await this.page.getByLabel('15').locator('div').nth(2).click();//clicks the drop down for the row count
            /**Row Key
             * 15 (default)
             * 30
             * 50
             */
        await this.page.getByText(row,{exact:true}).click();//selects the row count in the []
    }

    //add region(s)
    async addregion(region){
        await this.page.getByLabel(region,{exact:true}).check();
    }

    //add facility(s)
    async addFacility(facility){
        await this.page.getByLabel(facility,{exact:true}).check();
    }

}