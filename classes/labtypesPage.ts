import { Page} from "@playwright/test";

export default class LabtypesPage{

    constructor(public page: Page){}
    
    //variables
    public labtype;
    public labtypestatus;
    public testname;
    public unitOfMeasure;
    public minValue;
    public maxValue;
    public uniqueCode;
    public gendered;
    public refMin;
    public refMax;
    public abnormalAbove;
    public abnormalBelow;
    public abovereportlabel;
    public refreportlabel;

    //select lab types from navigation menu
    async selectLabTypes(){
        await this.page.getByRole('link', {name:'Lab Types'}).click({delay:30});
    }

    //add lab type button
    async addLabType(testname: string, unitOfMeasure: string, minValue:string, maxValue: string, uniqueCode: string, gendered: string,
         refMin: string, refMax:string, abnormalAbove: string, abnormalBelow: string, abovereportlabel: string, refreportlabel: string  ){
        await this.page.getByRole('button', {name:'Add Lab Type'}).click();
        
        //Test Name (fillable)
        await this.page.getByLabel('Test Name').nth(3).click();
        await this.page.getByLabel('Test Name').fill(testname)
        //Unit of Measure (fillable)
        await this.page.getByLabel('Unit of Measure *').click();
        await this.page.getByLabel('Unit of Measure *').fill(unitOfMeasure);
        //Minimum Value (fillable)
        await this.page.getByLabel('Minimum Value *').click();
        await this.page.getByLabel('Minimum Value *').fill(minValue);
        //Maximum Value (fillable)
        await this.page.getByLabel('Maximum Value *').click();
        await this.page.getByLabel('Maximum Value *').fill(maxValue);
        //Unique Code (fillable)
        await this.page.getByLabel('Unique Code *').click();
        await this.page.getByLabel('Unique Code *').fill(uniqueCode);
        //Status (drop down) - active and inactive
        await this.page.getByLabel('Status').locator('div').nth(2).click();
        await this.page.getByText(this.labtypestatus).click();
        //Gendered(drop down) - gendered and not gendered
        await this.page.getByLabel('Gendered').locator('div').nth(2).click();
        await this.page.getByRole('option',{name:gendered, exact: true}).locator('span').click();
        /**Gendered Key
         * Gendered
         * Not Gendered
         */
        if (gendered == 'Gendered'){
       //** Male section**

       //Reference Min (fillable)

       //Reference Max (fillable)
       //Abnormal Above (fillable)
       //Above Report Label (fillable)
       //Abnormal Below (fillable)
       //Below Report Label (fillable)
       //** Female section**
       //Reference Min (fillable)
       //Reference Max (fillable)
       //Abnormal Above (fillable)
       //Above Report Label (fillable)
       //Abnormal Below (fillable)
       //Below Report Label (fillable)
        }
        else{
       //**Not Gendered Section **

       //Reference Min (fillable)
        await this.page.getByLabel('Reference Min').click();
        await this.page.getByLabel('Reference Min').fill(refMin)
       //Reference Max (fillable)
       await this.page.getByLabel('Reference Max').click();
       await this.page.getByLabel('Reference Max').fill(refMax);
       //Abnormal Above (fillable)
       await this.page.getByLabel('Abnormal Above').click();
       await this.page.getByLabel('Abnormal Above').fill(abnormalAbove);
       //Above Report Label (fillable)
       await this.page.getByLabel('Above Report Label').click();
       await this.page.getByLabel('Above Report Label').fill(abovereportlabel);
       //Abnormal Below (fillable)
       await this.page.getByLabel('Abnormal Below').click();
       await this.page.getByLabel('Abnormal Below').fill(abnormalBelow);
       //Below Report Label (fillable)
       await this.page.getByLabel('Below Report Label').click();
       await this.page.getByLabel('Below Report Label').fill(refreportlabel);
        }
    }


       //Save Lab Type Button
       async saveLabType(){
        await this.page.getByRole('button', {name: 'Save Lab Type'}).click();
       }

       //Back Arrow
       async labTypeBackArrow(){
        await this.page.getByRole('button', {name:''}).click();
       }

       //Search Lab Type (fillable)
       async searchLabType(labtype: string){
        await this.page.getByLabel('Search Lab Type').click();
        await this.page.getByLabel('Search Lab Type').fill(labtype);
       }
       
       //search (drop down)
       async searchStatus(labtypestatus: string){ 
        await this.page.getByLabel('Active').locator('div').nth(3).click();
        await this.page.getByRole('option', {name: labtypestatus}).locator('span').click();
        /**drop down key
         * Active
         * Inactive
         */
       }

        //Clear Selections button
        async clearLabTypesSelection(){
            await this.page.getByRole('button',{name:'CLEAR'}).click();
        }

        //Lab Type List (clickable)
        async clickLabTypeList(labtype: string){
            await this.page.getByRole('option', {name:labtype}).click();
        /**Lab Type Key
         * WBC
         * RBC
         * Hgb
         * Hct
         * MCV
         * MCH
         * PLT
         * Retic
         * Creatinine
         * GFR
         * Iron Binding Capacity
         * TSAT
         * Ferritin
         * B 12
         * Labtype Test -3.1
         * Hgb1
         * qas
         * hyperia
         * Testing 12231
         * Double sugar
         * Lab 112154
         */
        }




}