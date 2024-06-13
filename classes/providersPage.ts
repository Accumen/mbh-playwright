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
    //search provider
    async providerSearch(provider){
        await this.page.getByLabel('Search provider name, npi').click();
        await this.page.getByLabel('Search provider name, npi').fill(provider);
        await this.page.getByLabel('Search provider name, npi').press('Enter');
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
    async editAddProviderInfo(fname, mname, lname, prefix, suffix, cred, desc, address, city, state, zip, email, phone, fax, npi, clinic, status){
    //all fillable fields
            
        //first name (required)
        await this.page.getByLabel('First Name *').click();
        await this.page.getByLabel('First Name *').fill(fname);     
        //middle name
        await this.page.getByLabel('Middle Name').click();
        await this.page.getByLabel('Middle Name').fill(mname); 
        //last name (required)
        await this.page.getByLabel('Last Name *').click();
        await this.page.getByLabel('Last Name *').fill(lname);     
        //prefix
        await this.page.getByLabel('Prefix').click();
        await this.page.getByLabel('Prefix').fill(prefix); 
        //suffix
        await this.page.getByLabel('Suffix').click();
        await this.page.getByLabel('Suffix').fill(suffix);
        //credentials
        await this.page.getByLabel('Credentials').click();
        await this.page.getByLabel('Credentials').fill(cred);
        //description
        await this.page.getByLabel('Description').click();
        await this.page.getByLabel('Description').fill(desc);
        //address
        await this.page.getByLabel('Address').click();
        await this.page.getByLabel('Address').fill(address);
        //city
        await this.page.getByLabel('City').click();
        await this.page.getByLabel('City').fill(city); 
        //state
        await this.page.getByLabel('State').click();
        await this.page.getByLabel('State').fill(state);
        //postal code
        await this.page.getByLabel('PostalCode').click();
        await this.page.getByLabel('PostalCode').fill(zip);
        //email (required)
        await this.page.getByLabel('Email *').click();
        await this.page.getByLabel('Email *').fill(email);     
        //office phone
        await this.page.getByLabel('Office Phone').click();
        await this.page.getByLabel('Office Phone').fill(phone);
        //office fax
        await this.page.getByLabel('Office Fax').click();
        await this.page.getByLabel('Office Fax').fill(fax);
        //NPI (required)
        await this.page.getByLabel('NPI *').click();
        await this.page.getByLabel('NPI *').fill(npi);     
        //Clinic
        await this.page.getByLabel('Clinic').click();
        await this.page.getByLabel('Clinic').fill(clinic);
             
        //call to status drop down
        this.providerStatus(status);
    }
    //edit provider's first name
    async editProviderFirstName(fname){
        await this.page.getByLabel('First Name *').click();
        await this.page.getByLabel('First Name *').fill(fname);       
    }
    //edit provider's last name
    async editProviderLastName(lname){
        await this.page.getByLabel('Last Name *').click();
        await this.page.getByLabel('Last Name *').fill(lname);
    }
    //edit provider's email
    async editProviderEmail(email) {
        await this.page.getByLabel('Email *').click();
        await this.page.getByLabel('Email *').fill(email);
    }
    //edit provider's NPI
    async editProviderNPI(npi){
        await this.page.getByLabel('NPI *').click();
        await this.page.getByLabel('NPI *').fill(npi);
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
    async deleteProvider(){
        //await this.page.getByTitle('Delete').click();
        this.page.once('dialog',dialog => dialog.accept());
        await this.page.getByTitle('Delete').last().click();
    }

}