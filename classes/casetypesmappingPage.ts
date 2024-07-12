import { Page} from "@playwright/test";
import path from "path/win32";

export default class CasetypesmappingPage{

    constructor(public page: Page){}

    //variables
    public searchCaseCode;
    public casetype;

    //select case types mapping from navigation menu
    async selectCaseTypesMapping (){
        //await this.page.getByRole('link', {name: 'Case Type Mapping'}).click();
        await this.page.getByText('Case Types Mapping').last().click();
    }

    //download mappings button
    async downloadCaseTypeMappings(){
      
        const downloadPromise = this.page.waitForEvent('download');
        await this.page.getByRole('button', {name:'Download Mappings'}).click();
        const download = await downloadPromise;
        await download.saveAs('../testdata/'+ download.suggestedFilename());
    }

    //upload mappings button
    async uploadCaseTypeMappings(){
        await this.page.getByRole('button', {name: 'Upload Mappings'}).click();
        await this.page.locator("input[type=file]").setInputFiles("./caseTypeMapping.xlsx");
        await this.page.getByRole('button',{name:'Upload Mappings'}).click();
        
    }

    //search code, description (fillable field)
    async searchCode(searchCaseCode: string){
        await this.page.getByText('Search Code, Description').click();
        await this.page.getByPlaceholder('Search Code, Description').fill(searchCaseCode);
        await this.page.getByPlaceholder('Search Code, Description').press('Enter');
    }

    async hoverSearch(search){
        await this.page.getByText(search).hover();
    }

    //case type drop down  (74 items)
    async searchTypeDropDown(casetype: string){
        await this.page.getByLabel('Case Type').locator('div').nth(2).click();
        await this.page.getByRole('option',{name:casetype,exact:true}).click();
    /**Case Type Key
     * unmapped
     * exclude
     * ortho
     * cardio
     * spine
     * women's health-surgical
     * gastro intestinal
     * ent
     * neurosurgery
     * women's health- chronic
     * vascular
     * re-exploration chest
     * colectomy/bowel resection
     * gastrectomy
     * cystoprostatectomy
     * multiple surgeries
     * cerebral aneurysm
     * giant basilar aneurysm
     * hysterectomy
     * placenta accreta
     * breast reduction/reconstruction
     * flap reconstruction for pressure ulcers
     * coronary artery bypass-primary
     * coronary artery bypass-revision
     * valve replacement-primary
     * thoracic
     * chronic medical
     * urology/gu
     * general surgery
     * plastics/reconstruction
     * congestive heart failure
     * congestive heart failure-follow up
     * chronic kidney disease (ckd)
     * gyn-pregnant
     * gyn-pregnant-follow up
     * gyn-not pregnant
     * gyn-not pregnant-follow up
     * women's health chronic-other
     * chronic kidney disease (ckd)- follow up
     * chronic post bariatrics
     * chronic-other
     * total knee arthroplasty-primary
     * total knee arthroplasty-revision
     * total knee arthroplasty-bilateral
     * total hip arthroplasty-primary
     * total hip arthroplasty-revision
     * spinal fusion>2 levels
     * pelvic fracture
     * aortic arch aneurysm
     * pneumonectomy/lobectomy
     * esophagogastrectomy
     * splendectomy
     * small intestinal resection
     * any open abdominal procedure
     * cystectomy
     * nephrectomy
     * radical retropubic prostatectomy
     * whipple procedure
     * hepatic/liver resection
     * myomectomy (non-embolized)
     * valve replacement-revision
     * valve replacement with coronary artery by..
     * valve replacement with coronary artery by..
     * tavr procedure
     * chronic medical follow up
     * case type -3.1
     * case type name
     * case 18
     * abnormal diseases
     * 321
     * 123
     * casetype 1414
     * 123
     * 321
     * new sub
     * 
    */
   }
   //Select case to map
   async selectCaseToMap(searchCaseCode: string){
    await this.page.getByText(searchCaseCode).click();
    await this.page.getByText(searchCaseCode).press('Enter');
   }

   //click mapping dropdown
   async clickToMap(searchCaseCode: string, casetype: string){
    await this.page.getByText(searchCaseCode)
    await this.page.locator('#mat-select-value-115').click();
    await this.page.getByText(casetype).click();
   }

    //clear button
    async clearSelections(){
        await this.page.getByRole('button', {name: 'CLEAR'}).click({delay:1000});
    }

    async overrideMapping(casetype){
        await this.page.getByTitle('Override Mapping').first().click();
        await this.page.getByText('No override').click();
        await this.page.getByRole('option',{name:casetype}).click();
        await this.page.getByRole('button',{name:'Save Overrides'}).click();

    }
    async caseVerify(casecode){
        await this.page.getByText(casecode,{exact:true}).scrollIntoViewIfNeeded();
        await this.page.screenshot({path:'casetype.png'})
    }

    async fullPageVerify(){
        await this.page.screenshot({path:'verification.png'});
    }


    //page navigation
    async paginationCheck(){
        await this.page.getByText('›',{exact:true}).scrollIntoViewIfNeeded();
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
