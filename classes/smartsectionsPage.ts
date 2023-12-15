import { Page} from "@playwright/test";

export default class SmartsectionsPage{

    constructor(public page: Page){}
    
    //variables

    //search name (fillable)
    //status drop down 
        /**
         * active 
         * inactive
         */
    //clear button
    //document name (clickable)
        //save smart section button
        //back arrow button
        //smart section name (fillable)
        //description (fillable)
        //status drop down
            /**
             * active
             * inactive
             */
        //add option button
            //delete button
            //add sub-option button
            //edit button
                //new option name (fillable)
                //smart option description (fillable)
                //smart option content text box (formatable)
                //close button
}