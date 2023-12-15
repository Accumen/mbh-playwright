import {test, expect} from "@playwright/test"
import LoginPage from "./classes/loginPage"// connects the login class to the test
import DashboardPage from "./classes/dashboardPage"//  connects the dashboard class to the test
import DocumentsPage from "./classes/documentsPage"// connects the documents class to the test
import WorklistPage from "./classes/worklistPage" // connect the worklist class to the test
import FacilitiesPage from "./classes/facilitiesPage" // connect the facilities class to the test
import CasetypesPage from "./classes/casetypesPage" // connect the case types class to the test
import CasetypesmappingPage from "./classes/casetypesmappingPage"

const email = ["mperez@accumen.com", "thisemail@gmail.com", "onetwothree@gmail.com"]
const password = ["ThisShit2023!", "MostlyBs2020!", "Whoseon1st!"]


test("Sample test", async({page})=>{
    test.slow();//changes default timeout from 30000 ms to 90000 ms
    const login = new LoginPage (page)
     await page.goto('https://qa.mybloodhealth.com/login')//will need to get this into a baseURL call
     //next two lines call to the array for email and password.  make sure the [#] matches for both unless intentionally setting login to fail.
     await login.enterEmail(email[0])//email needs moved into the login class
     await login.enterPassword(password[0])//password needs moved into the login class
     await login.clickLoginBtn()
//  Uncomment this to run tests within the dashboard page
     const dashboard = new DashboardPage (page)
     await dashboard.clickClientDropDown("QA Testing");
     //8await dashboard.unselectAllFacility();
     //8await dashboard.clickFacility("QA Facility 2");
     //8await dashboard.unselectAllCaseTypes();
     //8await dashboard.clickCaseType("CARDIO");
     //8await dashboard.clickDateRange("Last 3 Months");//**customize needs work
     //await dashboard.excelDownload();// currenlty choking on the locator needs work.
     //await dashboard.pdfDownload();//also choking on the locator needs work.
     //8await dashboard.navigationMenu("Documents")//"Clients" will fail unless client drop down is an admin "MBH"
     //8await dashboard.clickLogout();

// Uncomment this to run tests within the worklist page
    //8const worklist = new WorklistPage (page)
     //8await worklist.clickChronic();
     //8await worklist.searchMRN('Scutts');
     //8await worklist.unselectAllCaseTypes();
     //8await worklist.selectCaseType("CHRONIC MEDICAL");// this function needs work as it is unable to exit the drop down menu only on the surgical worklist
     //8await worklist.selectStatus("Completed");
     //8await worklist.selectSortBy("Anemic");
     //8await worklist.clearSelections();
     //8await worklist.adjustRowCount("30");
     //8await worklist.clearExpiredVisits();
     //await worklist.exportVisits();//this function needs work to wait for the download to finish
     //await worklist.scheduleVisit();//this function works but needs additional features to deal with the patient schedule screen that pops up
     //8await dashboard.clickLogout();
     
     //8const facilities = new FacilitiesPage(page);
     //8await facilities.selectFacilityMenu();
     //8await facilities.facilitySearch('QA Facility 1');
     //8await facilities.selectStatus('Inactive');// active selection is not a unique identifier
     //8await facilities.clearSelections();
     //8await facilities.addFacility('Test Facility', 'TF1', '7635','124 Douglas Ave','West Bank',
      //8'NM', '56897', '555-555-5555','255-555-5565','Hospital System', 'Inactive');
     //8await facilities.addLocation();
     //8await facilities.newLocation('LocationTest', 'others','Inactive');
     //8await facilities.saveFacility();
     //8await dashboard.clickLogout();
     const casetypes = new CasetypesPage(page);
     await casetypes.selectCaseTypeMenu();
     //8await casetypes.searchCaseType("ORTHO");
     //await casetypes.statusDropDown("Active");
     //8await casetypes.clearSelections();
     //8await casetypes.selectCaseTypeName("ORTHO");
     //8await casetypes.editCaseTypeName("1234");
     //8await casetypes.editBloodLoss("2ML/hr");
     //8await casetypes.editDescription("1234 is a test case");
     //8await casetypes.editWorklistType("Surgical");
     //8await casetypes.editParentCaseType("CARDIO");
     //8await casetypes.editStatusDropDown("Inactive")
     //8await casetypes.backArrow();
     //8await casetypes.saveCaseType();
     //8await casetypes.clickAddCaseType();
     //8await casetypes.newCaseType("TestType","1mg/hr", "Testing the new case type function", "Chronic", "321", "Active");
     //8await casetypes.backArrow();
     //8await dashboard.clickLogout();
     
     const casetypesmapping = new CasetypesmappingPage(page);
     await casetypesmapping.selectCaseTypesMapping();
     await casetypesmapping.searchCode('28');
     await casetypesmapping.searchTypeDropDown('ORTHO');
     //8await casetypesmapping.clearSelections();
     //await casetypesmapping.clickToMap('ORTHO');
     await dashboard.clickLogout();


     
})