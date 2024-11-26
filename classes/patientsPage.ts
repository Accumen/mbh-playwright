import { Page} from "@playwright/test";
import {expect} from "@playwright/test";
import WorklistPage from "./worklistPage";

export default class PatientsPage{

    constructor(public page: Page){  }
        
    

    //variable
    public patient;
    public fname;
    public lname;
    public labtype;
    public dobyear;
    public dobmonth;
    public dobday;
    public mrn;
    public hhYear;
    public hhMonth;
    public hhDay;
    public gender;
    public race;
    public ethnicity;
    public labvalue;
    public resultyear;
    public resultmonth;
    public resultday;
    public startyear;
    public startmonth;
    public startday;
    public pYear;
    public pMonth;
    public pDay;
    public pclickcount;
    public procedure;
    public surgeon;
    public pFacility;
    public changeDesc;
    public street;
    public city;
    public state;
    public zipcode;
    public phone;

    // select patient from the navigation menu
    async selectPatients(){
        await this.page.getByRole('link', {name:'Patients'}).click({delay:100});
    }
  
 
    //search patient name (fillable)
    async searchPatient(patient){
        await this.page.locator('mat-label').getByText('Search Patient name , mrn').click({delay:1000});
        await this.page.getByPlaceholder('Search Patient name , mrn').fill(patient);
        await this.page.getByPlaceholder('Search Patient name , mrn').press('Enter');
    }
    //clear button
    async clearSelections(){
        await this.page.getByRole('button',{name:'CLEAR'}).click();
    }
    //select patient from search list
    async selectPatientfromSearch(patient){
        await this.page.getByRole('link',{name:patient}).first().click();
    }
    //verify last visit date and location on patient search screen
    async verifyVisitInfo(patient,location,dateTime){
        await this.page.getByText(patient).waitFor({state:'visible'});
        await this.page.getByText(location).waitFor({state:'visible'});
        await this.page.getByText(dateTime).waitFor({state:'visible'});
    }
    //view all labs button
    async viewAllLabs(labtype?,startyear?,startmonth?, startday?,endyear?,endmonth?, endday?){
        await this.page.getByTestId('viewAll').click();
        //lab type fillable
        await this.page.getByLabel('Lab Type').click();
        await this.page.getByLabel('Lab Type').fill(labtype);
        
        if(startyear != 'NULL'){
        //date range click
            //start date (calendar)
            await this.page.getByRole('button',{name:'Open calendar'}).click();
            await this.page.getByLabel('Choose month and year').click();
            while(await this.page.getByRole('button', {name:startyear, exact:false}).isHidden()){
               await this.page.getByLabel('Previous 24 years').click();
            }
               await this.page.getByRole('button',{name:startyear,exact:true}).click();
               await this.page.getByLabel(startmonth).click();
               await this.page.getByText(startday,{exact:true}).click();    
            //end date    (calendar) 
            await this.page.getByLabel('Choose month and year').click();
            while(await this.page.getByRole('button', {name:endyear, exact:false}).isHidden()){
               await this.page.getByLabel('Previous 24 years').click();
            }
               await this.page.getByLabel(endyear,{exact:true}).click();
               await this.page.getByLabel(endmonth).click();
               await this.page.getByText(endday,{exact:true}).click();}
               
        }        
	  //select from lab search results list
      async editSearchedLab(result?,resultyear?,resultmonth?,resultday?){
        //edit pencil
        await this.page.getByRole('link',{name:'Edit Lab'}).first().click();//edit button with aria-label
            //result value
            await this.page.getByPlaceholder('Result Value').click();
            await this.page.getByPlaceholder('Result Value').fill(result);
            if(resultyear != 'NULL'){
            //result date (calendar)
            await this.page.locator('#mat-mdc-dialog-2').getByLabel('Open calendar').click();
            //
            await this.page.getByLabel('Choose month and year').click();
            while(await this.page.getByRole('button', {name:resultyear, exact:false}).isHidden()){
                await this.page.getByLabel('Previous 24 years').click();
             }
                await this.page.getByLabel(resultyear).click();
                await this.page.getByLabel(resultmonth).click();
                await this.page.getByText(resultday,{exact:true}).click(); 
                await this.page.getByRole('button').filter({hasText:'done'}).click(); 
            }
    }    
            //delete prepopulated result date for edit result value
            async deleteResultDate(){
                await this.page.getByPlaceholder('Result Date').click();
                await this.page.getByPlaceholder('Result Date').selectText();
                await this.page.getByPlaceholder('Result Date').press('Delete');
            }

