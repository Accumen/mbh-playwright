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

    //select facilitis from navigation menu
    async selectFacilityMenu(){
        await this.page.getByRole('link',{name:'Facilities'}).click({delay:90});
    }
    //search facility name (fillable)
    async facilitySearch(facility: string){
        await this.page.getByText('Search Facility name , code,').click();
        await this.page.getByText('Search Facility name , code,').fill(facility);
        await this.page.getByText('Search Facility name , code,').press('Enter');
    }

    //status drop down (not labeled)
    async selectStatus(status: string){
        if (status == 'Inactive'){
            await this.page.getByLabel('Active',{exact:true}).locator('div').nth(3).click();
        }
        else{
            await this.page.getByLabel('Inactive',{exact:true}).locator('div').nth(3).click();
        }
        await this.page.getByText(status,{exact:true}).click();
        /**status key
         * active
         * inactive
         */
      
    }
    
    //clear button
    async clearSelections(){
        await this.page.getByRole('button',{name:'CLEAR'}).last().click({delay:1000});
    }
    //select facility
    async selectFacility(facility){
        await this.page.getByText(facility).click();
    }
    //select location
    async selectLocation(location){
        await this.page.getByText(location).click();
    }
    
    //facility name (clickable)

    //save facility button
    async saveFacility(){
        await this.page.getByRole('button',{name:'Save Facility'}).click();
    }
    //back arrow button
    async facilityBackArrow(){
        await this.page.getByRole('button',{name:''}).click();
    }
	//add facility button
    async addFacility(facility: string, shortname: string, facilitycode: string, address:string,city:string,state:string, zip: string, 
        phone: string, fax: string,type: string, region: string, status: string){
        await this.page.getByRole('button',{name:'Add Facility'}).click();
    
        //facility name (fillable)
        await this.page.getByLabel('Facility Name').click();
        await this.page.getByLabel('Facility Name').fill(facility);
    
        //facility short name (fillable)
        await this.page.getByText('Facility Short Name').click();
        await this.page.getByText('Facility Short Name').fill(shortname);
        await this.page.getByText('Facility Short Name').click();
        await this.page.getByText('Facility Short Name').fill(shortname);

        //facility code (fillable)
        await this.page.getByText('Facility Code').click();
        await this.page.getByText('Facility Code').fill(facilitycode);
        await this.page.getByText('Facility Code').click();
        await this.page.getByText('Facility Code').fill(facilitycode);

        //address (fillable)
        await this.page.getByLabel('Address').click();
        await this.page.getByLabel('Address').fill(address);
     
        //city (fillable)
        await this.page.getByLabel('City').click();
        await this.page.getByLabel('City').fill(city);
       
        //state (fillable)
        await this.page.getByPlaceholder('State').click();
        await this.page.getByPlaceholder('State').fill(state);
			
        //zipcode (fillable)
        await this.page.getByText('Zipcode').click();
        await this.page.getByText('Zipcode').fill(zip);
        await this.page.getByText('Zipcode').click();
        await this.page.getByText('Zipcode').fill(zip);
       
        //phone (fillable)
        await this.page.getByText('Phone').click();
        await this.page.getByText('Phone').fill(phone);
       
        //fax (fillable)
        await this.page.getByLabel('Fax').click();
        await this.page.getByLabel('Fax').fill(fax);

        //Type drop down
        await this.page.getByPlaceholder('Type').locator('div').nth(2).click();
        await this.page.getByRole('option',{name:type}).click();
            /**Type Key
         * Hospital System
         * Blood Center
         * Insurance Company
         */
        //Region drop down
        await this.page.getByText('Region').nth(2).click();
        await this.page.getByRole('option',{name:region,exact:true}).click(); 
                   
        //select status function on new facility form
        await this.page.getByLabel('Status').locator('div').nth(2).click();
        await this.page.getByText(status,{exact:true}).click();
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
        await this.page.getByRole('combobox',{name:'Status Status'}).locator('path').click();
        await this.page.getByRole('option', {name:status, exact:true}).locator('span').click();
        /**
         * active
         * inactive
         */
                        
        //save location button
        await this.page.getByRole('button',{name:'Save Location'}).click();

    }
            
    //exit (x) button
    async close(){
        await this.page.getByRole('button', { name: '' }).click();
    }
    
    //delete button (trash can icon)    
    async trashButton(){
        this.page.once('dialog',dialog => dialog.accept());
        //await this.page.getByText('fa fa-trash text-danger').click();
        await this.page.getByTitle('Delete').last().click();
    }
    //edit facility
    async editFacility(facility?,shortname?,facilitycode?,address?,city?,state?,zip?, 
        phone?,fax?,type?,region?,status?){

        if(facility != ''){
            await this.page.getByLabel('Facility Name').click();
            await this.page.getByLabel('Facility Name').fill(facility);
        }
        if(shortname != ''){
            await this.page.getByText('Facility Short Name').click();
            await this.page.getByText('Facility Short Name').fill(shortname);
        }
        if(facilitycode != ''){
            await this.page.getByText('Facility Code').click();
            await this.page.getByText('Facility Code').fill(facilitycode);
        }
        if(address != ''){
            await this.page.getByLabel('Address').click();
            await this.page.getByLabel('Address').fill(address);
        }
        if(city != ''){
            await this.page.getByLabel('City').click();
            await this.page.getByLabel('City').fill(city);
        }
        if(state != ''){
            await this.page.getByPlaceholder('State').click();
            await this.page.getByPlaceholder('State').fill(state);
        }
        if(zip != ''){
            await this.page.getByText('Zipcode').click();
            await this.page.getByText('Zipcode').fill(zip);
        }
        if(phone != ''){
            await this.page.getByLabel('Phone').click();
            await this.page.getByLabel('Phone').fill(phone);
        }
        if(fax != ''){
            await this.page.getByLabel('Fax').click();
            await this.page.getByLabel('Fax').fill(fax);
        }
        if(type != ''){
            await this.page.getByLabel('Type').locator('div').nth(2).click();
            await this.page.getByText(type).click();
        }
        if(region != ''){
            await this.page.getByLabel('Region').locator('div').nth(2).click();
            await this.page.getByText(region).click();
        }
        if(status != ''){
            await this.page.getByLabel('Status').locator('svg').click();
            await this.page.getByRole('option',{name: status, exact:true}).click();
        }
    }
    //edit location
    async editLocation(location?,type?,status?){
        if(location != ''){
            await this.page.getByLabel('Location Name').click();
            await this.page.getByLabel('Location Name').fill(location);
        }
        if(type != ''){
            await this.page.locator('#mat-select-value-39').click();
            await this.page.getByText(type).click();
        }
        if(status != ''){
            await this.page.getByRole('combobox',{name: 'Status'}).click();
            await this.page.getByRole('option', {name:status, exact:true}).locator('span').click();
        }
        //save location
        await this.page.getByRole('button',{name:'Save Location'}).click();
    }
    //screenshot
    async facilityScreenshot(num){
        await this.page.screenshot({path:'facilityscreenshot'+ num +'.png',fullPage:true});
    }
    // adjust number of rows visible on screen
    async adjustRowCount(row: string){
        await this.page.getByLabel('15').locator('div').nth(2).click();//clicks the drop down for the row count
        /**Row Key
         * 15 (default)
         * 30
         * 50
         */
        await this.page.getByText(row,{exact:true}).click();//selects the row count in the []
        
    }
}