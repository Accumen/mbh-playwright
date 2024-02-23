import { Page} from "@playwright/test";

export default class SmartsectionsPage{

    constructor(public page: Page){}
    
    //variables
    public smartname;
    public smartstatus;
    public smartdesc;
    public smartoption;
    public smartoptdesc;
    public smartcomment;
    public addopt;
    public editopt;

    //select smart sections from navigation menu
    async selectSmartSections(){
        await this.page.getByRole('link',{name:'Smart Sections'}).click();
    }

    //search name (fillable)
    async searchSmartSection(smartname){
        await this.page.locator('div').filter({ hasText: /^Search Name$/ }).nth(3).click();
        await this.page.getByLabel('Search Name').fill(smartname);
        /**Smart Name Key
         * Smart 1 section Test 3.1
         * RCP Follow Up Options
         * Surgical: Notification of Abnormal Labs
         * PSARR In Hospital Transfusion Liklihood Score
         * New smart Doc 12
         */
    }
    //status drop down 
    async selectSmartStatus(smartstatus){
        await this.page.getByText('Active',{exact:true}).click();
        await this.page.getByRole('option',{name:smartstatus,exact:true}).click();
        /**Smart Status Key
         * active 
         * inactive
         */
    }

    //clear button
    async clearSelections(){
        await this.page.getByRole('button',{name:'CLEAR'}).click();
    }

    //document name (clickable)
    async selectSearchResult(smartname){
        await this.page.getByText(smartname).click();
    }

    //add smart section button
    async addSmartSection(){
        await this.page.getByRole('button',{name:'Add Smart Section'}).click();
    }

    //edit/add smart section
    async editSmartSection(smartname, smartdesc, smartstatus,addopt,editopt,smartoption?,smartoptdesc?,smartcomment?){
        //smart section name (fillable)
        await this.page.getByLabel('Smart Section Name *').click();
        await this.page.getByLabel('Smart Section Name *').fill(smartname);
        //description (fillable)
        await this.page.getByLabel('Description').click()
        await this.page.getByLabel('Description').fill(smartdesc);
        //status drop down
        await this.page.getByLabel('Status *').click();
        await this.page.getByRole('option',{name:smartstatus,exact:true}).click();
            /**Smart Status Key
             * active
             * inactive
             */
        if(addopt != 'No'){
        //add option button
        await this.page.getByRole('button',{name:'Add Option'}).click();
            if(editopt != 'No'){       
            //edit button
            await this.page.getByRole('button',{name:'Edit'}).click();
                //new option name (fillable)
                await this.page.getByLabel('Smart Option Name *').click();
                await this.page.getByLabel('Smart Option Name *').fill(smartoption);
                //smart option description (fillable)
                await this.page.getByLabel('Smart Option Description').click();
                await this.page.getByLabel('Smart Option Description').fill(smartoptdesc);
                //smart option content text box (formatable)
                await this.page.getByRole('paragraph').click();
                await this.page.locator('quill-editor div').nth(2).fill(smartcomment);
                //close button
                await this.page.getByRole('button',{name:'Close'}).click();
            }
            else{ 
                //delete button
                await this.page.getByRole('button',{name:'Delete'}).click();
            }
           }
           else{
            //save smart section button
            await this.page.getByRole('button',{name:'Save Smart Section'}).click();
           }   
    }
    
        //back arrow button
        async backArrow(){
            await this.page.getByRole('button',{name:''}).click();
        }
}