            //Save  
            async saveEditedLab(){
                await this.page.getByRole('button', {name:'Save'}).click();
            }     
            //delete trash can    
            async deleteSearchedLab(){
                this.page.on('dialog',dialog => dialog.accept());
                await this.page.getByRole('link',{name:'Delete Lab'}).first().click();
                
            }
        //red x close window button
        async closeSearchListWindow(){
            await this.page.getByRole('button', {name:'Close View All Labs'}).click(); 
        }
    //lastest labs section
    async latestLabs(){
        await this.page.getByText('LATEST LABS').scrollIntoViewIfNeeded();
    }

    //confirm Ferritin badge
    async ferritinWorklistBadge(result){
        await this.page.locator('app-basic-visit-info-page').getByText(result).screenshot({path:'worklistBadge.png'});
        if(result != '300'){
            await expect (this.page.locator('app-basic-visit-info-page').getByText(result)).toHaveCSS('color','rgb(255, 0, 0)');
        }
        else{
            await expect (this.page.locator('app-basic-visit-info-page').getByText(result)).toHaveCSS('color','rgb(51, 51, 51)')
        }
    }

    //confirm Hgb badge
    async hgbWorklistBadge(){
        await this.page.getByText('Latest Hgb').screenshot({path:'hgbWorklistBadge.png'});
    }
    
    //add labs
    async addLabs(labtype,labvalue,resultyear,resultmonth,resultday){
        await this.page.getByRole('button',{name: 'Add'}).click();
        await this.page.getByLabel('Choose Lab Type').click();
        await this.page.getByRole('option', {name:labtype, exact: true}).locator('span').click();
        await this.page.getByPlaceholder('Result Value').click();
        await this.page.getByPlaceholder('Result Value').fill(labvalue);
        //await this.page.locator('id=mat-input-3').getByLabel('Open calendar').click();
        await this.page.getByRole('button',{name:'Open calendar'}).click();
        await this.page.getByLabel('Choose month and year').click();
        while(await this.page.getByRole('button', {name:resultyear, exact:true}).isHidden()){
           await this.page.getByLabel('Previous 24 years').click();
        }
           await this.page.getByLabel(resultyear).click();
           await this.page.getByLabel(resultmonth).click();
           await this.page.getByText(resultday,{exact:true}).click();
           await this.page.locator('button').filter({hasText: 'done'}).click();
           await this.page.getByRole('button',{name:'Add Lab'}).click();
           
    }

