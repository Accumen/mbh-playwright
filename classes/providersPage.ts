import { Page} from "@playwright/test";

export default class ProvidersPage{

    constructor(public page: Page){}
    
    //variables
    public provider;
    public fname;
    public lname;
    public email;
    public npi;
    public status;

    //choose providers from side menu
    async clickProviders(){
        await this.page.getByRole('link', {name: 'Providers'}).click({delay:100});
    }
    //add provider button
    async addProvider(){
        await this.page.getByRole('button', {name: 'Add Provider'}).click();
    }
    //select provider from search list
    async selectProvider(provider){
        await this.page.getByRole('link', {name: provider, exact: false}).click();
    }
    //Enter/Edit Provider Information
    async editAddProviderInfo(fname, lname, email, npi, status){
    //all fillable fields
            
             //first name (required)
        await this.page.getByLabel('First Name *').click();
        await this.page.getByLabel('First Name *').fill(fname);     
             //middle name
             //last name (required)
        await this.page.getByLabel('Last Name *').click();
        await this.page.getByLabel('Last Name *').fill(lname);     
             //prefix
             //suffix
             //credentials
             //description
             //address
             //city 
             //state
             //postal code
             //email (required)
        await this.page.getByLabel('Email *').click();
        await this.page.getByLabel('Email *').fill(email);     
             //office phone
             //office fax
             //NPI (required)
        await this.page.getByLabel('NPI *').click();
        await this.page.getByLabel('NPI *').fill(npi);     
             //Clinic
             
        //call to status drop down
        this.providerStatus(status);
    }
            //save provider button
    async saveProvider(){
        await this.page.getByRole('button', {name:'Save Provider'}).click();
    }        
            //back button
    async backArrow(){
        await this.page.getByRole('button', {name: ''}).click();
    }        
    //search provider (fillable)
    async searchProvider(provider:string){
        await this.page.getByLabel('Search provider name, npi').click();
        await this.page.getByLabel('Search provider name, npi').fill(provider);
    }
    //status drop down
    async providerStatus(status:string){
        await this.page.getByLabel('Status').locator('div').nth(2).click();
        await this.page.getByRole('option', {name: status, exact: true}).locator('span').click();
    
        /** status key
         * active 
         * inactive
         */
    }
    //clear button
    async clearSelections(){
        await this.page.getByRole('button', {name:'CLEAR'}).click();
    }

}