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
        await this.page.getByText('Search provider name, npi').click();
        await this.page.getByText('Search provider name, npi').fill(provider);
        await this.page.getByText('Search provider name, npi').press('Enter');
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
        await this.page.getByLabel('First Name').click();
        await this.page.getByLabel('First Name').fill(fname);     
        //last name (required)
        await this.page.getByLabel('Last Name').click();
        await this.page.getByLabel('Last Name').fill(lname);     
        //email (required)
        await this.page.getByLabel('Email').click();
        await this.page.getByLabel('Email').fill(email);     
        //NPI (required)
        await this.page.getByLabel('NPI').click();
        await this.page.getByLabel('NPI').fill(npi);     
        //call to status drop down
        this.providerStatus(status);
    }

    //edit provider's first name
    async editProviderFirstName(fname){
        await this.page.getByLabel('First Name').click();
        await this.page.getByLabel('First Name').fill(fname);       
    }
    //edit provider's last name
    async editProviderLastName(lname){
        await this.page.getByLabel('Last Name').click();
        await this.page.getByLabel('Last Name').fill(lname);
    }
    //edit provider's email
    async editProviderEmail(email) {
        await this.page.getByLabel('Email').click();
        await this.page.getByLabel('Email').fill(email);
    }
    //edit provider's NPI
    async editProviderNPI(npi){
        await this.page.getByLabel('NPI').click();
        await this.page.getByLabel('NPI').fill(npi);
    }
    //edit provider postal code
    async editPostalCode(zipcode){
        await this.page.getByPlaceholder('PostalCode').fill(zipcode);
    }
    //provider npi error check
    async npiErrorCheck(){
        await this.page.getByText('NPI should be 10 digit number').isVisible();
    }
            //save provider button
    async saveProvider(){
        await this.page.getByRole('button', {name:'Save Provider'}).click();
        await this.page.locator('id=toast-container',{hasText:'Provider Updated successfully'}).isVisible();
    }        
            //back button
    async backArrow(){
        await this.page.getByRole('button', {name: ''}).click();
    }        
    //search provider (fillable)
    async searchProvider(provider:string){
        await this.page.getByText('Search provider name, npi').click();
        await this.page.getByText('Search provider name, npi').fill(provider);
        await this.page.getByText('Search provider name, npi').press('Enter');
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
        await this.page.locator('id-toast-container',{hasText:'Provider deleted successfully'}).isVisible();
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