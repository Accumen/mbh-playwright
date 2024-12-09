import { expect,Page} from "@playwright/test";

export default class LabtypesmappingPage{

    constructor(public page: Page){}
    
    //variables
    public labtype;
    public labtype2;
    public labcode;
    public mappingfilename;

    //select lab types mapping from navigation
    async selectLabTypesMapping(){
        await this.page.getByRole('link', {name:'Lab Types Mapping'}).click({delay:90});
    }

    //search Lab Code (fillable)
    async searchLabCode(labcode:string){
        await this.page.getByText('Search Code, Description').click();
        await this.page.getByText('Search Code, Description').fill(labcode);
        await this.page.getByText('Search Code, Description').press('Enter');
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
    async clickToMap(labcode, labtype: string, labtype2:string){
        await this.page.getByText(labcode).hover();
        await this.page.getByText(labtype, {exact:true}).click();
        await this.page.getByText(labtype2, {exact:true}).click();
        await expect(this.page.locator('id=toast-container',{hasText:'Lab Type mapping successfully updated'})).toBeInViewport();
    
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
        await download.saveAs('./testdata/xlsx files/'+ download.suggestedFilename());
    }

    //upload mappings button
    async uploadLabTypeMappings(){
        await this.page.getByRole('button', {name:'Upload Mappings'}).click();
        await this.page.locator("input[type=file]").setInputFiles("./testdata/xlsx files/LabTypeMapping_1717071520581.xlsx");
        await this.page.getByRole('button',{name:'Upload Mappings'}).click();
        await expect(this.page.locator('id=toast-container',{hasText:'Mappings uploaded successfully'})).toBeInViewport();
    }

    //page navigation
    async paginationCheck(){
        await this.page.getByText('›',{exact:true}).scrollIntoViewIfNeeded();
    }
    async labTypesMappingScreenshot(num){
        await this.page.screenshot({path:'labtypesmappingscreenshot'+ num +'.png',fullPage:true});
    }
    // adjust number of rows visible on screen
    async adjustRowCount(row: string){
        await this.page.getByLabel('50').locator('div').nth(2).scrollIntoViewIfNeeded();
        await this.page.getByLabel('50').locator('div').nth(2).click();//clicks the drop down for the row count
            /**Row Key
             * 15 (default)
             * 30
             * 50
             */
        await this.page.getByText(row,{exact:true}).click();//selects the row count in the []
    }
}