    //add patient
    async addPatient(fname,lname,mrn,hhYear,hhMonth,hhDay,gender,race,ethnicity,dobyear,dobmonth,dobday,hippa,phone,street,city,state,zipcode,height, weight){
        //add patient button
        await this.page.getByRole('button',{name:'Add Patients'}).click();
         //Required fields only
         //first name 
        await this.page.getByPlaceholder('First Name').click();
        await this.page.getByPlaceholder('First Name').fill(fname);
         //last name 
         await this.page.getByPlaceholder('Last Name').click();
         await this.page.getByPlaceholder('Last Name').fill(lname); 
         //mrn
         await this.page.getByPlaceholder('MRN',{exact:true}).click();
         await this.page.getByPlaceholder('MRN',{exact:true}).fill(mrn);
        //health history (calendar)
        await this.page.locator('mat-form-field').filter({ hasText: 'Health History Date' }).getByLabel('Open calendar').click();
        await this.page.getByLabel('Choose month and year').click();
        while(await this.page.getByRole('button', {name:hhYear, exact:true}).isHidden()){
           await this.page.getByLabel('Previous 24 years').click();
        }
           await this.page.getByLabel(hhYear).click();
           await this.page.getByLabel(hhMonth).click();
           await this.page.getByLabel(hhDay).click();
        //checkmark button to close the calendar
        await this.page.locator('button').filter({hasText: 'done'}).click();
            
        //gender drop down
        await this.page.getByLabel('Gender').locator('div').nth(2).click();
        await this.page.getByRole('option',{name:gender,exact:true}).click();
            /**gender key
             * Male
             * Female
             */
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
        //date of birth (calendar)
        await this.page.locator('mat-form-field').filter({hasText: 'Date of birth'}).getByLabel('Open calendar').click();
        await this.page.getByLabel('Choose month and year').click();
        while(await this.page.getByRole('button', {name:dobyear, exact:true}).isHidden()){
           await this.page.getByLabel('Previous 24 years').click();
        }
           await this.page.getByLabel(dobyear).click();
           await this.page.getByLabel(dobmonth).click();
           await this.page.getByLabel(dobday).click();
        //hipaa received (checkbox)
        if(hippa != 'yes'){
            if(await this.page.getByLabel('Hipaa Received').isChecked()){
            await this.page.getByLabel('Hipaa Received').uncheck();}
            else{ //do nothing
                }
            
            }
            else{
                if(await this.page.getByLabel('Hipaa Received').isChecked()){
                    //do nothing
                }
                else{
                await this.page.getByLabel('Hipaa Received').click();}
            }
        //phone number
        await this.page.getByPlaceholder('Primary Phone').click();
        await this.page.getByPlaceholder('Primary Phone').fill(phone);
        //street
        await this.page.getByPlaceholder('Address').click();
        await this.page.getByPlaceholder('Address').fill(street);
        //apt/unit
        //city
        await this.page.getByPlaceholder('City', { exact: true }).click();
        await this.page.getByPlaceholder('City', { exact: true }).fill(city);
        //state
        await this.page.locator('id=mat-mdc-form-field-label-52').click();
        await this.page.locator('id=mat-mdc-form-field-label-52').fill(state);
        //zip
        await this.page.locator('id=mat-mdc-form-field-label-54').click();
        await this.page.locator('id=mat-mdc-form-field-label-54').fill(zipcode);
        //height
        await this.page.locator('id=mat-mdc-form-field-label-36').click();
        await this.page.locator('id=mat-mdc-form-field-label-36').fill(height);
        //weight
        await this.page.locator('id=mat-mdc-form-field-label-38').click();
        await this.page.locator('id=mat-mdc-form-field-label-38').fill(weight);

    }
        //save patient button
        async savePatient(){
            await this.page.getByRole('button', {name: 'Save'}).click();
        }

