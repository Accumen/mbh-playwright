import { Page} from "@playwright/test";

export default class ReportsPage{

    constructor(public page: Page){}

    //variables
    public reportName;
    public facility;
    public provider;
    public caseType;
    public dateRange;
    public startyear;
    public startMonth;
    public startDay;
    public endyear;
    public endMonth;
    public endDay;

    //select reports from navigation menu
    async selectReports(){
        await this.page.getByRole('link',{name:'Reports'}).click();
    }    

    //search report name (fillable)
    async searchReport(reportName){
        await this.page.getByLabel('Search Report Name').click();
        await this.page.getByLabel('Search Report Name').fill(reportName);
        await this.page.getByLabel('Search Report Name').press('Enter');
        await this.page.getByText('Report Type').focus();
    }

    //report type (clickable list)
    async chooseReport(reportName){
        await this.page.getByText(reportName,{exact:true}).click();
    }
    async selectFacilities(){
        await this.page.getByLabel('Select Facilities *').locator('div').nth(3).click();
    }

        //select facility (drop down)
    async selectFacility(facility){
        await this.page.getByLabel('Select Facility *').locator('div').nth(3).click();
        await this.page.getByRole('listbox', {name:'Select Facility'}).locator('label').click();
        await this.page.getByRole('option',{name:facility,exact:true}).locator('mat-pseudo-checkbox').click();
        await this.page.getByRole('option',{name:facility,exact:true}).locator('mat-pseudo-checkbox').press('Tab');
    }
        //select provider (fillable)
    async selectProvider(provider){
        await this.page.getByPlaceholder('Select Provider').click();
        await this.page.getByPlaceholder('Select Provider').fill(provider);
        await this.page.getByPlaceholder('Select Provider').press('Enter');

    }
        //select case type (drop down)
    async selectCaseType(caseType){
        await this.page.getByText('AllSelect Case Type *').click();
        await this.page.locator('.mat-checkbox-inner-container').click();//unselect all
        await this.page.getByRole('option', {name:caseType}).locator('mat-pseudo-checkbox').click();
            /**case type key
             * 123
             * 123
             * Cardio
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
             * WOMEN'S HEALTH- CHRONIC
             * WOMEN'S HEALTH-SURGICAL
             */
        await this.page.locator('.cdk-overlay-backdrop').click();    
    }
        //date range (drop down)
    async selectDateRange(dateRange,startyear?,startMonth?,startDay?,endyear?,endMonth?,endDay?){
        await this.page.getByLabel('Date range *').locator('div').nth(2).click();
        await this.page.getByText(dateRange).click();
            /**date range
             * Last 3 Months
             * This Week
             * This Month
             * This Year
             * Last 12 Months
             * All Time
             * Custom (requires if statement to accomodate the date range selection)
             */
        if (dateRange == 'Custom'){
            await this.page.getByRole('button',{name:'Open calendar'}).click();
            await this.page.getByLabel('Choose month and year').click();
            while(await this.page.getByRole('button', {name:startyear, exact:false}).isHidden()){
               await this.page.getByLabel('Previous 24 years').click();
            }
               await this.page.getByLabel(startyear).click();
               await this.page.getByLabel(startMonth).click();
               await this.page.getByLabel(startDay,{exact:true}).click();    
            //end date    (calendar) 
            await this.page.getByLabel('Choose month and year').click();
            while(await this.page.getByRole('button', {name:endyear, exact:false}).isHidden()){
               await this.page.getByLabel('Previous 24 years').click();
            }
               await this.page.getByLabel(endyear).click();
               await this.page.getByLabel(endMonth).click();
               await this.page.getByLabel(endDay).click();  
        }    
    }
        
        //apply button
    async applyChanges(){
        await this.page.getByRole('button',{name:'Apply'}).click();
    }
        
        //export data button
    async exportData(){
        const downloadPromise = this.page.waitForEvent('download');
        await this.page.getByRole('button',{name:'Export'}).click();
        const download = await downloadPromise;
    }
        
    //clear button
    async clearSelections(){
        await this.page.getByRole('button',{name:'CLEAR'}).click();
    }

    //report validation screenshot
    async verifyReport(num){
        await this.page.screenshot({path:'reportverify'+ num + '.png'});
    }

}