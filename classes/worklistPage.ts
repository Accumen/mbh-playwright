import {expect,Page} from "@playwright/test";
import DashboardPage from "./dashboardPage";
import { fn } from "moment";


export default class WorklistPage{

    constructor(public page: Page){  }

    public row;
    public searchInfo;
    public casetype;
    public status;
    public sortBy;
    public filter;
    public patienttype;
    public fname;
    public mname;
    public lname;
    public prefix;
    public suffix;
    public credentials;
    public email;
    public mrn;
    public dobyear;
    public dobMonth;
    public dobDay;
    public phone;
    public street;
    public aptunt;
    public city;
    public state;
    public zip;
    public gender;
    public hippa;
    public hhMonthdd;
    public procedure;
    public pYear;
    public pMonth;
    public pDay;
    public pclickcount; //24hr clock
    public pcp;
    public surgeon;
    public location;

    //click Worklist from Side navigation menu
    async clickWorklist(){
        await this.page.getByRole('button', {name: 'Worklist'}).click();//clicks the side menu worklist option
    }
    
    //surgical menu option
    async clickSurgical(){
        await this.page.getByRole('link', {name: 'Surgical'}).click({delay:1000});// clicks the Surgical submenu from the worklist
    }
    //chronic menu option
    async clickChronic(){
        await this.page.getByRole('link', {name: 'Chronic'}).click({delay:1000}); // clicks the Chronic submenu from the worklist
    }
    /* The rest of the functions are the same no matter which menu is chosen (surgical or chronic) */
    //Search Name, MRN
    async searchMRN(searchInfo: string){
        await this.page.getByText('Search Name, MRN').fill(searchInfo);//types "st" in the MRN search field
        
    }
    //Unselect Select All for Case Type
    async unselectAllCaseTypes(){
        await this.page.getByLabel('Case Type').locator('div').nth(3).click();//selects the case type drop down
        await this.page.locator('.mat-checkbox-inner-container').click({delay:100}); //deselects the select all case type
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
        await this.page.getByRole('option', {name:casetype}).locator('mat-pseudo-checkbox').press('Tab');
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
        await this.page.getByLabel('Active').click();//selects the status you want the data filtered by
        await this.page.getByText(status,{exact:true}).click();
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
    async scheduleSurgicalVisit(patienttype: string, fname?, mname?, lname?, email?, mrn?,dobyear?,dobMonth?,dobDay?,phone?,street?, city?,
        state?,zip?, gender?,hippa?,hhMonthdd?,pYear?, pMonth?, pDay?, pclickcount?,
        procedure?, surgeon?){
        //expect (this.page.locator('id=toast-container').getByText('Patients fetched successfully').isVisible);
        //await this.page.waitFor(3000);
        await this.page.getByRole('button', {name:' Schedule Visit'}).waitFor({state:'attached'})
        await this.page.getByRole('button', {name:' Schedule Visit'}).click({delay:1000});//clicks the Schedule Visit button
        //Opens the patient schedule screen
         //check box for new or existing patient
         //if statement for new or existing patient
            if(patienttype != 'Existing'){
         //*New */
         //select the new check box
         await this.page.locator('.mat-checkbox-inner-container').first().click();
         //first name
         await this.page.getByLabel('First Name *').click();
         await this.page.getByLabel('First Name *').fill(fname);
         //middle name
         await this.page.getByLabel('Middle Name').click();
         await this.page.getByLabel('Middle Name').fill(mname);
         //last name
         await this.page.getByLabel('Last Name *').click();
         await this.page.getByLabel('Last Name *').fill(lname);
         //email
         await this.page.getByLabel('Email').click();
         await this.page.getByLabel('Email').fill(email);
         //MRN
         await this.page.getByLabel('MRN *').click;
         await this.page.getByLabel('MRN *').fill(mrn);
         //dob
         await this.page.locator('#newPatientBlock').getByLabel('Open calendar').click();
         await this.page.getByLabel('Choose month and year').click();
         while(await this.page.getByRole('button', {name:dobyear, exact:true}).isHidden()){
            await this.page.getByLabel('Previous 24 years').click();
         }
            await this.page.getByLabel(dobyear).click();
            await this.page.getByLabel(dobMonth).click();
            await this.page.getByLabel(dobDay).click();
         //phone number
         await this.page.getByLabel('Phone No *').click();
         await this.page.getByLabel('Phone No *').fill(phone);
         //street
         await this.page.getByLabel('Street *').click();
         await this.page.getByLabel('Street *').fill(street);
         //apt/unit
         //city
         await this.page.getByLabel('City *').click();
         await this.page.getByLabel('City *').fill(city);
         //state
         await this.page.getByLabel('State *').click();
         await this.page.getByLabel('State *').fill(state);
         //zip
         await this.page.getByLabel('PostalCode').click();
         await this.page.getByLabel('PostalCode').fill(zip);
         //gender (drop down)
         await this.page.getByLabel('Gender').locator('div').nth(2).click();
         await this.page.getByText(gender, {exact:true}).click();
         //hippa checkbox
         if(hippa = 'yes'){
         await this.page.locator('#mat-checkbox-6 > .mat-checkbox-layout > .mat-checkbox-inner-container').click()
         }
         else{
            //no need to check the box
         }
         //health history date
         await this.page.locator('mat-form-field').filter({hasText: 'Health History Date'}).getByLabel('Open calendar').click();
         await this.page.getByLabel(hhMonthdd).click()
         //checkmark button to close the calendar
         await this.page.locator('button').filter({hasText: 'done'}).click();
         //prefix(optional)
         //await this.page.getByLabel('Prefix').click();
         //await this.page.getByLabel('Prefix').fill(prefix);
         //suffix(optional)
         //await this.page.getByLabel('Suffix').click();
         //await this.page.getByLabel('Suffix').fill(suffix);
         //credentials(optional)
         //await this.page.getByLabel('Credentials').click();
         //await this.page.getByLabel('Credentials').fill(credentials);
            }
            else{
         //*Existing */
         //select the existing check box
         await this.page.locator('#mat-checkbox-5 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
         //search field for patient or mrn
         await this.page.getByLabel('Patient / MRN').click();
         await this.page.getByRole('combobox', { name: 'Patient / MRN' }).fill(mrn);
         await this.page.getByRole('combobox', { name: 'Patient / MRN' }).press('Enter');
         //searching produces a drop down if patient is found that needs to be clicked
         await this.page.getByText(mrn).click();
            }
         //next button
         await this.page.getByRole('button',{name:'Next'}).click();
         //**Visit screen**
         //visit date (calendar and 24hr clock)
         await this.page.getByRole('button',{name:'Open calendar'}).click();
         await this.page.getByLabel('Choose month and year').click();
         await this.page.getByRole('button',{name:pYear, exact:true}).click();
         await this.page.getByRole('button',{name: pMonth, exact: false}).click();
         await this.page.getByLabel(pDay).click();
         await this.page.getByLabel('expand_less icon').first().click({clickCount: pclickcount});
              /**Click Count Key for 24hr clock
               * 1 = 1am
               * 2 = 2am
               * 3 = 3am
               * 4 = 4am
               * 5 = 5am
               * 6 = 6am
               * 7 = 7am
               * 8 = 8am
               * 9 = 9am
               * 10 = 10am
               * 11 = 11am
               * 12 = 12pm
               * 13 = 1pm
               * 14 = 2pm
               * 15 = 3pm
               * 16 = 4pm
               * 17 = 5pm
               * 18 = 6pm
               * 19 = 7pm
               * 20 = 8pm
               * 21 = 9pm
               * 22 = 10pm
               * 23 = 11pm
               * 24 = 12am
              */
         
         //check mark button
         await this.page.locator('button').filter({hasText: 'done'}).click();
         //procedure drop down(has case types list)
         await this.page.getByLabel('Procedure *').locator('div').nth(2).click();
         await this.page.getByText(procedure,{exact:true}).click()
         /**Surgical Procedure key
          * ORTHO
          * CARDIO
          * SPINE
          * WOMEN'S HEALTH-SURGICAL
          * GASTRO INTESTINAL
          * ENT
          * NEUROSURGERY
          * VASCULAR
          * RE-EXPLORATION CHEST
          * COLECTOMY/BOWEL RESECTION
          * GASTRECTOMY
          * CYSTOPROSTATECTOMY
          * MULTIPLE SURGERIES
          * CEREBRAL ANEURYSM
          * GIANT BASILAR ANEURYSM
          * HYSTERECTOMY
          * PLACENTA ACCRETA
          * BREAST REDUCTION/RECONSTRUCTION
          * FLAP RECONSTRUCTION FOR PRESSURE ULCERS
          * CORONARY ARTERY BYPASS-PRIMARY
          * CORONARY ARTERY BYPASS-REVISION
          * VALVE REPLACEMENT-PRIMARY
          * THORACIC
          * UROLOGY/GU
          * GENERAL SURGERY
          * PLASTICE/RECONSTRUCTION
          * TOTAL KNEE ARTHROPLASTY-PRIMARY
          * TOTAL KNEE ARTHROPLASTY-REVISION
          * TOTAL KNEE ARTHROPLASTY-BILATERAL
          * TOTAL HIP ARTHROPLASTY-PRIMARY
          * TOTAL HIP ARTHROPLASTY-REVISION
          * SPINAL FUSION>2LEVELS
          * PELVIC FRACTURE
          * AORTIC ARCH ANEURYSM
          * PNEUMONICTOMY/LOBECTOMY
          * ESOPHAGOGASTRECTOMY
          * SPLENDECTOMY
          * SMALL INTESTINAL RESECTION
          * ANY OPEN ABDOMINAL PROCEDURE
          * CYSTECTOMY
          * NEPHROECTOMY
          * RADICAL RETROPUBIC PROSTATECTOMY
          * WHIPPLE PROCEDURE
          * HEPATIC/LIVER RESECTION
          * MYOMECTOMY (NON-EMBOLIZED)
          * VALVE REPLACEMENT-REVISION
          * VALVE REPLACEMENT WITH CORONARY ARTERY BYPASS-PRIMARY
          * VALVE REPLACEMENT WITH CORONARY ARTERY BYPASS-REVISION
          * Case Type -3.1
          * Case Type Name
          * Case 18
          * Abnormal Dieses
          * 1234
          * Casetype 1414
          * 123
          * new sub
          */
            //Add button
            //Delete Button
        //Surgeon (fillable required field)
        await this.page.getByLabel('Surgeon', {exact:true}).click();
         await this.page.getByLabel('Surgeon', {exact:true}).fill('Sur');
         await this.page.getByLabel('Surgeon',{exact:true}).press('Enter');
         //await expect (this.page.locator('id=mat-autocomplete-1')).toBeVisible();
         await this.page.getByRole('option', {name: surgeon, exact: false}).click();
         //PCP (fillabe not required field)
         //Location(fillable not required field)
         //Facility(pre populated)
    }

    async scheduleChronicVisit(patienttype: string, fname?, mname?, lname?, email?, mrn?,dobyear?,dobMonth?,dobDay?,phone?,street?, city?,
        state?,zip?, gender?,hippa?,hhMonthdd?, pMonth?, pDay?, pclickcount?,
        procedure?, surgeon?){
        //expect (this.page.locator('id=toast-container').getByText('Patients fetched successfully').isVisible);
        //await this.page.waitFor(3000);
        await this.page.getByRole('button', {name:' Schedule Visit'}).waitFor({state:'attached'})
        await this.page.getByRole('button', {name:' Schedule Visit'}).click({delay:1000});//clicks the Schedule Visit button
        //Opens the patient schedule screen
         //check box for new or existing patient
         //if statement for new or existing patient
            if(patienttype = 'NEW'){
         //*New */
         //select the new check box
         await this.page.locator('.mat-checkbox-inner-container').first().click();
         //first name
         await this.page.getByLabel('First Name *').click();
         await this.page.getByLabel('First Name *').fill(fname);
         //middle name
         await this.page.getByLabel('Middle Name').click();
         await this.page.getByLabel('Middle Name').fill(mname);
         //last name
         await this.page.getByLabel('Last Name *').click();
         await this.page.getByLabel('Last Name *').fill(lname);
         //email
         await this.page.getByLabel('Email').click();
         await this.page.getByLabel('Email').fill(email);
         //MRN
         await this.page.getByLabel('MRN *').click;
         await this.page.getByLabel('MRN *').fill(mrn);
         //dob
         await this.page.locator('#newPatientBlock').getByLabel('Open calendar').click();
         await this.page.getByLabel('Choose month and year').click();
         while(await this.page.getByRole('button', {name:dobyear, exact:true}).isHidden()){
            await this.page.getByLabel('Previous 24 years').click();
         }
            await this.page.getByLabel(dobyear).click();
            await this.page.getByLabel(dobMonth).click();
            await this.page.getByLabel(dobDay).click();
         //phone number
         await this.page.getByLabel('Phone No *').click();
         await this.page.getByLabel('Phone No *').fill(phone);
         //street
         await this.page.getByLabel('Street *').click();
         await this.page.getByLabel('Street *').fill(street);
         //apt/unit
         //city
         await this.page.getByLabel('City *').click();
         await this.page.getByLabel('City *').fill(city);
         //state
         await this.page.getByLabel('State *').click();
         await this.page.getByLabel('State *').fill(state);
         //zip
         await this.page.getByLabel('PostalCode').click();
         await this.page.getByLabel('PostalCode').fill(zip);
         //gender (drop down)
         await this.page.getByLabel('Gender').locator('div').nth(2).click();
         await this.page.getByText(gender, {exact:true}).click();
         //hippa checkbox
         if(hippa = 'yes'){
         await this.page.locator('#mat-checkbox-6 > .mat-checkbox-layout > .mat-checkbox-inner-container').click()
         }
         else{
            //no need to check the box
         }
         //health history date
         await this.page.locator('mat-form-field').filter({hasText: 'Health History Date'}).getByLabel('Open calendar').click();
         await this.page.getByLabel(hhMonthdd).click()
         //checkmark button to close the calendar
         await this.page.locator('button').filter({hasText: 'done'}).click();
         //prefix(optional)
         //await this.page.getByLabel('Prefix').click();
         //await this.page.getByLabel('Prefix').fill(prefix);
         //suffix(optional)
         //await this.page.getByLabel('Suffix').click();
         //await this.page.getByLabel('Suffix').fill(suffix);
         //credentials(optional)
         //await this.page.getByLabel('Credentials').click();
         //await this.page.getByLabel('Credentials').fill(credentials);
            }
            else{
         //*Existing */
         //select the existing check box
         await this.page.getByLabel('lPatient').locator('div').filter({hasText: 'Existing'}).nth(1).click();
         //search field for patient or mrn
         await this.page.getByLabel('Patient / MRN').click();
         await this.page.getByLabel('Patient / MRN').fill(mrn);
         //searching produces a drop down if patient is found that needs to be clicked
         await this.page.getByText(mrn).click();
            }
         //next button
         await this.page.getByRole('button',{name:'Next'}).click();
         //**Visit screen**
         //visit date (calendar and 24hr clock)
         await this.page.getByRole('button',{name:'Open calendar'}).click();
         while(await this.page.getByRole('gridcell',{name: pMonth, exact: true}).isHidden()){//if statement needs a locator statement
            await this.page.getByLabel('Next month').click();
         }
              await this.page.getByLabel(pDay).click();
              await this.page.getByLabel('expand_less icon').first().click({clickCount: pclickcount});
              /**Click Count Key for 24hr clock
               * 1 = 1am
               * 2 = 2am
               * 3 = 3am
               * 4 = 4am
               * 5 = 5am
               * 6 = 6am
               * 7 = 7am
               * 8 = 8am
               * 9 = 9am
               * 10 = 10am
               * 11 = 11am
               * 12 = 12pm
               * 13 = 1pm
               * 14 = 2pm
               * 15 = 3pm
               * 16 = 4pm
               * 17 = 5pm
               * 18 = 6pm
               * 19 = 7pm
               * 20 = 8pm
               * 21 = 9pm
               * 22 = 10pm
               * 23 = 11pm
               * 24 = 12am
              */
         
         //check mark button
         await this.page.locator('button').filter({hasText: 'done'}).click();
         //procedure drop down(has case types list)
         await this.page.getByLabel('Procedure *').locator('div').nth(2).click();
         await this.page.getByText(procedure,{exact:true}).click()
         /**Chronic Procedure key
          * WOMEN'S HEALTH- CHRONIC
          * CHRONIC MEDICAL
          * CONGESTIVE HEART FAILURE
          * CONGESTIVE HEART FAILURE-FOLLOW UP
          * CHRONIC KIDNEY DISEASE (CKD)
          * GYN-PREGNANT
          * GYN PREGNANT-FOLLOW UP
          * WOMEN'S HEALTH CHRONIC-OTHER
          * CHRONIC KIDNEY DISEASE (CKD)- FOLLOW UP
          * CHRONIC POST BARIATRICS
          * CHRONIC-OTHER
          * CHRONIC MEDICAL FOLLOW UP
          * 321
          */
            //Add button
            //Delete Button
        //Surgeon (fillable required field)
        await this.page.getByLabel('Surgeon', {exact:true}).click();
         await this.page.getByLabel('Surgeon', {exact:true}).fill('Sur');
         //await this.page.getByLabel('Surgeon', {exact:true}).press('enter');
         await expect (this.page.locator('id=mat-autocomplete-1')).toBeVisible();
         await this.page.getByRole('option', {name: surgeon, exact: false}).click();
         //PCP (fillabe not required field)
         //Location(fillable not required field)
         //Facility(pre populated)
    }
    

     //Back button (takes you to 1st screen)
    async backBtnSchVisitScreen (){
        await this.page.getByRole('button', {name: ' Back'}).click();
    }
         //Schedule Visit Button
    async saveScheduledVisit(){
        await this.page.getByRole('button',{name: 'Schedule Visit'}).click();
    }     
         //Back Arrow (takes you back to the worklist)


}