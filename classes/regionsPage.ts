import { Page} from "@playwright/test";

export default class CasetypesmappingPage{

    constructor(public page: Page){}

    //parameters
    public regionName;
    public regionCode;
    public regionStatus;

    //select regions on side menu
    async selectRegionsMenu(){
        await this.page.getByRole('link', { name: 'Regions' }).click();
    }
   
    //select region from screen
    async selectRegion(regionName){
        await this.page.getByText(regionName).click();
    }
        //edit region name
    async editRegionName(regionName){
        await this.page.getByLabel('Region Name *').click();
        await this.page.getByLabel('Region Name *').fill(regionName);

    }
        //edit region code
    async editRegionCode(regionCode){
        await this.page.getByLabel('Region Code *').click();
        await this.page.getByLabel('Region Code *').fill(regionCode);

    }
        //edit region status
    async editRegionStatus(regionStatus){
        await this.page.getByLabel('Active').locator('div').nth(2).click();
        await this.page.getByText(regionStatus).click();
        /**
         * Active
         * Inactive
         */

    }
        //Save
    async saveRegion(){
        await this.page.getByRole('button',{name:'Save'}).click();
    }


     //add region button
     async addRegion(){
        await this.page.getByRole('button',{name:'Add Region'}).click();
     }

     //add region screen
     async newRegion(regionName,regionCode,regionStatus){
        //region name (fillable)
        await this.page.getByLabel('Region Name *').click();
        await this.page.getByLabel('Region Name *').fill(regionName);
        //region code (fillable)
        await this.page.getByLabel('Region Code *').click();
        await this.page.getByLabel('Region Code *').fill(regionCode);
        //region status 
        await this.page.getByLabel('Active').locator('div').nth(2).click();
        await this.page.getByRole('option',{name:regionStatus, exact:true}).click();
        /**
         * Active
         * Inactive
         */
     }
    //back arrow
    async backArrow(){
        await this.page.getByRole('button',{name:''}).click();
    }
    //delete (trash can)
    async deleteRegion(){
        await this.page.getByTitle('Delete').click();
    }

}