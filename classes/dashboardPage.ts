import { Page} from "@playwright/test";

export default class DashboardPage{

    constructor(public page: Page){  }

    public optionClient;
    public facility;
    public casetype;
    public selection;
    public navSelect;
    //function for the "MBH" button
    //select client drop down
    //change button
    async clickClientDropDown(optionClient: string){
        await this.page.getByRole('button', {name:'MBH'}).click()
        await this.page.getByLabel('MBH').locator('div').nth(3).click();//this selects the "drop down" for the client list
        /**
         * optionClient key for below 
         * MBH
         * Conemaugh
         * Deaconess New
         * El Camino
         * Farmers Trauma Center
         * Newlife hospital
         * QA Testing
         * Report Testing client
         * Test Client
         * TJUH
         */
        await this.page.getByRole('option',{name: optionClient}).click();//selects the client from the drop down list
        await this.page.getByRole('button', {name: 'Change'}).click({delay:90}); //this clicks the change button to "select" the client for MBH.
        //await this.page.waitForLoadState();// call to wait for the page to load after the change button is selected
    }
    //User Button (label=icon-button with share icon)
    //logout
    async clickLogout(){
        await this.page.getByLabel('Example icon-button with share icon').click();
        await this.page.getByRole('menuitem', { name: 'Logout' }).click();
    }
    //unselect all for Facility
    async unselectAllFacility(){
        await this.page.getByLabel('Select Facility').locator('div').nth(3).click();
        await this.page.locator("id=mat-checkbox-1").click({delay:30});// deselects the default select all option

    }
    // select facility
    async clickFacility(facility: string){
        //await this.page.getByLabel('Select Facility').locator('div').nth(3).click(); //clicks the drop down select for facility but isn't
        //needed unless you choose to keep the select all option selected and want to unselect some facilities
        /**
         * (facility would be client dependent)
         */
        
        await this.page.getByRole('option', {name:facility}).locator('mat-pseudo-checkbox').click();//selects the facility from the drop down
        await this.page.locator('.cdk-overlay-backdrop').click();//clicks the background to close out of the case type menu
    }
     //unselect all for Case Type
     async unselectAllCaseTypes(){
        await this.page.getByLabel('Case Type').locator('div').nth(3).click();
        await this.page.locator("id=mat-checkbox-2").click({delay: 30}); //deselects the select all case type
     }
     // select casetype
     async clickCaseType(casetype: string){
        //await this.page.getByLabel('Case Type').locator('div').nth(3).click();//selects the case type from the drop down but isn't needed unless
        //unselectAllCaseTypes function is not ran first 
        /**Case Type Array Key
         * CARDIO
         * Case 18
         * Case Type -3.1
         * Casetype 1414
         * CHRONIC MEDICAL
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
         * WOMEN\'S HEALTH- CHRONIC
         * WOMEN\'S HEALTH-SURGICAL
         */

        await this.page.getByRole('option',{name:casetype}).locator('mat-pseudo-checkbox').click();//selects the case type from the drop down
        await this.page.locator('.cdk-overlay-backdrop').click();//clicks the background to close out of the case type menu
     }
    //date range drop down function
    //apply button
    async clickDateRange(selection: string){
        await this.page.getByLabel('Date range').locator('div').nth(3).click(); // clicks the drop down selector for date range
        /** Selection Key
         * This Week
         * This Month
         * Last 3 Months
         * This Year
         * Last 12 Months
         * All Time
         * Custom 
        */
        await this.page.getByText(selection).click();//selects the option from the date range drop down menu
        //will need to build a special function to handle the calendar pop up that is created by selecting "custom"
        /*
          await page.getByText('Custom').click();
          await page.getByLabel('Open calendar').click();
          await page.getByLabel('Choose month and year').click();
          await page.getByText('2022').click();
          await page.getByText('MAR', { exact: true }).click();
          await page.getByText('23', { exact: true }).click();
          await page.getByLabel('Next month').click();
          await page.getByText('14').click();
        */
        await this.page.getByRole('button', {name:'APPLY'}).click();//apply button has to be selected whenever the drop down menu option changes

    }
    //download excel function
    async excelDownload(){
        await this.page.getByRole('button',{name:'Download Excel'}).click();// selects the download excel button
        const downloadPromise = this.page.waitForEvent('download');//looks for the download popup and waits for it to finish
    }
    //download pdf function
    async pdfDownload(){
        await this.page.getByRole('button',{name:'Download PDF'}).click();//selects the download pdf button
        const downloadPromise = this.page.waitForEvent('download');//looks for the download popup and waits for it to finish
    }
    //left side navigation menu
    async navigationMenu(navSelect: string){
        /**
         * navSelect Key
         * Documents
         * Smart Sections
         * Email Templates
         * Lab Types 
         * Lab Types Mapping 78
         * Case Types
         * Case Types Mapping 273
         * Clients
         * Users
         * Reports
         * Dashboard
         * Facilities
         * Patients
         * Providers
         * Worklist
         * Surgical
         * Chronic
         */
        await this.page.getByRole('link',{name: navSelect}).click();

    }

}










