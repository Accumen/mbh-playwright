import {Page} from "@playwright/test";

export default class FacilitiesPage{

    constructor(public page: Page){}
    
    //variables
    public facility;
    public status;
    public location;
    public type;
    public row;
    public shortname;
    public facilitycode;
    public information;
    public address;
    public city;
    public state;
    public zip;
    public phone;
    public fax; //this variable can be used to enter info for varying field (address, city, state, zip...)

   // select facilitis from navigation menu
   async selectFacilityMenu(){
    await this.page.getByRole('link',{name:'Facilities'}).click({delay:90});
   }
    //search facility name (fillable)
    async facilitySearch(facility: string){
        await this.page.locator('id=mat-input-0').click();
        await this.page.locator('id=mat-input-0').fill(facility);
    }

    //status drop down (not labeled)
    async selectStatus(status: string){
        await this.page.getByLabel('Active',{exact:true}).locator('div').nth(3).click();
        await this.page.getByText(status).click();
    /**status key
     * active
     * inactive
     */
      
    }
    
    //clear button
    async clearSelections(){
        await this.page.getByRole('button',{name:'CLEAR'}).last().click();
    }

    

    
    //facility name (clickable)

        //save facility button
     async saveFacility(){
        await this.page.getByRole('button',{name:'Save Facility'}).click();
     }
        //back arrow button
        async facilityBackArrow(){
            await this.page.locator('mat-sidenav-content').click();
        }
		 //add facility button
     async addFacility(facility: string, shortname: string, facilitycode: string, address:string,city:string,state:string, zip: string, 
        phone: string, fax: string,type: string, status: string){
        await this.page.getByRole('button',{name:'Add Facility'}).click();
    
        //facility name (fillable)
            await this.page.getByLabel('Facility Name').click();
            await this.page.getByLabel('Facility Name').fill(facility);
    
        //facility short name (fillable)
            await this.page.getByLabel('Facility Short Name').click();
            await this.page.getByLabel('Facility Short Name').fill(shortname);

        //facility code (fillable)
            await this.page.getByLabel('Facility Code').click();
            await this.page.getByLabel('Facility Code').fill(facilitycode);

        //address (fillable)
            await this.page.getByLabel('Address').click();
            await this.page.getByLabel('Address').fill(address);
     
        //city (fillable)
            await this.page.getByLabel('City').click();
            await this.page.getByLabel('City').fill(city);
       
        //state (fillable)
            await this.page.locator('id=mat-input-6').click();
            await this.page.locator('id=mat-input-6').fill(state);
			
        //zipcode (fillable)
            await this.page.getByLabel('Zipcode').click();
            await this.page.getByLabel('Zipcode').fill(zip);
       
        //phone (fillable)
            await this.page.getByLabel('Phone').click();
            await this.page.getByLabel('Phone').fill(phone);
       
        //fax (fillable)
            await this.page.getByLabel('Fax').click();
            await this.page.getByLabel('Fax').fill(fax);

        //Type drop down
            await this.page.locator('#mat-select-value-15').click();
            await this.page.getByText(type).click();
             /**Type Key
             * Hospital System
             * Blood Center
             * Insurance Company
             */
                   
        //select status function on new facility form
            await this.page.locator('id=mat-select-16').click();
            await this.page.getByText(status).click();
        }

        //add location button
        async addLocation(){
            await this.page.getByRole('button', {name:'Add Location'}).click();
        }
        //new location information popup
        async newLocation(location:string,type:string,status:string){
            //location name
            await this.page.getByLabel('Location Name').click();
            await this.page.getByLabel('Location Name').fill(location);
            //type drop down
            await this.page.getByText('TypeType').click();
            await this.page.getByText(type).click();
                /**
                 * infusion center
                 * others
                 */
            //status drop down
            await this.page.getByLabel('Status',{exact:true}).locator('div').nth(3).click();
            await this.page.getByRole('option', {name:status, exact:true}).locator('span').click();
                /**
                 * active
                 * inactive
                 */
				 		 
            //save location button
            await this.page.getByRole('button',{name:'Save Location'}).click();

        }
            
            //exit (x) button
    //delete button (trash can icon)    
    async trashButton(){
        await this.page.getByText('fa fa-trash text-danger').click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => {})});
    }
    //row counter
    /**
     * 15
     * 30
     * 50
     */
}