          //schedule surgical visit
          async patientschedulesurgical(pYear,pMonth,pDay,pclickcount,procedure,surgeon,pFacility){
            await this.page.getByTestId('scheduleSurgicalVisit').click();
                 //**Visit screen**
         //visit date (calendar and 24hr clock)
         await this.page.getByRole('button',{name:'Open calendar'}).click();
         await this.page.getByLabel('Choose month and year').click();
         await this.page.getByRole('button',{name:pYear, exact:true}).click();
         await this.page.getByRole('button',{name: pMonth, exact: false}).click();
         await this.page.getByText(pDay,{exact:true}).click();
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
         await this.page.getByPlaceholder('Procedure').locator('div').nth(2).click();
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
         await this.page.getByPlaceholder('Facility',{exact:true}).click();
         await this.page.getByPlaceholder('Facility',{exact:true}).fill(pFacility);
         await this.page.getByPlaceholder('Facility',{exact:true}).press('Enter');
         await this.page.getByRole('option',{name:pFacility,exact:true}).click();
         await this.page.getByRole('button',{name:'Schedule Visit'}).click();
         await this.page.locator('id=toast-container',{hasText:'visit scheduled successfully'}).isVisible();

        }
        //schedule chronic visit
        async patientsschedulechronic(pYear,pMonth,pDay,pclickcount,procedure,surgeon,pFacility){
            await this.page.getByTestId('scheduleNonSurgicalVisit').click();
            //await this.page.getByRole('button',{name:'Schedule Non-Surgical Visit'}).click();
             //**Visit screen**
         //visit date (calendar and 24hr clock)
         await this.page.getByRole('button',{name:'Open calendar'}).click();
         await this.page.getByLabel('Choose month and year').click();
         await this.page.getByRole('button',{name:pYear, exact:true}).click();
         await this.page.getByRole('button',{name: pMonth, exact: false}).click();
         await this.page.getByText(pDay,{exact:true}).click();
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
         await this.page.getByPlaceholder('Procedure').locator('div').nth(2).click();
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
         await this.page.getByPlaceholder('Referring Provider', {exact:true}).fill(surgeon);
         await this.page.getByPlaceholder('Referring Provider', {exact:true}).press('Enter');
         await this.page.getByRole('option', {name: surgeon, exact: false}).click();
         //Facility
         await this.page.getByText('Treatment Facility',{exact:true}).click();
         await this.page.getByPlaceholder('Treatment Facility',{exact:true}).fill(pFacility);
         await this.page.getByPlaceholder('Treatment Facility',{exact:true}).press('Enter');
         await this.page.getByRole('option',{name:pFacility,exact:true}).click();
         await this.page.getByRole('button',{name:'Schedule Visit'}).click();
         await this.page.locator('id=toast-container',{hasText:'visit scheduled successfully'}).isVisible();
        }  
        //edit patient button
    async editPatientDetails(changeDesc){
        await this.page.getByTestId('editPatient').click();
        //await this.page.getByRole('button',{name:'Edit Patient'}).click();
         //change description note box
        await this.page.getByLabel('Change Description').click();
        await this.page.getByLabel('Change Description').fill(changeDesc)
    }
    async hoverPatientDetails(){
        await this.page.getByText('Patient Details').hover();
    }  
    
