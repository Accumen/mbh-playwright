import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import FacilityPage from './classes/facilitiesPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))
const albn = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/facilitytestaddlocationbasicnavigation.json")))
const etm = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/facilitytesterrortoastmessage.json")))
const af = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/facilitytestaddfacility.json")))
const ef = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/facilitytesteditfacility.json")))
const df = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/facilitytestdeletefacility.json")))
const fpd = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/facilitytestfacilitypaginationdropdown.json")))

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
    await dashboard.clickClientDropDown(albn.optionClient);

    const facility = new FacilityPage(page);
    await facility.selectFacilityMenu();
    await facility.facilitySearch(albn.facilityName);
    await facility.selectFacility(albn.facilityName);
    await facility.addLocation();
    await facility.close(); //close window
    await facility.addLocation();
    await facility.newLocation(albn.locationName,albn.locationType,albn.locationStatus); //add & save location
    await facility.saveFacility(); //save facility
    await facility.selectStatus(albn.listStatus); //status dropdown
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
    await dashboard.clickClientDropDown(etm.optionClient);

    const facility = new FacilityPage(page); 
    await facility.selectFacilityMenu();
    await facility.addFacility(etm.facilityName,etm.shortName,etm.code,'','',
    '','','','',etm.type,etm.region,etm.status);
    await facility.saveFacility();
    await facility.facilityScreenshot(1);
    await facility.editFacility(etm.facilityName2,etm.shortName2,'','','','','','','','','','');
    await facility.saveFacility();
    await facility.facilityScreenshot(2);
    await facility.editFacility('',etm.shortName,etm.code2,'','','','','','','','','');
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
    await dashboard.clickClientDropDown(af.optionClient);

    const facility = new FacilityPage(page);
    await facility.selectFacilityMenu();
    await facility.addFacility(af.facilityName,af.shortName,af.code,'','',
    '','','','',af.type,af.region,af.status);
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
    await dashboard.clickClientDropDown(ef.optionClient);

    const facility = new FacilityPage(page);
    await facility.selectFacilityMenu();
    await facility.selectFacility(ef.facilityName);
    await facility.facilityBackArrow();
    await facility.selectFacility(ef.facilityName);
    await facility.editFacility(ef.facilityName2,'','','','','','','','','','',''); //edit facility
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
    await dashboard.clickClientDropDown(df.optionClient);

    const facility = new FacilityPage(page);
    await facility.selectFacilityMenu();
    await facility.facilitySearch(df.facilityName);
    await facility.hoverSearch(df.facilityName);
    await facility.deleteFacility(); 
    
})

test('facility pagination dropdown', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(fpd.optionClient);
  
    const facility = new FacilityPage(page);
    await facility.selectFacilityMenu();
    await facility.adjustRowCount(fpd.rowCount);

  })