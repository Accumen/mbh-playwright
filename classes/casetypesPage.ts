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
            //this.editCaseTypeName(name);
            await this.page.locator('div').filter({hasText: 'Name'}).nth(4).click();
            await this.page.getByLabel('Name').fill(name);
            //Est. blood loss (fillable)
            //this.editBloodLoss(bloodloss);
            await this.page.getByLabel('Est. Blood Loss').click();
            await this.page.getByLabel('Est. Blood Loss').fill(bloodloss);
            //description (fillable)
            //this.editDescription(description);
            await this.page.getByLabel('Description').click();
            await this.page.getByLabel('Description').fill(description);
            //Type drop down
            //this.editWorklistType(worklisttype);
            //await this.page.getByLabel('Type').click();
            await this.page.getByLabel('Type *').locator('div').nth(3).click();
            await this.page.getByRole('option', { name: worklisttype }).locator('span').click();
            //await this.page.getByRole('option', {name: worklisttype}).locator('span').click();
            //worklisttype key
                //surgical
                //chronic
            //parent case type drop down
            //this.editParentCaseType(parentcasetype);
            await this.page.getByLabel('Parent Case Type').locator('div').nth(3).click();
            await this.page.getByText(parentcasetype, {exact: true}).first().click();
                //list of 76 case types
            //status drop down
            //this.editStatusDropDown(status);
            await this.page.getByText('StatusStatus').click();
            await this.page.getByText(status, {exact: true}).click();
            //status key
                //active
                //inactive
    }
       
        //Save Case Type button
        async saveCaseType(){
            await this.page.getByRole('button', {name: 'Save Case Type'}).click();
        }

        //back arrow button
        async backArrow(){
            await this.page.getByRole('button', {name:''}).click();
        }

    //search case type (fillable field)
    async searchCaseType(searchCase: string){
        await this.page.getByLabel('Search Case Type').fill(searchCase);
        await this.page.getByLabel('Search Case Type').press('Enter');
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
        await this.page.getByLabel('Description').click();
        await this.page.getByLabel('Description').fill(description);
    }
    //Type drop down
    async editWorklistType(worklisttype: string) {
        await this.page.getByLabel('Type *').locator('div').nth(3).click();
        await this.page.getByRole('option', { name: worklisttype }).locator('span').click();
        //worklist type key
        //surgical
        //chronic
    }
    //parent case type drop down
    async editParentCaseType(parentcasetype: string) {
        await this.page.getByLabel('Parent Case Type').locator('div').nth(3).click();
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

    //page navigator

    //row counter
    /**
     * 15
     * 30
     * 50
     */

}