     //edit patient information
     async editPatientFname(fname){
         //first name 
        await this.page.getByLabel('First Name *').click();
        await this.page.getByLabel('First Name *').fill(fname);
     }
     async editPatientLname(lname){
         //last name 
         await this.page.getByLabel('Last Name *').click();
         await this.page.getByLabel('Last Name *').fill(lname); 
     }
     async editPatientHH(hhYear, hhMonth, hhDay){
        //health history (calendar)
        await this.page.locator('mat-form-field').filter({hasText: 'Health History Date'}).getByLabel('Open calendar').click();
        await this.page.getByLabel('Choose month and year').click();
        while(await this.page.getByRole('button', {name:hhYear, exact:true}).isHidden()){
           await this.page.getByLabel('Previous 24 years').click();
        }
           await this.page.getByLabel(hhYear).click();
           await this.page.getByLabel(hhMonth).click();
           await this.page.getByLabel(hhDay).click();
        //checkmark button to close the calendar
        await this.page.locator('button').filter({hasText: 'done'}).click();
    }
    async editPatientGender(gender){
        //gender drop down
        await this.page.getByLabel('Gender * *').locator('div').nth(3).click();
        await this.page.getByText(gender,{exact:true}).click();
            /**gender key
             * male
             * female
             */
    }
    async editPatientRace(race){
        //race
        await this.page.getByPlaceholder('Race').locator('div').nth(2).click();
        await this.page.getByRole('option', { name: race, exact:true }).locator('span').click();
        /** Race Key
         * American Indian or Alaska Native
         * Asian
         * Black or African American
         * Native Hawaiian or Other Pacific Islander
         * Other Race
         * White
         */
    }
    async editPatientEthnicity(ethnicity){
        //ethinicity
        await this.page.getByPlaceholder('Ethnicity').locator('div').nth(2).click();
        await this.page.getByRole('option', { name: ethnicity, exact:true }).locator('span').click();
        /** Ethnicity Key
         * Unknown
         * Hispanic
         * Not Hispanic
         */
    }
    async editPatientDob(dobyear,dobmonth,dobday){
        //date of birth (calendar)
        await this.page.locator('mat-form-field').filter({hasText: 'Date of birth *'}).getByLabel('Open calendar').click();
        await this.page.getByLabel('Choose month and year').click();
        while(await this.page.getByRole('button', {name:dobyear, exact:true}).isHidden()){
           await this.page.getByLabel('Previous 24 years').click();
        }
           await this.page.getByLabel(dobyear).click();
           await this.page.getByLabel(dobmonth).click();
           await this.page.getByLabel(dobday).click();
    }
    async editPatientHippa(hippa){
        //hipaa received (checkbox)
        if(hippa != 'yes'){
            await this.page.locator('id=mat-checkbox-3');
            }
            else{
            await this.page.locator('id=mat-checkbox-3').click();
            }
    }
    async editPatientStreet(street){
        //street address
        await this.page.getByLabel('Street *').click();
        await this.page.getByLabel('Street *').fill(street);
    }
    async editPatientCity(city){
        //city
        await this.page.getByLabel('City *').click();
        await this.page.getByLabel('City *').fill(city);
    }
    async editPatientState(state){
        //state
        await this.page.getByLabel('State *').click();    
        await this.page.getByLabel('State *').fill(state);
    }
    async editPatientZipcode(zipcode){
        //zipcode
        await this.page.getByLabel('PostalCode *').click();
        await this.page.getByLabel('PostalCode *').fill(zipcode);
    }
    async editPatientPhone(phone){
        //primary phone
        await this.page.getByLabel('Primary Phone *').click();
        await this.page.getByLabel('Primary Phone *').fill(phone);
    }
    //edit height
    async editPatientHeight(height){
     await this.page.getByPlaceholder('Height(inches)').click();
     await this.page.getByPlaceholder('Height(inches)').fill(height);
    }
    //edit weight
    async editPatientWeight(weight){
    await this.page.getByPlaceholder('Weight (lbs)').click();
    await this.page.getByPlaceholder('Weight (lbs)').fill(weight);   

    }
    //edit pcp
    async editPCP(provider){
        //click the blue pencil "Edit" for PCP
        await this.page.getByTitle('Edit').nth(0).click();
        //enter provider name
        await this.page.getByLabel('Provider Name / NPI').click();
        await this.page.getByPlaceholder('Provider Name / NPI').fill(provider);
        await this.page.getByPlaceholder('Provider Name / NPI').press('Enter');
        await this.page.getByRole('option',{name:provider,exact:false}).click();
        //save button
        await this.page.getByRole('button',{name:'Save'}).click();
    }
    //edit surgeon
    async editSurgeon(surgeon){
        //click the blue pencil "Edit" for PCP
        await this.page.getByTitle('Edit').nth(2).click();
        //enter the surgeon
        await this.page.getByLabel('Surgeon Name / NPI').click();
        await this.page.getByPlaceholder('Surgeon Name / NPI').fill(surgeon);
        await this.page.getByPlaceholder('Surgeon Name / NPI').press('Enter');
        await this.page.getByRole('option',{name:surgeon,exact:false}).click();
        //save button
        await this.page.getByRole('button',{name:'Save'}).click();
    }
    //edit treatment center
    async editCenter(center){
        //click the blue pencil "edit" for Treatment Infusion Center
        await this.page.getByTitle('Edit').nth(1).click();
        //enter the center's name
        await this.page.getByLabel('Infusion Name / Facility Name / Code').click();
        await this.page.getByPlaceholder('Infusion Name / Facility Name / Code').fill(center);
        /**center key
         * test location (QA1)
         * test location (QA3)
         */
        await this.page.getByPlaceholder('Infusion Name / Facility Name / Code').press('Enter');
        //save button
        await this.page.getByRole('button',{name:'Save'}).click();
    }
    //edit surgery facility
    async editFacility(facility){
          //click the blue pencil "edit" for Treatment Infusion Center
          await this.page.getByTitle('Edit').nth(3).click();
          //enter the center's name
          await this.page.getByLabel('Facility Name').click();
          await this.page.getByPlaceholder('Facility Name').fill(facility);
          await this.page.getByPlaceholder('Facility Name').press('Enter');
         await this.page.getByRole('option',{name:facility,exact:true}).click();
          //save button
          await this.page.getByRole('button',{name:'Save'}).click();
    }
    //save button
    async saveEditPatient(){      
       await this.page.getByRole('button',{name:'Save'}).click();
        }

