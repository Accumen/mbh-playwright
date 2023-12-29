import {expect,Page} from "@playwright/test";
import DashboardPage from "./dashboardPage";


export default class WorklistPage{

    constructor(public page: Page){  }

    public row;
    public searchInfo;
    public casetype;
    public status;
    public sortBy;
    public filter;
    
    //surgical menu option
    async clickSurgical(){
        await this.page.getByRole('button', {name: 'Worklist'}).click();//clicks the side menu worklist option
        await this.page.getByRole('link', {name: 'Surgical'}).click();// clicks the Surgical submenu from the worklist
    }
    //chronic menu option
    async clickChronic(){
        await this.page.getByRole('button', {name: 'Worklist'}).click(); // clicks the side menu worklist option
        await this.page.getByRole('link', {name: 'Chronic'}).click(); // clicks the Chronic submenu from the worklist
    }
    /* The rest of the functions are the same no matter which menu is chosen (surgical or chronic) */
    //Search Name, MRN
    async searchMRN(searchInfo: string){
        await this.page.getByText('Search Name, MRN').fill(searchInfo);//types "st" in the MRN search field
        
    }
    //Unselect Select All for Case Type
    async unselectAllCaseTypes(){
        await this.page.getByLabel('Case Type').locator('div').nth(3).click();//selects the case type drop down
        await this.page.locator('.mat-checkbox-inner-container').click({delay: 30}); //deselects the select all case type
    }
    //Select Case Type function
    async selectCaseType(casetype: string){
        
        /**Case Type Key
         * CARDIO
         * Case 18
         * Case Type -3.1
         * Casetype 1414
         * CHRONIC MEDICAL (LISTED IN CHRONIC AS WELL)
         * ENT
         * GASTRO INTESTINAL
         * GENERAL SURGERY
         * NEUROSURGERY
         * ORTHO
         * PLASTICS/RECONSTRUCTION
         * SPINE
         * THORACIC
         * UROLOGY/GU
         * VASCULAR
         * WOMEN\'S HEALTH- CHRONIC (LISTED IN CHRONIC AS WELL)
         * WOMEN\'S HEALTH-SURGICAL
         * 321 (ONLY LISTED IN CHRONIC)
         */
        await this.page.getByRole('option', {name:casetype}).locator('mat-pseudo-checkbox').click();//selects the case type from the drop down
        await this.page.locator(".cdk-overlay-backdrop").click();//clicks the background to close out of the case type menu

    }
    //Select Status
    async selectStatus(status: string){
        await this.page.getByLabel('Active').locator('div').nth(2).click();//selects the drop down menu button for "select status"
        /**Status Key
         * Active
         * My Assigned Visits
         * Inactive
         * Completed
         * Cancelled
         * All
         */
        await this.page.getByText(status).click();//selects the status you want the data filtered by
    }
    //filter
    //new field built for MBHS-662
    async selectFilter(filter: string){
        await this.page.getByLabel('Filter').locator('div').nth(3).click();
        await this.page.getByText(filter,{exact: true}).click({delay: 90}); 
     /**Filter Key
     * Anemic
     * Non-anemic
     * History of Anemia
     * Bloodless
     * Invasive
     * Urgent
     * Short Time Frame
     * Labs Missing
     */
    //needs to check if data loads in the worklist based on the sort 
        //await this.page.getByText("No data found").isVisible();//toast shows when no data loads on table
        //data loads in the worklist    
        //if data loads check for the icon based on the filter value entered
    
        //expect(this.page.getByTitle(filter))
        if(filter != 'Non-anemic'){
            expect(this.page.getByTitle(filter))
            await this.page.getByTitle(filter).first().screenshot({path: 'screenshot.png'});
        }
        else {
            expect(this.page.getByTitle(filter)).toBeHidden();
            await this.page.getByTitle('Non-anemic').screenshot({path: 'screenshotshouldbeblank.png'})
        }
    }
  
    //Select Sort By
    async selectSortBy(sortBy: string){
        await this.page.getByLabel('Sort By').locator('div').nth(3).click();//selects the drop down menu button for "select sort by"
        /**Sort By Key
         * Priority Score //default
         * Date
         */
        await this.page.getByText(sortBy,{exact:true}).click();//selects the method to which you want the data sorted
    }  
    //Calendar option for date filter

      //clear button
    async clearSelections(){
        await this.page.getByRole('button',{name:'CLEAR'}).last().click();//clicks the clear button to remove the data previously entered in the fields
    }  
    // adjust number of rows visible on screen
    async adjustRowCount(row: string){
        await this.page.getByLabel('15').locator('div').nth(2).click();//clicks the drop down for the row count
        /**Row Key
         * 15 (default)
         * 30
         * 50
         */
        await this.page.getByText(row).click();//selects the row count in the []
        
    }
    //export visits
    async exportVisits(){
        await this.page.getByRole('button', {name:'Export Visits'}).click();//clicks the Export Visits button
        //const downloadPromise = this.page.waitForEvent('download');
        //const download = await downloadPromise;
    }
    //Clear Expired Visits
    async clearExpiredVisits(){
        await this.page.locator('#mainFilter div').filter({hasText: 'CLEAR'}).nth(2).click();//looks for the Clear element on the screen
        await this.page.getByRole('button',{name:'CLEAR'}).first().click();//clicks the clear expired visits button
    }
    //Schedule Visit
    async scheduleVisit(){
        await this.page.getByRole('button',{name:'Schedule Visit'}).click();//clicks the Schedule Visit button
        /**Opens the patient schedule screen
         * check box for new or existing patient
         * search field for patient or mrn
         *  searching produces a drop down if patient is found that needs to be clicked
         * next button
         *  moves to visit screen
         *  visit date (calendar and 24hr clock)
         *      check mark button
         *  procedure drop down(has case types list)
         * Add button
         * Delete Button
         * PCP (fillabe not required field)
         * Surgeon (fillable required field)
         * Location(fillable not required field)
         * Facility(pre populated)
         * Back button (takes you to 1st screen)
         * Schedule Visit Button
         * Back Arrow (takes you back to the worklist)
         */

    }


}