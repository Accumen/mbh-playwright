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
    public race;
    public ethnicity;
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
    public changeDesc;
    public edit;
    public editrace;
    public editethnicity;

    //click Worklist from Side navigation menu
    async clickWorklist(){
        await this.page.getByRole('button', {name: 'Worklist'}).click();//clicks the side menu worklist option
    }
    
    //surgical menu option
    async clickSurgical(){
        await this.page.getByRole('link', {name: 'Surgical', exact:true}).click({delay:1000});// clicks the Surgical submenu from the worklist
    }
    //chronic menu option
    async clickChronic(){ //change name to clickNonSurgical?
        await this.page.getByRole('link', {name:'Non-Surgical', exact: true}).click({delay:1000}); // clicks the Chronic submenu from the worklist
    }

    async clickFacility(facility){
        await this.page.getByLabel('QA Facility').locator('svg').nth(2).click();
        await this.page.getByRole('option',{name:facility,exact:true}).click();
    }
    async favoriteFacility(){
        await this.page.locator('app-page-header-content i').click();
    }
    /* The rest of the functions are the same no matter which menu is chosen (surgical or chronic) */
    //Search Name, MRN
    async searchMRN(searchInfo: string){
        await this.page.getByText('Search Name, MRN').fill(searchInfo);
        await this.page.getByText('Search Name, MRN').press('Enter');
        
    }
    async hoverSearch(search){
        await this.page.getByText(search).hover();
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
        //await this.page.getByText('Active').locator('div').nth(2).click();//selects the status you want the data filtered by
        await this.page.getByRole('option', { name: status}).locator('span').click();
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
    async sortByDateRange(startyear, startmonth, startday, endyear, endmonth, endday){
        await this.page.getByRole('button',{name:'Open calendar'}).click();
                await this.page.getByLabel('Choose month and year').click();
                   while(await this.page.getByRole('button', {name:startyear, exact:false}).first().isHidden()){
                        await this.page.getByLabel('Previous year').click();
                   }
                        await this.page.getByLabel(startyear,{exact:true}).click();
                        await this.page.getByLabel(startmonth).click();
                        await this.page.getByText(startday,{exact:true}).last().click();    
                        //end date    (calendar) 
                        await this.page.getByLabel('Choose month and year').click();
                        while(await this.page.getByRole('button', {name:startyear, exact:false}).first().isHidden()){
                             await this.page.getByLabel('Previous year').click();
                        }
                           await this.page.getByLabel(endyear,{exact:true}).click();
                           await this.page.getByLabel(endmonth).click();
                           await this.page.getByText(endday,{exact:true}).last().click();  
                        await this.page.locator('id=toast-container',{hasText:'Patients Fetched Successfully'}).isVisible();
                        await this.page.getByText('MRN').first().scrollIntoViewIfNeeded();
        }
                        
                            
                            
           
    // select patient visit from worklist
    async selectPatientfromSearch(patient){
        await this.page.getByText(patient,{exact:true}).first().focus();
        await this.page.getByText(patient,{exact:true}).first().click();
    }
    async backarrow(){
        await this.page.locator('app-page-header i').first().click();
    }

      //clear button
    async clearSelections(){
        await this.page.getByRole('button',{name:'CLEAR'}).last().click();//clicks the clear button to remove the data previously entered in the fields
    }  
    // adjust number of rows visible on screen
    async adjustRowCount(row: string){
        await this.page.getByLabel('5').locator('div').nth(2).click();//clicks the drop down for the row count
        /**Row Key
         * 15 (default)
         * 30
         * 50
         */
        await this.page.getByText(row,{exact:true}).click();//selects the row count in the []
        
    }
    //export visits
    async exportVisits(){
        const downloadPromise = this.page.waitForEvent('download');
        await this.page.getByRole('button', {name: 'Export Visits'}).click();
        const download = await downloadPromise;
        await download.saveAs('./testdata/'+ download.suggestedFilename());
    }
    //Clear Expired Visits
    async clearExpiredVisits(){
        this.page.on('dialog',dialog => dialog.accept());
        await this.page.getByRole('button',{name:'Clear Expired Visits'}).nth(2).click();
    }
    //Click Patient Details dropdown
    async selectPatientDetails(){
        await this.page.getByRole('button', { name: 'PATIENT DETAILS' }).click();
    }
    //Click Chain of Custody dropdown
    async selectChainofCustody(){
        await this.page.getByRole('button', { name: 'CHAIN OF CUSTODY' }).click();
    }
    //Schedule Visit
    async scheduleSurgicalVisit(patienttype: string, fname?,lname?,mrn?,dobyear?,dobMonth?,dobDay?,phone?,street?, city?,
        state?,zip?, gender?,race?,ethnicity?,hippa?,hhMonthdd?,edit?,editrace?,editethnicity?,changeDesc?,pYear?, pMonth?, pDay?, pclickcount?,
        procedure?, surgeon?){
        await this.page.getByRole('button', {name:' Schedule Visit'}).waitFor({state:'attached'})
        await this.page.getByRole('button', {name:' Schedule Visit'}).click({delay:1000});//clicks the Schedule Visit button
        //Opens the patient schedule screen
         //check box for new or existing patient
         //if statement for new or existing patient
            if(patienttype != 'Existing'){
          //*New */
         //select the new check box
         await this.page.locator('id=mat-mdc-checkbox-4-input').click();
         //first name
         await this.page.getByLabel('First Name').click();
         await this.page.getByLabel('First Name').fill(fname);
         //last name
         await this.page.getByLabel('Last Name').click();
         await this.page.getByLabel('Last Name').fill(lname);
         //MRN
         await this.page.getByPlaceholder('MRN',{exact:true}).click;
         await this.page.getByPlaceholder('MRN',{exact:true}).fill(mrn);
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
         await this.page.getByText('Phone No').click();
         await this.page.getByText('Phone No').fill(phone);
         //street
         await this.page.getByText('Street').click();
         await this.page.getByText('Street').fill(street);
         //apt/unit
         //city
         await this.page.getByText('City', { exact: true }).click();
         await this.page.getByText('City', { exact: true }).fill(city);
         //state
         await this.page.getByText('State').click();
         await this.page.getByText('State').fill(state);
         //zip
         await this.page.getByText('PostalCode').click();
         await this.page.getByText('PostalCode').fill(zip);
         //gender (drop down)
         await this.page.getByLabel('Gender').locator('div').nth(2).click();
         await this.page.getByText(gender, {exact:true}).click();
         //race (drop down)
         await this.page.getByLabel('Race').locator('div').nth(2).click();
         await this.page.getByRole('option', { name: race, exact:true }).locator('span').click();
         /** Race Key
          * American Indian or Alaska Native
          * Asian
          * Black or African American
          * Native Hawaiian or Other Pacific Islander
          * Other Race
          * White
          */
         //ethnicity (drop down)
         await this.page.getByLabel('Ethnicity').locator('div').nth(2).click();
         await this.page.getByRole('option', { name: ethnicity, exact:true }).locator('span').click();
         /** Ethnicity Key
          * Unknown
          * Hispanic
          * Not Hispanic
          */
         //hippa checkbox
         if(hippa == 'yes'){
            await this.page.locator('#mat-checkbox-7 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
         }
         else{
            //no need to check the box
         }
         //health history date
         await this.page.locator('mat-form-field').filter({hasText: 'Health History Date'}).getByLabel('Open calendar').click();
         await this.page.getByText(hhMonthdd,{exact:true}).click()
         //checkmark button to close the calendar
         await this.page.locator('button').filter({hasText: 'done'}).click();
            }
            else{
         //*Existing */
         //select the existing check box
         await this.page.getByLabel('Existing').click();
         //search field for patient or mrn
         await this.page.getByLabel('Patient / MRN').click();
         await this.page.getByRole('combobox', { name: 'Patient / MRN' }).fill(mrn);
         await this.page.getByRole('combobox', { name: 'Patient / MRN' }).press('Enter');
         //searching produces a drop down if patient is found that needs to be clicked
         await this.page.getByText(mrn).click();
         if (edit == 'yes'){
            await this.editPatientDetails(changeDesc);
            await this.editPatientRace(editrace);
            await this.editPatientEthnicity(editethnicity);
            await this.page.getByRole('button', { name: 'Save Patient' }).click();
         }
            }
         //next button
         await this.page.getByRole('button',{name:'Next'}).click();
         //**Visit screen**
         //visit date (calendar and 24hr clock)
         await this.page.getByRole('button',{name:'Open calendar'}).click();
         await this.page.getByLabel('Choose month and year').click();
         await this.page.getByLabel(pYear).click();
         await this.page.getByLabel(pMonth, {exact: false}).click();
         await this.page.getByText(pDay).click();
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
         await this.page.getByLabel('Procedure').locator('div').nth(2).click();
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
         await this.page.getByPlaceholder('Surgeon', {exact:true}).fill(surgeon);
         await this.page.getByPlaceholder('Surgeon',{exact:true}).press('Enter');
         //await expect (this.page.locator('id=mat-autocomplete-1')).toBeVisible();
         await this.page.getByRole('option', {name: surgeon, exact: false}).click();
    }

    async scheduleChronicVisit(patienttype: string, fname?, lname?, mrn?,dobyear?,dobMonth?,dobDay?,phone?,street?, city?,
        state?,zip?, gender?,race?,ethnicity?,hippa?,hhMonthdd?,edit?,editrace?,editethnicity?,changeDesc?,pYear?, pMonth?, pDay?, pclickcount?,
        procedure?, surgeon?){
        await this.page.getByRole('button', {name:' Schedule Visit'}).waitFor({state:'attached'})
        await this.page.getByRole('button', {name:' Schedule Visit'}).click({delay:1000});//clicks the Schedule Visit button
        //Opens the patient schedule screen
         //check box for new or existing patient
         //if statement for new or existing patient
            if(patienttype != 'Existing'){
         //*New */
         //select the new check box
         await this.page.locator('id=mat-mdc-checkbox-4-input').click();
         //first name
         await this.page.getByLabel('First Name').click();
         await this.page.getByLabel('First Name').fill(fname);
         //last name
         await this.page.getByLabel('Last Name').click();
         await this.page.getByLabel('Last Name').fill(lname);
         //MRN
         await this.page.getByPlaceholder('MRN',{exact:true}).click;
         await this.page.getByPlaceholder('MRN',{exact:true}).fill(mrn);
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
         await this.page.getByText('Phone No').click();
         await this.page.getByText('Phone No').fill(phone);
         //street
         await this.page.getByText('Street').click();
         await this.page.getByText('Street').fill(street);
         //apt/unit
         //city
         await this.page.getByText('City', { exact: true }).click();
         await this.page.getByText('City', { exact: true }).fill(city);
         //state
         await this.page.getByText('State').click();
         await this.page.getByText('State').fill(state);
         //zip
         await this.page.getByText('PostalCode').click();
         await this.page.getByText('PostalCode').fill(zip);
         //gender (drop down)
         await this.page.getByLabel('Gender').locator('div').nth(2).click();
         await this.page.getByText(gender, {exact:true}).click();
         //race (drop down)
         await this.page.getByLabel('Race').locator('div').nth(2).click();
         await this.page.getByRole('option', { name: race, exact:true }).locator('span').click();
         /** Race Key
          * American Indian or Alaska Native
          * Asian
          * Black or African American
          * Native Hawaiian or Other Pacific Islander
          * Other Race
          * White
          */
         //ethnicity (drop down)
         await this.page.getByLabel('Ethnicity').locator('div').nth(2).click();
         await this.page.getByRole('option', { name: ethnicity, exact:true }).locator('span').click();
         /** Ethnicity Key
          * Unknown
          * Hispanic
          * Not Hispanic
          */
         //hippa checkbox
         if(hippa == 'yes'){
            await this.page.locator('#mat-checkbox-7 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
         }
         else{
            //no need to check the box
         }
         //health history date
         await this.page.locator('mat-form-field').filter({hasText: 'Health History Date'}).getByLabel('Open calendar').click();
         await this.page.getByText(hhMonthdd,{exact:true}).click()
         //checkmark button to close the calendar
         await this.page.locator('button').filter({hasText: 'done'}).click();
            }
            else{
         //*Existing */
         //select the existing check box
         await this.page.getByLabel('Existing').click();
         //search field for patient or mrn
         await this.page.getByLabel('Patient / MRN').click();
         await this.page.getByRole('combobox', { name: 'Patient / MRN' }).fill(mrn);
         await this.page.getByRole('combobox', { name: 'Patient / MRN' }).press('Enter');
         //searching produces a drop down if patient is found that needs to be clicked
         await this.page.getByText(mrn).click();
         if (edit == 'yes'){
            await this.editPatientDetails(changeDesc);
            await this.editPatientRace(editrace);
            await this.editPatientEthnicity(editethnicity);
            await this.page.getByRole('button', { name: 'Save Patient' }).click();
         }
            }
         //next button
         await this.page.getByRole('button',{name:'Next'}).click();
         //**Visit screen**
         //visit date (calendar and 24hr clock)
         await this.page.getByRole('button',{name:'Open calendar'}).click();
         await this.page.getByLabel('Choose month and year').click();
         await this.page.getByLabel(pYear).click();
         await this.page.getByLabel(pMonth, {exact: false}).click();
         await this.page.getByText(pDay).click();
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
         await this.page.getByLabel('Procedure').locator('div').nth(2).click();
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
        await this.page.getByText('Referring Provider', {exact:true}).click();
         await this.page.getByText('Referring Provider', {exact:true}).fill(surgeon);
         await this.page.getByText('Referring Provider', {exact:true}).press('Enter');
         //await this.page.getByLabel('Surgeon', {exact:true}).press('enter');
         //await expect (this.page.locator('id=mat-autocomplete-1')).toBeVisible();
         await this.page.getByRole('option', {name: surgeon, exact: false}).click();
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
    
    async worklistscreenshot(num){
        await this.page.screenshot({path:'worklistscreenshot'+ num +'.png',fullPage:true});
    }

    //complete surgical visit
    async completeSurgicalVisit(completeType,treatment?,untreatedtype?,followup?,specialty?,fyear?,fmonth?,fday?){
        await this.page.getByRole('button', {name: 'Complete Case'}).click();
        await this.page.locator('#mat-select-value-23').click();
        await this.page.getByRole('option',{name:completeType,exact:true}).click();
        /**completeType
         * Treated
         * Not Treated
         */
        if(completeType == 'Not Treated'){
            await this.page.getByText(untreatedtype,{exact:true}).click();
            /**untreatedtype
             * Cancelled/Postponed surgery
             * Does not meet criteria for treatment
             * Insurance delayed treatment
             * Insurance denied treatment
             * No contact from patient
             * Patient declines treatment
             * Patient has not received pre-admission testing
             * Physician declines treatment of anemic patient
             * Scheduling delayed for infusion
             * Timing too close to surgery date
             */
        
        }
        else{
            await this.page.getByRole('option',{name:treatment,exact:true}).click();
            /**treatment
             * B12
             * EPO
             * IV Iron
             * Oral Iron
             */ 
        }
        if(followup == 'no'){
            await this.page.getByRole('button',{name:'Confirm'}).click();
        }
        else{
            await this.page.getByText('Yes', { exact: true }).click();
            await this.page.getByRole('button',{name:'Continue'}).click();    
            
            await this.page.getByText(specialty,{exact:true}).click();
            /**specialty
            * 321
            * CHRONIC MEDICAL
            * WOMEN'S HEALTH- CHRONIC
            */
            await this.page.getByRole('button',{name:'Open calendar'}).click();
            await this.page.getByLabel('Choose month and year').click();
            await this.page.getByRole('button',{name:fyear, exact:true}).click();
            await this.page.getByRole('button',{name: fmonth, exact: false}).click();
            await this.page.getByLabel(fday).click();
            await this.page.getByRole('button',{name:'Confirm'}).click();
        }

        //await this.page.getByRole('button',{name:'Activate'}).click();
    }
    //complete non-surgical visit
    async completeNonSurgicalVisit(completeType,treatment?,untreatedtype?,followup?,freason?,freasonfill?,specialty?,fyear?,fmonth?,fday?){
        await this.page.getByRole('button', {name: 'Complete Case'}).click();
        await this.page.locator('#mat-select-value-23').click();
        await this.page.getByRole('option',{name:completeType,exact:true}).click();
        /**completeType
         * Treated
         * Not Treated
         */
        if(completeType == 'Not Treated'){
            await this.page.getByText(untreatedtype,{exact:true}).click();
            /**untreatedtype
             * Insurance denied treatment
             * No contact from patient
             * Patient declines treatment
             * Patient treatment plan complete
             */
        
        }
        else{
            await this.page.getByRole('option',{name:treatment,exact:true}).click();
            /**treatment
             * B12
             * EPO
             * IV Iron
             * Oral Iron
             */ 
        }
        if(followup == 'no'){
            if(completeType == 'Not Treated'){
                await this.page.getByRole('button',{name:'Confirm'}).click();
            }
            else{
                await this.page.getByText('No Follow up Appt Required').click();
                await this.page.getByLabel('Please select No Follow Up').locator('svg').click();
                await this.page.getByRole('option',{name:freason, exact:true}).click();
                await this.page.getByPlaceholder('No Follow Up Reason', { exact: true }).click();
                await this.page.getByPlaceholder('No Follow Up Reason', { exact: true }).fill(freasonfill);
                await this.page.getByRole('button',{name:'Confirm'}).click();
                /**freason Key
                 * No contact from patient
                 * Patient treatment plan complete
                 * Patient declines treatment
                 * Insurance denied treatment
                 */
            }
        }
        else{
            if(completeType == 'Not Treated'){
                await this.page.getByLabel('Select an option').getByText('Yes').click();
                await this.page.getByRole('button',{name:'Continue'}).click();

                await this.page.getByText(specialty,{exact:true}).click();
                /**specialty
                * 321
                * CHRONIC MEDICAL
                * WOMEN'S HEALTH- CHRONIC
                */
            }
            await this.page.getByRole('button',{name:'Open calendar'}).click();
            await this.page.getByLabel('Choose month and year').click();
            await this.page.getByRole('button',{name:fyear, exact:true}).click();
            await this.page.getByRole('button',{name: fmonth, exact: false}).click();
            await this.page.getByLabel(fday).click();
            await this.page.getByRole('button',{name:'Confirm'}).click();
        }

        //await this.page.getByRole('button',{name:'Activate'}).click();
    }
    //click Complete Case
    async clickCompleteCase(){
        await this.page.getByRole('button', {name: 'Complete Case'}).click();
    }
    //edit treatment
    async editTreatment(treatment){
        await this.page.getByRole('option',{name:treatment,exact:true}).click();
        /**treatment
         * B12
         * EPO
         * IV Iron
         * Oral Iron
         */
    }

    //change Complete Case Type
    async changeCompleteCaseType(completeType){
        await this.page.locator('#mat-select-value-23').click();
        await this.page.getByRole('option',{name:completeType,exact:true}).click();
    }
    //select yes follow up for Not Treated
    async notTreatedFollowUp(){
        await this.page.getByLabel('Select an option').getByText('Yes').click();
    }
    //chronic follow up screenshot
    async followUpScnsht(){
        await this.page.getByTitle('Follow Up',{exact:true}).first().screenshot({path:'followupicon.png'});
    }

    //assign user
    async assignUser(){
        await this.page.getByRole('button', { name: 'Assign' }).click();
    }
    async selectAssignUser(user){
        await this.page.locator('#mat-select-value-23').click();
        await this.page.getByText(user, {exact:true}).click();
    }
    async unassignUser(){
        await this.page.getByRole('button', { name: 'UnAssign' }).click();
    }
    async saveUser(){
        await this.page.getByRole('button', { name: 'Save' }).click();
    }
    async assignedToCheck(){
        await this.page.getByText('Assigned To').hover();
    }

    //edit patient button
    async editPatientDetails(changeDesc){
        await this.page.getByRole('button',{name:'Edit Patient'}).click();
         //change description note box
        await this.page.getByText('Change Description',{exact:true}).click();
        await this.page.getByText('Change Description',{exact:true}).fill(changeDesc);
    }
    //edit patient information
    async editPatientRace(race){
        //race
        await this.page.getByLabel('Race').locator('div').nth(2).click();
        //await this.page.getByText(race, {exact:true}).click();
        await this.page.getByRole('option', { name: race, exact:true }).locator('span').click();
    }
    async editPatientEthnicity(ethnicity){
        //ethinicity
        await this.page.getByLabel('Ethnicity').locator('div').nth(2).click();
        //await this.page.getByText(ethnicity, {exact:true}).click();
        await this.page.getByRole('option', { name: ethnicity, exact:true }).locator('span').click();
    }
    //height
    async editPatientHeight(height){
        await this.page.locator('id=mat-input-8').click();
        await this.page.locator('id=mat-input-8').fill(height);
    }

    //weight
    async editPatientWeight(weight){
        await this.page.locator('id=mat-input-9').click();
        await this.page.locator('id=mat-input-9').fill(weight);
    }

    //Invasive Treatment Toggle
    async invasiveToggle(){
        await this.page.locator('id=mat-slide-toggle-1').click()
        await this.page.getByTitle('Invasive').screenshot({path:'invasive.png'});
    }

    //Bloodless Case Toggle
    async bloodlessToggle(){
        await this.page.locator('id=mat-slide-toggle-2').click();
        await this.page.getByTitle('Bloodless').screenshot({path:'bloodless.png'});
    }

    async saveEditPatient(){      
    //save button
    await this.page.getByRole('button',{name:'Save'}).click();
    }
    //add visit documents

    async visitDocumentsAdd(){
        await this.page.locator('app-document-list').getByRole('button', { name: 'Add' }).click();
    }

    //search visit documents
    async searchdoc(doc){
        await this.page.getByLabel('Search').click();
        await this.page.getByLabel('Search').fill(doc);
        //await this.page.getByLabel('Search').press('Enter')
    }

    //select document type
    async selectDocumentType(documenttype){
        await this.page.getByRole('option', { name: documenttype }).locator('div').first().click();
        /**Document Type Key
         * Patient Letter
         * PCP Letter
         * Surgeon Letter
         * Assessment Template
         * RCP Letter
         * Medication Order
         * Tools and References
         */
    }

    async addVisitDocuments(){
        await this.page.getByRole('row', { name: 'Add' }).getByRole('button').first().click();
    }
    
    async closeVisitDocuments(){
        await this.page.getByRole('button', { name: 'close' }).click();
    }

    async visitDocumentsEdit(){ //WIP
        await this.page.getByTitle('Edit').click();
    }

    async documentEditSaveAll(){ //WIP
        await this.page.getByRole('button', {name: 'Save All'}).click();
    }

    async visitDocumentsPreview(){
        await this.page.getByTitle('Document preview').first().click();
    }

    async visitDocumentsDelete(){ //WIP
        await this.page.getByTitle('Delete').first().click();
    }

    //add communication
    async addcommunication(comtype,comment,priority,resultyear, resultmonth,resultday){ 
        await this.page.locator('app-communication-list').getByRole('button', { name: ' Add' }).click();
        await this.page.getByLabel('Communication Type *').locator('span').click();
        await this.page.getByRole('option', {name:comtype, exact: true}).locator('span').click();
        await this.page.getByLabel('Message *').click();
        await this.page.getByLabel('Message *').fill(comment);
        await this.page.getByLabel('Priority *').locator('div').nth(2).click();
        await this.page.getByRole ('option', {name:priority}).locator('span').click();
        await this.page.getByLabel('Open calendar').click();
        await this.page.getByLabel('Choose month and year').click();
        await this.page.getByLabel(resultyear).click();
        await this.page.getByLabel(resultmonth).click();
        await this.page.getByLabel(resultday).click();
        await this.page.locator('button').filter({ hasText: 'done' }).click();
        await this.page.getByRole('button', { name: 'Add Communication' }).click();
    }

    //edit communication
    async editcommunication(comtype,comment,priority,resultyear, resultmonth,resultday){ 
        await this.page.getByRole('button', { name: ' Edit' }).click();
        await this.page.locator('#mat-select-value-23').click();
        await this.page.getByRole('option', { name:comtype }).locator('span').click();
        await this.page.getByLabel('Message *').click();
        await this.page.getByLabel('Message *').fill(comment);
        await this.page.locator('#mat-select-value-25').click();
        await this.page.getByRole ('option', {name:priority}).locator('span').click();
        await this.page.getByLabel('Open calendar').click();
        await this.page.getByLabel('Choose month and year').click();
        await this.page.getByLabel(resultyear).click();
        await this.page.getByLabel(resultmonth).click();
        await this.page.getByLabel(resultday).click();
        await this.page.locator('button').filter({ hasText: 'done' }).click();
        await this.page.getByRole('button', { name: 'Edit Communication' }).click();
    }

    //delete communication
    async deleteCommunication(){
        this.page.once('dialog',dialog => dialog.accept());
        await this.page.getByLabel('communication-delete').click();
    }

    async worklistPagination(num){
        await this.page.getByText('›',{exact:true}).scrollIntoViewIfNeeded();
        await this.page.getByRole('link', { name: num }).click({delay:1000});
    }

    //page navigation
    async paginationCheck(){
        await this.page.getByText('›',{exact:true}).scrollIntoViewIfNeeded();
    }

    //latest labs screenshot
    async latestlabs(){
        await this.page.getByText('LAB INTERPRETATION',{exact:true}).scrollIntoViewIfNeeded();
    }

    //add labs
    async addlab(labtype,labvalue,resultyear,resultmonth,resultday){
        await this.page.locator('app-latest-lab').getByRole('button', { name: ' Add' }).click();
        await this.page.getByLabel('Choose Lab Type *').locator('span').click();
        await this.page.getByRole('option', {name:labtype, exact: true}).locator('span').click();
        await this.page.getByLabel('Result Value *').click();
        await this.page.getByLabel('Result Value *').fill(labvalue);
        await this.page.getByLabel('Open calendar').click();
        await this.page.getByLabel('Choose month and year').click();
        await this.page.getByLabel(resultyear).click();
        await this.page.getByLabel(resultmonth).click();
        await this.page.getByLabel(resultday).click();
        await this.page.locator('button').filter({ hasText: 'done' }).click();
        await this.page.getByRole('button', { name: ' Add Lab' }).click();
    }
}