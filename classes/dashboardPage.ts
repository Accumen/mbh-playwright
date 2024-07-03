import {expect,Page} from "@playwright/test";
import { after } from "node:test";
import {getComparator}from "playwright-core/lib/utils"

export default class DashboardPage{

    constructor(public page: Page){  }

    public optionClient;
    public currentClient;
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
        await this.page.getByRole('option',{name: optionClient,exact:true}).click();//selects the client from the drop down list
        await this.page.getByRole('button', {name: 'Change'}).click({delay:90}); //this clicks the change button to "select" the client for MBH.
        //await this.page.waitForLoadState();// call to wait for the page to load after the change button is selected
    }
    //change from one client to another
    async changeClient(currentClient: string, optionClient){
        await this.page.getByRole('button', {name: currentClient,exact:true}).click() //this selects the client drop down for current client
        await this.page.getByLabel(currentClient).locator('div').nth(3).click(); //this selects the "drop down" for the client list
        await this.page.getByRole('option',{name: optionClient,exact:true}).click(); //selects the client from the drop down list
        await this.page.getByRole('button', {name: 'Change'}).click({delay:90}); //this clicks the change button to "select" the client for MBH.
    }
    //User Button (label=icon-button with share icon)
    //logout
    async clickLogout(){
        await this.page.getByLabel('Example icon-button with share icon').click();
        await this.page.getByRole('menuitem', { name: 'Logout' }).click();
    }
    //unselect all for Facility
    async unselectAllFacility(){
        await this.page.getByPlaceholder('Select Facilities').locator('div').nth(3).click();
        await this.page.locator("id=mat-mdc-checkbox-2-input").click({delay:30});// deselects the default select all option

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
        await this.page.getByPlaceholder('Select Case Type').locator('div').nth(3).click();
        await this.page.locator("id=mat-mdc-checkbox-1-input").click({delay: 30}); //deselects the select all case type
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
    async clickDateRange(selection,startyear?,startmonth?,startday?,endyear?,endmonth?,endday?){
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
        if(selection == 'Custom'){
            //start date (calendar)
            await this.page.getByRole('button',{name:'Open calendar'}).click();
            await this.page.getByLabel('Choose month and year').last().click();
               while(await this.page.getByRole('button', {name:startyear, exact:false}).first().isHidden()){
                    await this.page.getByLabel('Previous 24 years').click();
               }
                    await this.page.getByLabel(startyear,{exact:true}).click();
                    await this.page.getByLabel(startmonth).click();
                    await this.page.getByText(startday,{exact:true}).last().click();    
                    //end date    (calendar) 
                    if(endyear != startyear){
                    await this.page.getByLabel('Choose month and year').last().click();
                    while(await this.page.getByRole('button', {name:endyear, exact:false}).first().isHidden()){
                       await this.page.getByLabel('Previous 24 years').click();}
                       await this.page.getByLabel(endyear,{exact:true}).click();
                    }
                    else{
                        while(await this.page.locator('#mat-datepicker-0').getByText(endmonth,{exact:true}).isHidden()){
                            await this.page.getByRole('button',{name:'Next month'}).last().click();
                        }}
                        await this.page.getByRole('dialog',{name:'Custom Date Range',exact:false}).getByText(endday,{exact:false}).first().click();
                       //await this.page.getByText(endday).first().click();
                       await this.page.getByRole('button', {name:'APPLY'}).click()
                   }
            else{
            await this.page.getByRole('button', {name:'APPLY'}).click();//apply button has to be selected whenever the drop down menu option changes
            } 
    } 
    //reset cache button
    async resetCache(){
        await this.page.getByRole('button',{name: 'Reset Cache'}).click();
    }  
    
    async dataverify(num){
        await this.page.screenshot({path:'dataverify' + num + '.png'}); 
    }

    async datacomparison(){
        expect(await this.page.getByTitle('User Login').screenshot()).toMatchSnapshot('basescreenshot.png');
    }

    async ganzoniCalculator(weightype,weight, curHgb){
        await this.page.locator('button').filter({hasText:'work'}).click();
        await this.page.getByRole('menuitem',{name:'Ganzoni Calculator'}).click();

        if (weightype != 'lbs'){
            //select kg
            await this.page.locator('#mat-radio-3').click();
            //enter kg weight
            await this.page.getByPlaceholder('Weight').click();
            await this.page.getByPlaceholder('Weight').fill(weight);
        }
        else{
            //enter lbs weight
            await this.page.getByPlaceholder('Weight').click();
            await this.page.getByPlaceholder('Weight').fill(weight);
        }
        //enter current hgb
        await this.page.getByText('Current HGB (g/dL)').click();
        await this.page.getByText('Current HGB (g/dL)').fill(curHgb);

        //capture value

    }
   //dashboard screenshot
    async dashboardscreenshot(){
        await this.page.getByText('Facilities: All',{exact:true}).scrollIntoViewIfNeeded();
    }    //export to excel
    async exportToExcel(){
        const downloadPromise = this.page.waitForEvent('download');
        await this.page.getByRole('button', {name: 'Export Excel'}).click();
        const download = await downloadPromise;
        await download.saveAs('./testdata/'+ download.suggestedFilename());
    }
    //export to pdf
    async exportToPdf(){
        const downloadPromise = this.page.waitForEvent('download');
        await this.page.getByRole('button', {name: 'Export PDF'}).click();
        const download = await downloadPromise;
        await download.saveAs('./testdata/'+ download.suggestedFilename());
    }
    //APPLY FILTERS
    async applyFilters(){
        await this.page.getByRole('button',{name:'APPLY'}).click();
    }
    //performance calendar


}










