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
    async searchEmailTemplate(templateName: string){
        await this.page.getByText('Search email template').click();
        await this.page.getByText('Search email template').fill(templateName);
        await this.page.getByText('Search email template').press('Enter');
    }

    //email template name (clickable)
    async selectEmailtemplate(templateName){
        await this.page.getByRole('link',{name:templateName,exact:false}).click();
    }
    //edit email template
    async editTemplate(templateName,templateType,userFullname: string,visitUrl: string,visitDocuments: string,comment: string){
        //template name (fillable)
        await this.page.getByPlaceholder('Template Name').click();
        await this.page.getByPlaceholder('Template Name').fill(templateName);
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
        await this.page.getByRole('button',{name:'Back'}).click();
    } 
    
    //reset template
    async resetTemplate(){
        this.page.on('dialog',dialog => dialog.accept());
        //await this.page.getbyTitle('Sync').click(); Button currently has no label to be able to be pulled.
    }

    async emailTemplateScreenshot(num){
        await this.page.screenshot({path:'emailtemplatescreenshot'+ num +'.png',fullPage:true});
    }

    //pagination
    async emailTemplatePagination(num){
        await this.page.getByText('›',{exact:true}).scrollIntoViewIfNeeded();
        await this.page.getByRole('link', { name: num }).click({delay:1000});
    }
    //check current page of pagination
    async paginationCheck(){
        await this.page.getByText('›',{exact:true}).scrollIntoViewIfNeeded();
    }

}