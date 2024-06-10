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
    public addsection;
    public secname;
    public secdesc;
    public seccontent;
    public addsmartsec;
    public smartdoctype;
    

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
        await this.page.getByLabel('Search name').press('Enter');
    }
    //drop down for status (not labeled)
    async docStatusdropdown(docstat){
        await this.page.getByLabel('Active').locator('div').nth(2).click();
        //await this.page.getByText(docstat,{exact:true}).click()
        await this.page.getByRole('option',{name:docstat,exact:true}).locator('span').click();
        /**docstat key
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
        await this.page.getByText(docname,{exact:true}).click();
    }
     //preview button
     async previewdoc(){
        await this.page.getByRole('button',{name:'Preview'}).click();
     }
    //save document button
    async saveDoc(){
        await this.page.getByRole('button',{name:'Save Document'}).click();
    }
    //fillable fields for adding or editing a document
    async addEditDoc(docname,desc,doctype,casetype,docstat){
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
        if(casetype != 'Non-Surgical'){
            //surgical
            await this.page.locator('.mat-checkbox-inner-container').first().check();
        }
        else{
             //chronic
            //await this.page.locator('id=mat-checkbox-14').getByText('Non-Surgical').check();
            await this.page.locator('.mat-checkbox-inner-container').nth(1).check();
        }
        //status drop down
        await this.page.getByLabel('Status').click();
        await this.page.getByText(docstat,{exact:true}).click();
            /**docstat key
             * active
             * inactive
             */
    }

    //add text section in add document
    async addTextSection(secname,secdesc,seccontent){
            //add text button
            await this.page.getByRole('button',{name:'Text Section'}).click();
                //section name
            await this.page.getByLabel('Section Name *',{exact:true}).last().click()
            await this.page.getByLabel('Section Name *',{exact:true}).last().fill(secname);
                //section description
            await this.page.getByLabel('Description',{exact:true}).last().click();
            await this.page.getByLabel('Description',{exact:true}).last().fill(secdesc);
                //new section content
            await this.page.getByText('New Section Content',{exact:true}).click();
            await this.page.getByText('New Section Content',{exact:true}).fill(seccontent);
    }

    //add smart section in new document
    async addSmartSection(smartdoctype){
      //add smart section button
      await this.page.getByRole('button',{name:'Smart Section'}).click()
      await this.page.getByLabel('Choose Document Section').locator('span').click();
      await this.page.getByText(smartdoctype,{exact:true}).click();
      /** Smart Document Type Key
        * Smart 1section Test 3.1
        * RCP Follow Up Options
        * Surgical: Notification of Abnormal Labs
        * PSARR In Hospital Transfusion Liklihood Score
        * New smart Doc 12
        * PSARR Restrictive Transfusion Strategy
        * Chronic Patient Initial Letter-Body Options
        * Surgical: Patient Letter: Labs Body Options
        * Medication Order - Title- INFED
        * Anemia Management: Perisurgical Chronic vs Surgical
        * Medication Order - Provider Signature
        * 1212
        * PCP Abnormal Letter options
        * Chronic Patient Letter-Follow Up Options
        * Medication Order -Iron Monitoring
        * PSARR Post-Operative Strategies
        * Chronic Patient Demo/Intro
        * Testing 1412
        * Surgical Abnormal Letter
        * Feraheme Surgical/Chronic
        * PSARR Pre-Hospital Smart Section
        * PSARR Interoperative Strategies
        * PSARR Treatments
        * TREATMENT ORDERS: ESA- ERYTHROPOIETIN
        * TREATMENT ORDERS: ESA- ARANESP (ALBUMIN FREE)
        * What is PCP in medical report?
        * Medication
        */    
    }

    //add smart section add document button
    async addSmartSecDocBtn(){
           //add document button
       await this.page.getByRole('button',{name:'Add Document'}).click();
    }

    async smartSecInfo(smartsecname,smartsecdesc){
            //section name
            await this.page.getByLabel('Section Name *').click()
            await this.page.getByLabel('Section Name *').fill(smartsecname);
                //section description
            await this.page.getByLabel('Description',{exact:true}).click();
            await this.page.getByLabel('Description',{exact:true}).fill(smartsecdesc);
    }

    //screenshot for documents page
    async verifyDoc(){
        await this.page.screenshot({path:'verifyDocument.png'});
    }

      //fillable fields for adding or editing a document
      async newStaticDoc(docname,desc,doctype,casetype,docstat){
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
        if(casetype != 'Non-Surgical'){
            //surgical
            await this.page.locator('.mat-checkbox-inner-container').first().check();
        }
        else{
             //chronic
            await this.page.locator('id=mat-checkbox-4').getByText('Non-Surgical').check();
        }
        //status drop down
        await this.page.getByLabel('Status').click();
        await this.page.getByText(docstat,{exact:true}).click();
            /**docstat key
             * active
             * inactive
            */
        //upload 
        await this.page.getByRole('button',{name:'Upload'}).click();
        await this.page.locator("input[type=file]").setInputFiles("./testdocumentupload.pdf");
        }
        
        //back arrow
        async backArrow(){
            await this.page.getByRole('button',{name:''}).click();
        }

      //delete
      async delete(){
        this.page.on('dialog',dialog => dialog.accept());
        await this.page.getByTitle('Delete').click();
    }
    //page navigator
    //row counter
        /**
         * 15
         * 30
         * 50
         */

}