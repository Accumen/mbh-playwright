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
        await this.page.locator('div').filter({hasText: 'Search Code, Description'}).nth(3).click();
        await this.page.getByLabel('Search Code, Description').fill(labcode);
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
        await this.page.locator('#mat-select-116').click();
        await this.page.getByRole('option',{name:labtype}).locator('span').click();
    
    }
    //clear button
    async clearSelections(){
        await this.page.getByRole('button', {name:'CLEAR'}).click();
    }

    //download mappings button
    async downloadLabTypeMappings(){
        const downloadPromise = this.page.waitForEvent('download');
        await this.page.getByRole('button', {name: 'Download Mappings'}).click();
        const download = await downloadPromise;
    }

    //upload mappings button
    async uploadLabTypeMappings(mappingfilename:string){
        await this.page.getByRole('button', {name:'Upload Mappings'}).click();
        await this.page.getByRole('textbox').click();
        await this.page.getByRole('textbox').fill(mappingfilename);
        await this.page.getByRole('button', {name:'open'}).click();
    }

}