    async patientVerify(num){
        await this.page.screenshot({path:'patientverify'+ num +'.png', fullPage: true});
      }
    
    //latest labs screenshot
    async latestlabsscreenshot(){
        await this.page.getByText('LAB INTERPRETATION',{exact:true}).scrollIntoViewIfNeeded();

    }

    //view visit button
    async viewVisit(){
        await this.page.getByRole('button',{name:'View Visit'}).last().click();//chooses most recent visit
    }
    //Assign visit button
    async assignButton(){
        await this.page.getByRole('button',{name:'Assign'}).click();
    }
    //assign visit
    async assignVisit(user){
        await this.page.getByLabel('Users list').locator('div').nth(3).click();
        await this.page.getByRole('option',{name:user,exact:true}).click();
    }
    //save assigned user
    async saveAssigned(){
        await this.page.getByRole('button',{name:'Save'}).click();
        await expect(this.page.locator('id=toast-container',{hasText:'User Assigned successfully'})).toBeInViewport();
        
    }
    //unassign user
    async unAssign(){
        await this.page.getByRole('button',{name:'Assign'}).click();
        await this.page.getByRole('button',{name:'UnAssign'}).click();
        await expect(this.page.locator('id=toast-container',{hasText:'User Unassigned successfully'})).toBeInViewport();
    }
    //back arrow
    async backarrow(){
        await this.page.getByRole('button',{name:''}).click();
    }
    //close assign user window
    async closeAssignWindow(){
        await this.page.getByRole('button',{name:'Close'}).click();
    }
    //patient details drop down
    async seePatientDetails(){
        await this.page.getByRole('button',{name:'PATIENT DETAILS'}).click();
    }
    //medications drop down
    async seeMedications(){
        await this.page.getByRole('button',{name:'MEDICATIONS'}).click();
    }
    //Anemia Management Treatment drop down
    async seeAnemiaManagement(){
        await this.page.getByRole('button',{name:'ANEMIA MANAGEMENT TREATMENT'}).click();
    }
    //allergies drop down
    async seeAllergies(){
        await this.page.getByRole('button',{name:'ALLERGIES'}).click();
    }
    //chain of custody drop down and scroll
    async seeChainofCustody(){
        await this.page.getByRole('button',{name:'CHAIN OF CUSTODY'}).click();
        
    }
    //add communication
    async addCommunication(commType, message,priority,resolveYear?,resolveMonth?,resolveDay?){
        await this.page.getByTestId('addCommunication').click();
        await this.page.getByPlaceholder('Communication Type').click();
        await this.page.getByText(commType).click();
        /**commType Key
         * Task
         * Comment
         * Follow Up Call Needed
         */
        await this.page.getByPlaceholder('Message').click();
        await this.page.getByPlaceholder('Message').fill(message);
        await this.page.getByPlaceholder('Priority').locator('div').nth(3).click();
        await this.page.getByRole('option',{name:priority,exact:false}).click();
        /**priority key
         * Hold
         * Low
         * Medium
         * High
         */
     if(commType != 'Comment'){
        await this.page.getByLabel('Open calendar').click();
        await this.page.getByLabel('Choose month and year').click();
        while(await this.page.getByRole('button', {name:resolveYear, exact:false}).isHidden()){
           await this.page.getByLabel('Previous 24 years').click();
        }
           await this.page.getByLabel(resolveYear,{exact:true}).click();
           await this.page.getByLabel(resolveMonth).click();
           await this.page.getByText(resolveDay,{exact:true}).click();
           await this.page.locator('button').filter({ hasText: 'done' }).click();
    }

           await this.page.getByRole('button', { name: 'Add Communication' }).click();
           await expect(this.page.locator('id=toast-container',{hasText:'Communication added successfully'})).toBeInViewport();
    } 
    //sort communication
    async sortCommunication(sortby){
        /**sortby key
         * asc
         * desc
         */
        if(sortby == 'asc' && await this.page.getByRole('button',{name:'Newest First'}).isVisible()){
            //do nothing already sorted by ascending
        }
        else if(sortby == 'desc' && await this.page.getByRole('button',{name:'Newest First'}).isVisible()){
            await this.page.getByRole('button',{name:'Newest First'}).click();
        }
        else if(sortby == 'desc' && await this.page.getByRole('button',{name:'Oldest First'}).isVisible()){
            //do nothing already sorted by descending
        }
        else( sortby == 'asc' && await this.page.getByRole('button',{name:'Oldest First'}).isVisible());{
            await this.page.getByRole('button',{name:'Oldest First'}).click();
        }
    }
    //edit communication
    async editCommunication(){
        await this.page.getByText('COMMUNICATION').scrollIntoViewIfNeeded();
        await this.page.getByLabel('communication-edit').last().click();
    }
    //edit commtype
    async editCommType(commType){
        await this.page.getByPlaceholder('Communication Type').click();
        await this.page.getByRole('option',{name:commType,exact:true}).click();
        /**commType key
         * Task
         * Comment
         * Follow Up Call Needed
         */
    }
    //edit message
    async editMessage(comment){
        await this.page.getByPlaceholder('Message').click();
        await this.page.getByPlaceholder('Message').fill(comment);
    }
    //edit priority
    async editPriority(priority){
        await this.page.getByPlaceholder('Priority').click();
        await this.page.getByRole('option',{name:priority,exact:false}).click();
        /**priority key
         * Low
         * Medium
         * High
         * Hold
         */
    }
    //edit resolve date
    async editResolveDate(resolveYear,resolveMonth,resolveDay){
        await this.page.getByLabel('Open calendar').click();
        await this.page.getByLabel('Choose month and year').click();
        while(await this.page.getByRole('button', {name:resolveYear, exact:false}).isHidden()){
           await this.page.getByLabel('Previous 24 years').click();
        }
           await this.page.getByLabel(resolveYear,{exact:true}).click();
           await this.page.getByLabel(resolveMonth).click();
           await this.page.getByText(resolveDay,{exact:true}).click();
           await this.page.locator('button').filter({ hasText: 'done' }).click();
    }
    //edit communication button
    async saveCommEdits(){
        await this.page.getByRole('button',{name:'Edit Communication'}).click();
        await expect(this.page.locator('id=toast-container',{hasText:'Communication edited successfully'})).toBeInViewport();
    }
    //reply to communication
    async replyCommunication(comment,resolved){
        await this.page.getByRole('button',{name:'Reply'}).last().click();
        await this.page.getByPlaceholder('Message').click();
        await this.page.getByPlaceholder('Message').fill(comment);
        if(resolved == 'yes'){
            await this.page.getByLabel('Mark as Resolved').click();   
        }
        else{
            //do nothing
        }
        await this.page.getByRole('button',{name:'Reply'}).click();
    }
    //mark as resolved
    async markAsResolved(){
        await this.page.getByRole('button',{name:'Mark as Resolved'}).last().click();
    }

}   