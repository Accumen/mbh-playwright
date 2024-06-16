import { Page} from "@playwright/test";

export default class LabtypesmappingPage{

    constructor(public page: Page){}
    
    //variables
    public labtype;
    public labcode;
    public mappingfilename;

    //select lab types mapping from navigation
    async selectLabTypesMapping(){
        await this.page.getByRole('link', {name:'Lab Types Mapping'}).click({delay:90});
    }

    //search Lab Code (fillable)
    async searchLabCode(labcode:string){
        await this.page.getByLabel('Search Code, Description').click();
        await this.page.getByLabel('Search Code, Description').fill(labcode);
        await this.page.getByLabel('Search Code, Description').press('Enter')
    }
    //search Lab Type (drop down)
    async searchLabTypeDropDown(labtype: string){
        await this.page.getByLabel('Lab Type').locator('div').nth(2).click();
        await this.page.getByRole('option', {name: labtype}).click();
    /**Lab Type Key
     * 
    *UNMAPPED
    *EXCLUDE
    *WBC
    *RBC
    *Hgb
    *Hct
    *MCV
    *MCH
    *PLT
    *Retic
    *Creatinine
    *GFR
    *Iron Binding Capacity
    *TSAT
    *Ferritin
    *B 12
    *Labtype Test -3.1
    *Hgb1
    *qas
    *hyperia
    *Testing 12231
    *Double sugar
    *Lab 112154
    *asd
     */
    } 

    //click to map
    async clickToMap(labcode: string, labtype:string){
        await this.page.getByText(labcode)
        await this.page.locator('#mat-select-14 div').nth(3).click({delay:1000});
        await this.page.getByText(labtype,{exact:true}).first().click();
    
    }
    //clear button
    async clearSelections(){
        await this.page.getByRole('button', {name:'CLEAR'}).click({delay:1000});
    }

    //download mappings button
    async downloadLabTypeMappings(){
        const downloadPromise = this.page.waitForEvent('download');
        await this.page.getByRole('button', {name: 'Download Mappings'}).click();
        const download = await downloadPromise;
        await download.saveAs('../testdata/'+ download.suggestedFilename());
    }

    //upload mappings button
    async uploadLabTypeMappings(){
        await this.page.getByRole('button', {name:'Upload Mappings'}).click();
        await this.page.locator("input[type=file]").setInputFiles("./labTypeMapping_1234567.xlsx");
        await this.page.getByRole('button',{name:'Upload Mappings'}).click();
    }

    //page navigation
    async paginationCheck(){
        await this.page.getByText('›',{exact:true}).scrollIntoViewIfNeeded();
    }
}
