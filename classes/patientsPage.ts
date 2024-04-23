import { Page} from "@playwright/test";
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
        await this.page.getByLabel('Search Patient name , mrn').click();
        await this.page.getByLabel('Search Patient name , mrn').fill(patient);
        await this.page.getByLabel('Search Patient name , mrn').press('Enter');
    }
    //clear button
    async clearSelections(){
        await this.page.getByRole('button',{name:'CLEAR'}).click();
    }
    //select patient from search list
    async selectPatientfromSearch(patient){
        await this.page.getByRole('link',{name:patient}).first().click();
    }
    //view all labs button
    async viewAllLabs(labtype?,startyear?,startmonth?, startday?,resultyear?,resultmonth?, resultday?){
        await this.page.getByRole('button',{name:'View All'}).click();
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
               await this.page.getByLabel(startyear).click();
               await this.page.getByLabel(startmonth).click();
               await this.page.getByText(startday,{exact:true}).click();    
            //end date    (calendar) 
            await this.page.getByLabel('Choose month and year').click();
            while(await this.page.getByRole('button', {name:resultyear, exact:false}).isHidden()){
               await this.page.getByLabel('Previous 24 years').click();
            }
               await this.page.getByLabel(resultyear,{exact:true}).click();
               await this.page.getByLabel(resultmonth).click();
               await this.page.getByText(resultday,{exact:true}).click();}
               
        }        
        //select from lab search results list
        async editSearchedLab(result?,resultyear?,resultmonth?,resultday?){
            //await this.page.getByRole('row',{name:labtype,exact:false}).getByRole('link').first().click();
            //edit pencil
            await this.page.getByRole('link',{name:'Edit Lab'}).first().click();//edit button with aria-label
                //result value
                await this.page.getByLabel('Result Value *').click();
                await this.page.getByLabel('Result Value *').fill(result);
                if(resultyear != 'NULL'){
                //result date (calendar)
                await this.page.locator('#mat-dialog-2').getByLabel('Open calendar').click();
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
                await this.page.getByLabel('Result Date *').click();
                await this.page.getByLabel('Result Date *').selectText();
                await this.page.getByLabel('Result Date *').press('Delete');
            }

            //Save  
            async saveEditedLab(){
                await this.page.getByRole('button', {name:'Save'}).click();
            }     
            //delete trash can    
            async deleteSearchedLab(labtype){
                this.page.on('dialog',dialog => dialog.accept());
                await this.page.getByRole('link',{name:'Delete Lab'}).first().click();//delete lab button with aria-label
                
            }
        //red x close window button
        async closeSearchListWindow(){
            await this.page.getByRole('button', {name:'Close View All Labs'}).click(); // close window button with aria label
        }
    //lastest labs section
    async latestLabs(){
        await this.page.getByText('LATEST LABS').scrollIntoViewIfNeeded();
    }
    
    //add labs
    async addLabs(labtype,labvalue,resultyear,resultmonth,resultday){
        await this.page.getByRole('button',{name: 'Add'}).click();
        await this.page.getByLabel('Choose Lab Type *').locator('span').click();
        await this.page.getByRole('option', {name:labtype}).locator('span').click();
        await this.page.getByLabel('Result Value *').click();
        await this.page.getByLabel('Result Value *').fill(labvalue);
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
        await this.page.getByLabel('First Name *').click();
        await this.page.getByLabel('First Name *').fill(fname);
         //last name 
         await this.page.getByLabel('Last Name *').click();
         await this.page.getByLabel('Last Name *').fill(lname); 
         //mrn
         await this.page.getByLabel('MRN *').click();
         await this.page.getByLabel('MRN *').fill(mrn);
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
            
        //gender drop down
        await this.page.getByLabel('Gender *').locator('div').nth(3).click();
        await this.page.getByText(gender,{exact:true}).click();
            /**gender key
             * male
             * female
             */
        //race (drop down)
        await this.page.getByLabel('Race *').locator('div').nth(2).click();
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
        await this.page.getByLabel('Ethnicity *').locator('div').nth(2).click();
        await this.page.getByRole('option', { name: ethnicity, exact:true }).locator('span').click();
        /** Ethnicity Key
         * Unknown
         * Hispanic
         * Not Hispanic
         */
        //date of birth (calendar)
        await this.page.locator('mat-form-field').filter({hasText: 'Date of birth *'}).getByLabel('Open calendar').click();
        await this.page.getByLabel('Choose month and year').click();
        while(await this.page.getByRole('button', {name:dobyear, exact:true}).isHidden()){
           await this.page.getByLabel('Previous 24 years').click();
        }
           await this.page.getByLabel(dobyear).click();
           await this.page.getByLabel(dobmonth).click();
           await this.page.getByLabel(dobday).click();
        //hipaa received (checkbox)
        if(hippa != 'yes'){
            await this.page.locator('.mat-checkbox-inner-container');
            //await this.page.locator('id=mat-checkbox-3');
            }
            else{
            await this.page.locator('.mat-checkbox-inner-container').click();
            //await this.page.locator('id=mat-checkbox-3').click();
            }
        //phone number
        await this.page.getByLabel('Primary Phone *').click();
        await this.page.getByLabel('Primary Phone *').fill(phone);
        //street
        await this.page.getByLabel('Address *').click();
        await this.page.getByLabel('Address *').fill(street);
        //apt/unit
        //city
        await this.page.getByLabel('City *', { exact: true }).click();
        await this.page.getByLabel('City *', { exact: true }).fill(city);
        //state
        await this.page.getByLabel('State *').click();
        await this.page.getByLabel('State *').fill(state);
        //zip
        await this.page.getByLabel('PostalCode *').click();
        await this.page.getByLabel('PostalCode *').fill(zipcode);
        //height
        await this.page.locator('id=mat-input-10').click();
        await this.page.locator('id=mat-input-10').fill(height);
        //weight
        await this.page.locator('id=mat-input-11').click();
        await this.page.locator('id=mat-input-11').fill(weight);

    }
        //save patient button
        async savePatient(){
            await this.page.getByRole('button', {name: 'Save'}).click();
        }

          //schedule surgical visit
          async patientschedulesurgical(pYear,pMonth,pDay,pclickcount,procedure,surgeon,pFacility){
            await this.page.getByRole('button',{name:'Schedule Surgical Visit'}).click();
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
         await this.page.getByLabel('Facility',{exact:true}).click();
         await this.page.getByLabel('Facility',{exact:true}).fill(pFacility);
         await this.page.getByLabel('Facility',{exact:true}).press('Enter');
         await this.page.getByRole('option',{name:pFacility,exact:true}).click();
         await this.page.getByRole('button',{name:'Schedule Visit'}).click();
        }
        //schedule chronic visit
        async patientsschedulechronic(pYear,pMonth,pDay,pclickcount,procedure,surgeon,pFacility){
            await this.page.getByRole('button',{name:'Schedule Chronic Visit'}).click();
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
         await this.page.getByLabel('Surgeon', {exact:true}).press('Enter');
         //await this.page.getByLabel('Surgeon', {exact:true}).press('enter');
         //await expect (this.page.locator('id=mat-autocomplete-1')).toBeVisible();
         await this.page.getByRole('option', {name: surgeon, exact: false}).click();
         //PCP (fillabe not required field)
         //Location(fillable not required field)
         //Facility
         await this.page.getByLabel('Facility',{exact:true}).click();
         await this.page.getByLabel('Facility',{exact:true}).fill(pFacility);
         await this.page.getByLabel('Facility',{exact:true}).press('Enter');
         await this.page.getByRole('option',{name:pFacility,exact:true}).click();
         await this.page.getByRole('button',{name:'Schedule Visit'}).click();
        }  
        //edit patient button
    async editPatientDetails(changeDesc){
        await this.page.getByRole('button',{name:'Edit Patient'}).click();
         //change description note box
        await this.page.getByLabel('Change Description *').click();
        await this.page.getByLabel('Change Description *').fill(changeDesc)
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
        await this.page.getByLabel('Race *').locator('div').nth(2).click();
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
        await this.page.getByLabel('Ethnicity *').locator('div').nth(2).click();
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
     await this.page.locator('id=mat-input-10').click();
     await this.page.locator('id=mat-input-10').fill(height);
    }
    //edit weight
    async editPatientWeight(weight){
    await this.page.locator('id=mat-input-11').click();
    await this.page.locator('id=mat-input-11').fill(weight);   

    }
    //save button
    async saveEditPatient(){      
       await this.page.getByRole('button',{name:'Save'}).click();
        }

    async patientVerify(num){
        await this.page.screenshot({path:'patientverify'+ num +'.png', fullPage: true});
      }

    async addCommunication(commType, message,priority,resolveDate){
        await this.page.locator('app-communication-list').getByRole('button', { name: ' Add' }).click();
        await this.page.getByText('Communication TypeCommunication Type *').click();
        await this.page.getByText(commType).click();
        /**commType Key
         * Task
         * Comment
         * Follow Up Call Needed
         */
        await this.page.getByLabel('Message *').click();
        await this.page.getByLabel('Message *').fill(message);
        await this.page.getByLabel('Priority *').locator('div').nth(3).click();
        await this.page.getByText(priority).click();
        /**priority key
         * Hold: Review Case, but no
         * Low: Review Case within 7 days
         * Medium: Review Case and
         * High: Case needs immediate
         */
        await this.page.getByLabel('Open calendar').click();
        await this.page.getByLabel(resolveDate).click();
        /**resolveDate
         * Month day,
         */
        await this.page.locator('button').filter({ hasText: 'done' }).click();
        await this.page.getByRole('button', { name: 'Add Communication' }).click();
    }  
    //sort communication
    async orderCommunications(commSort){
        await this.page.getByRole('button',{name:commSort}).click()
        /**commSort
         * Newest First
         * Oldest First
         */
    }
    //edit communication
    //mark as resolved
    //reply to communication
    //select a visit
    

}