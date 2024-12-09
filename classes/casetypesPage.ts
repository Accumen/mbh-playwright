import {expect,Page} from "@playwright/test";

export default class CasetypesPage{

    constructor(public page: Page){}
    
    //variable
    public name;
    public bloodloss;
    public description;
    public worklisttype;
    public parentcasetype;
    public status;
    public searchCase;

    //select case types from the navigation menu
    async selectCaseTypeMenu(){
        await this.page.getByRole('link',{name:'Case Types'}).first().click({delay:90});
    }

    //add case type button
    async clickAddCaseType(){
        await this.page.getByRole('button', {name:'Add Case Type'}).click();//opens a new case type window
    }
    //new case type window fields
    async newCaseType(name:string, bloodloss: string, description: string, worklisttype: string, parentcasetype: string, status: string){
        
            //name (fillable)
            await this.page.locator('div').filter({hasText: 'Name'}).nth(4).click();
            await this.page.getByLabel('Name').fill(name);
            //Est. blood loss (fillable)
            await this.page.getByLabel('Est. Blood Loss').click();
            await this.page.getByLabel('Est. Blood Loss').fill(bloodloss);
            //description (fillable)
            await this.page.getByPlaceholder('Description').click();
            await this.page.getByPlaceholder('Description').fill(description);
            //Type drop down
            await this.page.getByPlaceholder('Type').locator('div').nth(3).click();
            await this.page.getByRole('option', { name: worklisttype, exact:true}).locator('span').click();
            //worklisttype key
                //surgical
                //chronic
            //parent case type drop down
            await this.page.getByPlaceholder('Parent Case Type').locator('div').nth(3).click();
            await this.page.getByRole('option',{name:parentcasetype, exact: true}).first().click();
                //list of 76 case types
            //status drop down
            await this.page.getByLabel('Status').getByText('Status').click();
            await this.page.getByText(status, {exact: true}).click();
            //status key
                //active
                //inactive
    }
       
        //Save Case Type button
        async saveCaseType(){
            await this.page.getByRole('button', {name: 'Save Case Type'}).click();
            await expect(this.page.locator('id=toast-container',{hasText:'case type successfully saved'})).toBeInViewport();
        }

        //back arrow button
        async backArrow(){
            await this.page.getByRole('button', {name:'Back'}).click();
        }

        //sync button
        async syncCaseType(){
            this.page.on('dialog',dialog => dialog.accept());
            await this.page.getByTitle('Sync').first().click({delay:2000});
        }
        
        //delete case type
        async deleteCaseType(){
            this.page.on('dialog',dialog => dialog.accept());
            await this.page.getByTitle('Delete').first().click();
            await expect(this.page.locator('id=toast-container',{hasText:'Case Type deleted successfully'})).toBeInViewport();
            }
        

    //search case type (fillable field)
    async searchCaseType(searchCase: string){
        await this.page.getByLabel('Search Case Type').fill(searchCase);
        await this.page.getByLabel('Search Case Type').press('Enter');
        await this.page.getByText(searchCase).focus();
    }

    //status drop down
    async statusDropDown(status: string){
        await this.page.getByLabel('Status').locator('div').nth(3).click();
        await this.page.getByText(status, {exact: true}).click();
    /**status key
     * active
     * inactive
     */
    }
    //clear button
    async clearSelections(){
        await this.page.getByRole('button', {name:'CLEAR'}).click();
    }

    //case type name (clickable) 
    async selectCaseTypeName(searchCase: string){
        await this.page.getByRole('link',{name: searchCase}).first().click();//opens case type box to edit fields
    }
        
    //name (fillable)
    async editCaseTypeName(name: string) {
        await this.page.locator('div').filter({ hasText: 'Name' }).nth(4).click();
        await this.page.getByLabel('Name').fill(name);
    }
    //Est. blood loss (fillable)
    async editBloodLoss(bloodloss: string) {
        await this.page.getByLabel('Est. Blood Loss').click();
        await this.page.getByLabel('Est. Blood Loss').fill(bloodloss);
    }
    //description (fillable)
    async editDescription(description: string) {
        await this.page.getByPlaceholder('Description').click();
        await this.page.getByPlaceholder('Description').fill(description);
    }
    //Type drop down
    async editWorklistType(worklisttype: string) {
        await this.page.getByPlaceholder('Type').locator('div').nth(3).click();
        await this.page.getByRole('option', {name:worklisttype,exact:true }).locator('span').click();
        //worklist type key
        //surgical
        //chronic
    }
    //parent case type drop down
    async editParentCaseType(parentcasetype: string) {
        await this.page.locator('#mat-select-value-9').click();
        //await this.page.getByLabel('Parent Case Type').locator('div').nth(3).click();
        await this.page.getByText(parentcasetype, { exact: true }).click();
        //list of 76 case types
    }
    //status drop down
    async editStatusDropDown(status: string) {
        await this.page.getByLabel('Status').locator('div').nth(3).click();
        await this.page.getByText(status, { exact: true }).first().click();
        //Status key
        //active
        //inactive
    }
        //Save Case Type button
        //back arrow button

 //pagination
 async caseTypePagination(num){    await this.page.getByText('›',{exact:true}).scrollIntoViewIfNeeded();
    await this.page.getByRole('link', { name: num }).click({delay:1000});
}
//check current page of pagination
async paginationCheck(){
    await this.page.getByText('›',{exact:true}).scrollIntoViewIfNeeded();
}
//case type screenshot
async caseTypeScreenshot(num){
    await this.page.screenshot({path:'casetypescreenshot'+ num +'.png',fullPage:true});
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

}