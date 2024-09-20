import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import FacilityPage from './classes/facilitiesPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))

/**test coverage
 * add/edit/save/delete facility
 * add/edit/save/delete location
 * search facility
 * status
 * clear selection
 * back arrow
 * close window
 */

test("add location and basic navigation", async ({page})=>{

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const facility = new FacilityPage(page);
    await facility.selectFacilityMenu();
    await facility.facilitySearch('QA Facility 1');
    await facility.selectFacility('QA Facility 1');
    await facility.addLocation();
    await facility.close(); //close window
    await facility.addLocation();
    await facility.newLocation('test location','Others','Active'); //add & save location
    await facility.saveFacility(); //save facility
    await facility.selectStatus('Inactive'); //status dropdown
    await facility.clearSelections();
})

test("facility error toast message", async ({page})=>{

    //testing toast message for name, short name and code when not unique
    test.slow();

    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const facility = new FacilityPage(page); 
    await facility.selectFacilityMenu();
    await facility.addFacility('QA Facility 1','QA3','301203','','',
    '','','','','Blood Center','Test','Inactive');
    await facility.saveFacility();
    await facility.facilityScreenshot(1);
    await facility.editFacility('QA Facility 3','QA1','','','','','','','','','','');
    await facility.saveFacility();
    await facility.facilityScreenshot(2);
    await facility.editFacility('','QA3','301202','','','','','','','','','');
    await facility.saveFacility();
})

test("add facility", async ({page})=>{

    test.slow();

    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const facility = new FacilityPage(page);
    await facility.selectFacilityMenu();
    await facility.addFacility('QA Facility 3','QA3','301203','','',
    '','','','','Blood Center','Test','Active');
    await facility.saveFacility();
})

test("edit facility", async ({page})=>{

    test.slow();

    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const facility = new FacilityPage(page);
    await facility.selectFacilityMenu();
    await facility.selectFacility('QA Facility 3');
    await facility.facilityBackArrow();
    await facility.selectFacility('QA Facility 3');
    await facility.editFacility('QA Facility 4','','','','','','','','','','',''); //edit facility
    await facility.saveFacility();
})

test("delete facility", async ({page})=>{

    test.slow();

    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const facility = new FacilityPage(page);
    await facility.selectFacilityMenu();
    await facility.facilitySearch('QA Facility 4')
    await facility.trashButton(); 
    
})

test('facility pagination dropdown', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');
  
    const facility = new FacilityPage(page);
    await facility.selectFacilityMenu();
    await facility.adjustRowCount('30');

  })