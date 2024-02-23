import {test, expect} from "@playwright/test"
import LoginPage from "./classes/loginPage"// connects the login class to the test
import DashboardPage from "./classes/dashboardPage"//  connects the dashboard class to the test
import DocumentsPage from "./classes/documentsPage"// connects the documents class to the test
import WorklistPage from "./classes/worklistPage" // connect the worklist class to the test
import FacilitiesPage from "./classes/facilitiesPage" // connect the facilities class to the test
import CasetypesPage from "./classes/casetypesPage" // connect the case types class to the test
import CasetypesmappingPage from "./classes/casetypesmappingPage"//connect the case types mapping class to the test
import LabtypesPage from "./classes/labtypesPage" //connects the lab types class to the test
import LabtypesmappingPage from "./classes/labtypesmappingPage" // connect the lab types mapping class to the test
import ProvidersPage from "./classes/providersPage"// connect the providers class to the test
import PatientsPage from "./classes/patientsPage" //connect the patients class to the test
import EmailtemplatesPage from "./classes/emailtemplatesPage"
import SmartsectionsPage from "./classes/smartsectionsPage"

test("Sample test", async({page})=>{
    test.slow();//changes default timeout from 30000 ms to 90000 ms
    const login = new LoginPage (page)
     await page.goto('https://qa.mybloodhealth.com/login')//will need to get this into a baseURL call
     //next two lines call to the array for email and password.  make sure the [#] matches for both unless intentionally setting login to fail.
     await login.enterEmail('cts-secure@accumen.com')//email needs moved into the login class
     await login.enterPassword('Iu$24680')//password needs moved into the login class
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
     //8await worklist.clickSurgical();
     //8await worklist.searchMRN('Scutts');
     //8await worklist.unselectAllCaseTypes();
     //8await worklist.selectCaseType("CHRONIC MEDICAL");// this function needs work as it is unable to exit the drop down menu only on the surgical worklist
     //8await worklist.selectStatus("Completed");
     //8await worklist.selectSortBy("Anemic");
     //8await worklist.clearSelections();
     //8await worklist.adjustRowCount("30");
     //8await worklist.clearExpiredVisits();
     //await worklist.exportVisits();//this function needs work to wait for the download to finish
     //await worklist.scheduleChronicVisit('New', 'Fred', 'R', 'Flinstone', 'email@gmail.com', '12655473','1992','MARCH','15',
     //'8159152544','5674 True St','City','TX','76543', 'Male', 'yes','January 31', 'FEB', '22', 2,
     //'CHRONIC MEDICAL', 'Surgeon');//this function works but needs additional features to deal with the patient schedule screen that pops up
     //await worklist.backBtnSchVisitScreen();
     //await worklist.saveScheduledVisit();
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
    //8 const casetypes = new CasetypesPage(page);
     //8await casetypes.selectCaseTypeMenu();
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
     
     //8const casetypesmapping = new CasetypesmappingPage(page);
     //8await casetypesmapping.selectCaseTypesMapping();
     //8await casetypesmapping.searchCode('28');
     //8await casetypesmapping.searchTypeDropDown('ORTHO');
     //8await casetypesmapping.clearSelections();
     //8await casetypesmapping.clickToMap('2838','ORTHO');
    //8await dashboard.clickLogout();

    //8const labtypes = new LabtypesPage(page);
    //8await labtypes.selectLabTypes(); 
    //8await labtypes.searchLabType('Hct');
    //8await labtypes.searchStatus('Active');
    //8await labtypes.clearLabTypesSelection();
    //8await labtypes.clickLabTypeList('Hct');
    //8await labtypes.editLabTypeName('Hct2');
    //8await labtypes.editLabTypeUoM('#');
    //8await labtypes.editLabTypeMinValue('11.00');
    //8await labtypes.editLabTypeMaxValue('61.00');
    //8await labtypes.editLabTypeUoM('Hct');
    //8await labtypes.editLabTypeStatus('INACTIVE');
    //8await labtypes.editMrefMin('39.00');
    //8await labtypes.editMrefMax('54.00');
    //8await labtypes.editmAbnomalAbove('54.10');
    //8await labtypes.editmAbnormalAboveLabel('Above this');
    //8await labtypes.editmAbnormalBelow('38.99');
    //8await labtypes.editmAbnormalBelowLabel('Below this');
    //8await labtypes.editfRefMin('34.00');
    //8await labtypes.editfRefMax('48.00');
    //8await labtypes.editfAbnormalAbove('48.10');
    //8await labtypes.editfAbnormalAboveLabel('Above that');
    //8await labtypes.editfAbnormalBelow('33.99');
    //8await labtypes.editfAbnormalBelowLabel('Below that');
    //8await labtypes.editRefMin('5.00');
    //8await labtypes.editRefMax('12.00');
    //8await labtypes.editAbnormalAbove('12.75');
    //8await labtypes.editAbnormalAboveLabel('Above this');
    //8await labtypes.editAbnormalBelow('3.75');
    //8await labtypes.editAbnormalBelowLabel('Below this');
   //8await labtypes.addLabType('testtype','x10(9)/L', '1', '125','tstp', 'ACTIVE','Gendered','4.00', '11.00', '11.25', '3.50', 'Above', 'Below', '4.00', '11.00', '11.25','mAbove', '3.50', 'mBelow', 
   //8'3.00', '12.00', '12.25','fAbove', '2.50', 'fBelow' );
   //8await labtypes.labTypeBackArrow();
   //8await labtypes.saveLabType();
   //8 await dashboard.clickLogout();

   //8const labtypesmapping = new LabtypesmappingPage (page);

   //8await labtypesmapping.selectLabTypesMapping();
   //8await labtypesmapping.searchLabCode('1525870');
   //8await labtypesmapping.searchLabTypeDropDown('UNMAPPED');
   //8await labtypesmapping.clearSelections();
   //8await labtypesmapping.clickToMap('1525870','UNMAPPED')
   //8await dashboard.clickLogout();

   //8const providers = new ProvidersPage (page);
   //8await providers.clickProviders();
   //8await providers.searchProvider('sur');
   //8await providers.providerStatus('Active');
   //8await providers.clearSelections();  
   //8await providers.selectProvider('Surgeon');
   //8await providers.editAddProviderInfo('Surgeon','Test','email@aol.com','123456789','Active');
   //8await providers.saveProvider();     
   //8await providers.addProvider();
   //8await providers.editAddProviderInfo('Primary', 'Provider','ppc@gmail.com','987654321','Inactive')
   //8await providers.backArrow();

   //8const patients = new PatientsPage(page);
   //8await patients.selectPatients();
   //8await patients.searchPatient('Smith');
   //8await patients.selectPatientfromSearch('Smith');
   //8await patients.viewAllLabs('WBC','2023','OCT','1','2024','FEB','15');
   //8await patients.editSearchedLab('WBC','11.00','2024','Feb','7');
   //8await patients.closeSearchListWindow();
   //8await patients.deleteSearchedLab('WBC');
   //8await patients.saveEditedLab();
   //8await patients.clearSelections();
   //8await patients.addLabs('B 12','12.25','2024','FEB','8');
   //8await patients.addPatient('Fred','Flinestone','1546687','2024','JAN','30','Male','1963','JUL','16','no');
   //8await patients.savePatient();

   //8const documents = new DocumentsPage (page);
   //8await documents.selectDocuments();
  //8await documents.searchDoc('Invasive Anemia Treatment');
   //8await documents.docStatusdropdown('Active');
   //8await documents.selectDocFromList('Invasive Anemia Treatment');
   //8await documents.previewdoc();
   //8await documents.clearSelections();
   //8await documents.addDocBtn();
   //8await documents.addEditDoc('Test Document #3','Document for testing #3','Surgeon Letter','Chronic','Active','yes','yes','test section','section for testing','Content of test section','1212');
   
   //8const emailtemplates = new EmailtemplatesPage(page);
   //8await emailtemplates.clickEmailTemplate();
   //8await emailtemplates.searchEmailTemplate('Visit Doc');
   //8await emailtemplates.selectEmailtemplate('Visit Doc');
   //8await emailtemplates.editTemplate('Visit Doc Notification #2','Visit Doc','Mary Perez','visiturl.test.com','test visit documents','This is a test comment.');
   //8await emailtemplates.backArrow();
   //8await emailtemplates.saveTemplate();

   //8const smartsection = new SmartsectionsPage(page);
   //8await smartsection.selectSmartSections();
   //8await smartsection.searchSmartSection('RCP Follow Up Options');
   //8await smartsection.selectSmartStatus('Active');
   //8await smartsection.clearSelections();
   //8await smartsection.selectSearchResult('RCP Follow Up Options');
   //8await smartsection.addSmartSection();
   //8await smartsection.backArrow();
   //8await smartsection.editSmartSection('Test Smart Section','Smart section test description','Active','Yes','Yes','Smart Option','Smart Option Test','This is a test.')
})