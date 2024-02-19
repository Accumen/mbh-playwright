import { Page} from "@playwright/test";

export default class EmailtemplatesPage{

    constructor(public page: Page){}

    //variables
    public templateName;
    public userFullname;
    public visitUrl;
    public comment;
    public visitDocuments;
    public templateType;

    //select email template from side navigation menu
    async clickEmailTemplate(){
        await this.page.getByRole('link',{name:'Email Templates'}).click();
    }

    //search email template (fillable)
    async searchEmailTemplate(templateName){
        await this.page.getByLabel('Search email template').click();
        await this.page.getByLabel('Search email template').fill(templateName);
        await this.page.getByLabel('Search email template').press('Enter');
    }

    //email template name (clickable)
    async selectEmailtemplate(templateName){
        await this.page.getByRole('link',{name:templateName,exact:false}).click();
    }
    //edit email template
    async editTemplate(templateName,templateType,userFullname?,visitUrl?,visitDocuments?,comment?){
        //template name (fillable)
        await this.page.getByLabel('Template Name *').click();
        await this.page.getByLabel('Template Name *').fill(templateName);
        //text box for creation (fillable w/ formatting)
        if(templateType != 'Visit Doc'){
            await this.page.getByText('[user.fullname]').click();
            await this.page.getByText('[user.fullname]').fill(userFullname);
            await this.page.getByText('[visit.url]').click();
            await this.page.getByText('[visit.url]').fill(visitUrl);
        }
        else{
            await this.page.getByText('[user.fullname]').click();
            await this.page.getByText('[user.fullname]').fill(userFullname);
            await this.page.getByText('[comment]').click();
            await this.page.getByText('[comment]').fill(comment);
            await this.page.getByText('[visit.url]').click();
            await this.page.getByText('[visit.url]').fill(visitUrl);
            await this.page.getByText('[visit.documents]').click();
            await this.page.getByText('[visit.documents]').fill(visitDocuments);
        }
    }
        //save template button
    async saveTemplate(){
        await this.page.getByRole('button',{name:'Save Template'}).click();
    }    
        //back arrow button
    async backArrow(){
        await this.page.getByRole('button',{name:''}).click();
    }    

    //row counter
        /**
         * 15
         * 30
         * 50
         */
    

}