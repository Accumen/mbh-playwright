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
    public labvalue;
    public resultyear;
    public resultmonth;
    public resultday;
    public startyear;
    public startmonth;
    public startday;

    // select patient from the navigation menu
    async selectPatients(){
        await this.page.getByRole('link', {name:'Patients'}).click({delay:100});
    }
  
 
    //search patient name (fillable)
    async searchPatient(patient){
        await this.page.locator('id=mat-input-0').click();
        await this.page.locator('id=mat-input-0').fill(patient);
        await this.page.locator('id=mat-input-0').press('Enter');
    }
    //clear button
    async clearSelections(){
        await this.page.getByRole('button',{name:'CLEAR'}).click();
    }
    //select patient from search list
    async selectPatientfromSearch(patient){
        await this.page.getByRole('link',{name:patient}).click();
    }
    //view all labs button
    async viewAllLabs(labtype,startyear,startmonth, startday,resultyear,resultmonth, resultday){
        await this.page.getByRole('button',{name:'View All'}).click();
        //lab type fillable
        await this.page.getByLabel('Lab Type').click();
        await this.page.getByLabel('Lab Type').fill(labtype);
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
               await this.page.getByLabel(resultyear).click();
               await this.page.getByLabel(resultmonth).click();
               await this.page.getByLabel(resultday).click();  
        }        
        //select from lab search results list
        async editSearchedLab(labtype,result,resultyear,resultmonth,resultday){
            //await this.page.getByRole('row',{name:labtype,exact:false}).getByRole('link').first().click();
            //edit pencil
            await this.page.getByRole('link',{name:'Edit Lab'}).first().click();//edit button with aria-label
                //result value
                await this.page.getByLabel('Result Value *').click();
                await this.page.getByLabel('Result Value *').fill(result);
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
            //Save  
            async saveEditedLab(){
                await this.page.getByRole('button', {name:'Save'}).click();
            }     
            //delete trash can    
            async deleteSearchedLab(labtype){
                //await this.page.getByRole('option',{name:labtype,exact:false}).locator('span').click();
                await this.page.getByRole('link',{name:'Delete Lab'}).first().click();//delete lab button with aria-label
                this.page.once('dialog',dialog=>{
                    console.log('Dialog message: ${dialog.message()}');
                    dialog.dismiss().catch(()=>{})
                })
            }
        //red x close window button
        async closeSearchListWindow(){
            await this.page.getByRole('button', {name:'Close View All Labs'}).click(); // close window button with aria label
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
    async addPatient(fname,lname,mrn,hhYear,hhMonth,hhDay,gender,dobyear,dobmonth,dobday,hippa){
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
        await this.page.getByLabel('Gender * *').locator('div').nth(3).click();
        await this.page.getByText(gender,{exact:true}).click();
            /**gender key
             * male
             * female
             */
        //date of birth (calendar)
        await this.page.locator('mat-form-field').filter({hasText: 'Date of birth * *'}).getByLabel('Open calendar').click();
        await this.page.getByLabel('Choose month and year').click();
        while(await this.page.getByRole('button', {name:dobyear, exact:true}).isHidden()){
           await this.page.getByLabel('Previous 24 years').click();
        }
           await this.page.getByLabel(dobyear).click();
           await this.page.getByLabel(dobmonth).click();
           await this.page.getByLabel(dobday).click();
        //hipaa received (checkbox)
        if(hippa != 'yes'){
            await this.page.locator('id=mat-checkbox-3');
            }
            else{
            await this.page.locator('id=mat-checkbox-3').click();
            }
    }
        //save patient button
        async savePatient(){
            await this.page.getByRole('button', {name: 'Save'}).click();
        }

}