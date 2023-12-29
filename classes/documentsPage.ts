import { Page} from "@playwright/test";

export default class DocumentsPage{

    constructor(public page: Page){}
    
    //variables

    //upload document button
    //add document button
    //search name (fillable)
    //drop down for status (not labeled)
        //active
        //inactive

    //clear button
    //document name (clickable)
        //preview button
        //save document button
        //back arrow button
        //document name (fillable)
        //document description (fillable)
        //document types drop down
            /**
             * patient letter
             * pcp letter
             * surgeon letter
             * assessment template
             * rcp letter
             * medication order
             * tools and references
             */
        //case types check boxes
            //surgical
            //chronic
        //status drop down
            /**
             * active
             * inactive
             */
        //change button next to document
    //page navigator
    //row counter
        /**
         * 15
         * 30
         * 50
         */

}