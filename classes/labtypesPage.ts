import {expect, Page} from "@playwright/test";

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
    public mRefMin;
    public fRefMin;
    public refMax;
    public mRefMax;
    public fRefMax;
    public abnormalAbove;
    public mAbnormalAbove;
    public fAbnormalAbove;
    public abnormalBelow;
    public mAbnormalBelow;
    public fAbnormalBelow;
    public abovereportlabel;
    public mAboveReportLabel;
    public fAboveReportLabel;
    public belowReportLabel;
    public mBelowReportLabel;
    public fBelowReportLabel;
    public refreportlabel;

    //select lab types from navigation menu
    async selectLabTypes(){
        await this.page.getByRole('link', {name:'Lab Types'}).first().click({delay:30});
    }
    
    //add lab type button
    async addLabType(testname: string, unitOfMeasure: string, minValue:string, maxValue: string, uniqueCode: string, labtypestatus: string, gendered: string,
         refMin, refMax, abnormalAbove: string, abnormalBelow: string, abovereportlabel: string, refreportlabel: string, mRefMin?,mRefMax?,
         mAbnormalAbove?,mAboveReportLabel?,mAbnormalBelow?,mBelowReportLabel?, fRefMin?,fRefMax?, fAbnormalAbove?, fAboveReportLabel?, fAbnormalBelow?, fBelowReportLabel?){
        await this.page.getByRole('button', {name:'Add Lab Type'}).click();
        
        //Test Name (fillable)
        await this.page.getByPlaceholder('Test Name').click();
        await this.page.getByPlaceholder('Test Name').fill(testname)//testtype
        //Unit of Measure (fillable)
        await this.page.getByText('Unit of Measure').click();
        await this.page.getByText('Unit of Measure').fill(unitOfMeasure);//x10(9)/L
        //Minimum Value (fillable)
        await this.page.getByText('Minimum Value').click();
        await this.page.getByText('Minimum Value').fill(minValue);//1
        //Maximum Value (fillable)
        await this.page.getByText('Maximum Value').click();
        await this.page.getByText('Maximum Value').fill(maxValue);//125
        //Unique Code (fillable)
        await this.page.getByText('Unique Code').click();
        await this.page.getByText('Unique Code').fill(uniqueCode);//tstp
        //Status (drop down) - active and inactive
        await this.page.getByLabel('Status').locator('div').nth(2).click();
        await this.page.getByRole('option',{name:labtypestatus,exact: true}).click();//active
        //Gendered(drop down) - gendered and not gendered
        await this.page.getByLabel('Gendered').locator('div').nth(2).click();
        await this.page.getByRole('option',{name:gendered, exact: true}).locator('span').click();//gendered
        /**Gendered Key
         * Gendered
         * Not Gendered
         */
        if (gendered == 'Gendered'){
       //** Male section**
       //Reference Min (fillable)
            //await this.page.locator('#mat-input-6').click();
            await this.page.locator('#mat-input-6').fill(mRefMin);//4.00
       //Reference Max (fillable)
            //await this.page.locator('#mat-input-7').click();
            await this.page.locator('#mat-input-7').fill(mRefMax);//11.00
       //Abnormal Above (fillable)
            //await this.page.locator('#mat-input-8').click();
            await this.page.locator('#mat-input-8').fill(mAbnormalAbove);//11.25
       //Above Report Label (fillable)
            //await this.page.locator('#mat-input-9').click();
            await this.page.locator('#mat-input-9').fill(mAboveReportLabel);//2.50
       //Abnormal Below (fillable)
            //await this.page.locator('#mat-input-10').click();
            await this.page.locator('#mat-input-10').fill(mAbnormalBelow);
       //Below Report Label (fillable)
            //await this.page.locator('#mat-input-11').click();
            await this.page.locator('#mat-input-11').fill(mBelowReportLabel);

       //** Female section**
       //Reference Min (fillable)
            //await this.page.locator('#mat-input-12').click();
            await this.page.locator('#mat-input-12').fill(fRefMin);
       //Reference Max (fillable)
            //await this.page.locator('#mat-input-13').click();
            await this.page.locator('#mat-input-13').fill(fRefMax);
       //Abnormal Above (fillable)
            //await this.page.locator('#mat-input-14').click();
            await this.page.locator('#mat-input-14').fill(fAbnormalAbove);
       //Above Report Label (fillable)
            //await this.page.locator('#mat-input-15').click();
            await this.page.locator('#mat-input-15').fill(fAboveReportLabel);
       //Abnormal Below (fillable)
            //await this.page.locator('#mat-input-16').click();
            await this.page.locator('#mat-input-16').fill(fAbnormalBelow);
       //Below Report Label (fillable)
            //await this.page.locator('#mat-input-17').click();
            await this.page.locator('#mat-input-17').fill(fBelowReportLabel);
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
     async saveNewLabType(){
          await this.page.getByRole('button', {name: 'Save Lab Type'}).click();
          await expect(this.page.locator('id=toast-container',{hasText:'Lab type Created successfully'})).toBeInViewport();
         }

       //Save Lab Type Button
       async saveLabType(){
          await this.page.getByRole('button', {name: 'Save Lab Type'}).click();
          await expect (this.page.locator('id=toast-container',{hasText:'Lab type updated successfully'})).toBeInViewport();
         }

       //Back Arrow
       async labTypeBackArrow(){
        await this.page.getByRole('button', {name:'Back'}).click();
       }

       //Search Lab Type (fillable)
       async searchLabType(labtype: string){
        await this.page.getByText('Search Lab Type').click();
        await this.page.getByText('Search Lab Type').fill(labtype);
        await this.page.getByText('Search Lab Type').press('Enter');
       }
       
       //search (drop down)
       async searchStatus(labtypestatus: string){ 
        await this.page.getByLabel('Active').locator('div').nth(3).click();
        await this.page.getByRole('option', {name: labtypestatus, exact: true}).locator('span').click(); 
        /**drop down key
         * Active
         * Inactive
         */
       }
       async selectLabType(labtype){
          await this.page.getByText(labtype,{exact:true}).click();
       }

       //delete lab type
       async deleteLabType(){
          this.page.on('dialog',dialog => dialog.accept());
          await this.page.getByTitle('Delete').click();
          await expect(this.page.locator('id=toast-container',{hasText:'Lab Type was deleted successfully'})).toBeInViewport();
       }

        //Clear Selections button
        async clearLabTypesSelection(){
            await this.page.getByRole('button',{name:'CLEAR'}).click();
        }

        //Lab Type List (clickable)
        async clickLabTypeList(labtype: string){
            await this.page.getByRole('cell', {name:labtype}).click();
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
      
     async editLabTypeName(testname: string){
          await this.page.getByLabel('Test Name *').click();
          await this.page.getByLabel('Test Name *').fill(testname);
     }

     async editLabTypeUoM(unitOfMeasure: string){
          await this.page.getByLabel('Unit of Measure *').click();
          await this.page.getByLabel('Unit of Measure *').fill(unitOfMeasure);
     }

     async editLabTypeMinValue(minValue: string){
          await this.page.getByLabel('Minimum Value *').click();
          await this.page.getByLabel('Minimum Value *').fill(minValue);
     }

     async editLabTypeMaxValue(maxValue: string){
          await this.page.getByLabel('Maximum Value *').click();
          await this.page.getByLabel('Maximum Value *').fill(maxValue);
     }

     async editLabTypeUniqueCode(uniqueCode: string){
          await this.page.getByLabel('Unique Code *').click();
          await this.page.getByLabel('Unique Code *').fill(uniqueCode);
     }

     async editLabTypeStatus(labtypestatus: string){
          await this.page.getByLabel('Status').locator('div').nth(2).click();
          await this.page.getByText(labtypestatus).click();
     }

     async editLabTypeGendered(gendered: string){
          await this.page.getByLabel('Gendered').locator('div').nth(2).click();
          await this.page.getByRole('option',{name:gendered, exact: true}).locator('span').click();
        /**Gendered Key
         * Gendered
         * Not Gendered
         */
     }

     async editMrefMin(mRefMin:string){
          await this.page.locator('#mat-input-6').click();
          await this.page.locator('#mat-input-6').fill(mRefMin);
     }

     async editMrefMax(mRefMax: string){
          await this.page.locator('#mat-input-7').click();
          await this.page.locator('#mat-input-6').fill(mRefMax);
     }

     async editmAbnomalAbove(mAbnormalAbove:string){
          await this.page.locator('#mat-input-8').click();
          await this.page.locator('#mat-input-8').fill(mAbnormalAbove);
     }

     async editmAbnormalAboveLabel(mAboveReportLabel:string){
          await this.page.locator('#mat-input-9').click();
          await this.page.locator('#mat-input-9').fill(mAboveReportLabel);
     }

     async editmAbnormalBelow(mAbnormalBelow:string){
          await this.page.locator('#mat-input-10').click();
          await this.page.locator('#mat-input-10').fill(mAbnormalBelow);
     }

     async editmAbnormalBelowLabel(mBelowReportLabel: string){
          await this.page.locator('#mat-input-11').click();
          await this.page.locator('#mat-input-11').fill(mBelowReportLabel);
     }

     async editfRefMin(fRefMin:string){
          await this.page.locator('#mat-input-12').click();
          await this.page.locator('#mat-input-12').fill(fRefMin);
     }

     async editfRefMax(fRefMax:string){
          await this.page.locator('#mat-input-13').click();
          await this.page.locator('#mat-input-13').fill(fRefMax);
     }

     async editfAbnormalAbove(fAbnormalAbove:string){
          await this.page.locator('#mat-input-14').click();
          await this.page.locator('#mat-input-14').fill(fAbnormalAbove);
     }

     async editfAbnormalAboveLabel(fAboveReportLabel:string){
          await this.page.locator('#mat-input-15').click();
          await this.page.locator('#mat-input-15').fill(fAboveReportLabel);
     }

     async editfAbnormalBelow(fAbnormalBelow:string){
          await this.page.locator('#mat-input-16').click();
          await this.page.locator('#mat-input-16').fill(fAbnormalBelow); 
     }

     async editfAbnormalBelowLabel(fBelowReportLabel:string){
          await this.page.locator('#mat-input-17').click();
          await this.page.locator('#mat-input-17').fill(fBelowReportLabel);
     }

     async editRefMin(refMin:string){
          await this.page.getByLabel('Reference Min').click();
          await this.page.getByLabel('Reference Min').fill(refMin);
     }

     async editRefMax(refMax:string){
          await this.page.getByLabel('Reference Max').click();
          await this.page.getByLabel('Reference Max').fill(refMax);
     }

     async editAbnormalAbove(abnormalAbove:string){
          await this.page.getByLabel('Abnormal Above').click();
          await this.page.getByLabel('Abnormal Above').fill(abnormalAbove);
     }

     async editAbnormalAboveLabel(abovereportlabel:string){
          await this.page.getByLabel('Above Report Label').click();
          await this.page.getByLabel('Above Report Label').fill(abovereportlabel);
     }

     async editAbnormalBelow(abnormalBelow:string){
          await this.page.getByLabel('Abnormal Below').click();
          await this.page.getByLabel('Abnormal Below').fill(abnormalBelow);
     }

     async editAbnormalBelowLabel(belowReportLabel:string){
          await this.page.getByLabel('Below Report Label').click();
          await this.page.getByLabel('Below Report Label').fill(belowReportLabel);
     }
     //pagination
     async labTypePagination(num){
          await this.page.getByText('›',{exact:true}).scrollIntoViewIfNeeded();
          await this.page.getByRole('link', { name: num }).click({delay:1000});
      }
      //check current page of pagination
      async paginationCheck(){
          await this.page.getByText('›',{exact:true}).scrollIntoViewIfNeeded();
      }

          // adjust number of rows visible on screen
    async adjustRowCount(row: string){
     await this.page.getByLabel('15').locator('div').nth(2).click();//clicks the drop down for the row count
     /**Row Key
      * 15 (default)
      * 30
      * 50
      */
     await this.page.getByText(row,{exact:true}).click();//selects the row count in the []
     
 }
 //hide from ui (mbh admin)
 async hideFromUI(){
     await this.page.getByLabel('Hide from UI').check();
 }

 //sync lab type
 async syncLabType(){
     await this.page.getByTitle('Sync').click();
     await expect(this.page.locator('id=toast-container',{hasText:'Lab type successfully updated'})).toBeInViewport();
 }

}