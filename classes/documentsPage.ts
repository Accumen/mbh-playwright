import { Page} from "@playwright/test";

export default class DocumentsPage{

    constructor(public page: Page){}
    
    //variables
    public document;
    public docstat;
    public docname;
    public desc;
    public doctype;
    public casetype;

    //select document from side navigation menu
    async selectDocuments(){
        await this.page.getByRole('link',{name:'Documents'}).click();
    }
    //upload document button
    async uploadDocBtn(){
        await this.page.getByRole('button',{name:'Upload Document'}).click();
    }
    //add document button
    async addDocBtn(){
        await this.page.getByRole('button',{name:'Add Document'}).click();
    }
    //search name (fillable)
    async searchDoc(document){
        await this.page.getByLabel('Search name').click();
        await this.page.getByLabel('Search name').fill(document);
    }
    //drop down for status (not labeled)
    async docStatusdropdown(docstat){
        await this.page.getByLabel('Active').locator('div').nth(2).click();
        await this.page.getByText(docstat,{exact:true}).click()
        /**docStat key
         * Active
         * Inactive
     */       
    }
    //clear button
    async clearSelections(){
        await this.page.getByRole('button',{name:'CLEAR'}).click();
    }
    //document name (clickable)
    async selectDocFromList(docname){
        await this.page.getByLabel(docname,{exact:false}).click();
    }
     //preview button
     async previewdoc(){
        await this.page.getByRole('button',{name:'Preview'}).click();
     }
    //save document button
    async saveDoc(){
        await this.page.getByRole('button',{name:'Save Document'}).click();
    }
    //back arrow button
    async addEditDoc(docname,desc,doctype,casetype,docstat,){
        //document name (fillable)
        await this.page.getByLabel('Document Name *').click();
        await this.page.getByLabel('Document Name *').fill(docname);
        //document description (fillable)
        await this.page.getByLabel('Description *').click();
        await this.page.getByLabel('Description *').fill(desc);
        //document types drop down
        await this.page.getByLabel('Document Types *').getByText('Document Types').click();//may also use locator(#mat-select-value-15)
        await this.page.getByText(doctype, {exact:true}).click();
            /** Document Types Key
             * patient letter
             * pcp letter
             * surgeon letter
             * assessment template
             * rcp letter
             * medication order
             * tools and references
             */
        //case types check boxes
        if(casetype = 'Surgical'){
            //surgical
            await this.page.locator('.mat-checkbox-inner-container').first().check();
        }
        else{
             //chronic
            await this.page.locator('#mat-checkbox-4>.mat-checkox-layout>.mat0checkbox-inner-container').check();
        }
        //status drop down
        await this.page.getByLabel('Status').click();
        await this.page.getByText(docstat,{exact:true}).click();
            /**
             * active
             * inactive
             */
            
        //add text button
            //section name
            //section description
            //new section content
            //expand button
        //add smart section button

        //add document(save new document)
    }
        //back arrow
    //page navigator
    //row counter
        /**
         * 15
         * 30
         * 50
         */

}