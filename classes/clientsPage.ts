import { Page} from "@playwright/test";

export default class ClientsPage{

    constructor(public page: Page){}
    //this page is really for Accumen and not used by outside clients at this time.  Will complete build in the future if necessary.

        //delete client
        async deleteclient(){
            await this.page.getByRole('link', { name: ' Clients' }).click();
            await this.page.once('dialog',dialog => dialog.accept());
            await this.page.getByTitle('Delete').last().click();
        }  

        //delay screenshot
        async delayscreenshot(){
            await this.page.screenshot({timeout: 10000})
        }
}
