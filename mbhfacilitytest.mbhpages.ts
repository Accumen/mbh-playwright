import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import FacilityPage from './classes/facilitiesPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))

/**test coverage
 * 
 */

test("facility regression testing", async ({page})=>{

    test.slow();

    const login = new LoginPage(page);
    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const facility = new FacilityPage(page);
    await facility.selectFacilityMenu();
    await facility.addFacility('QA Facility 3','QA3','301203','123 Test Ave','Boston',
    'MA','12345','1234567890','1234567890','Blood Center','Test','Inactive');
    await facility.addLocation();
    await facility.newLocation('test location','Others','Active');
    await facility.saveFacility();
    await facility.selectStatus('Inactive')
    await facility.selectFacility('QA Facility 3');
    await facility.editFacility('QA Facility 4','','','','','','','','','','','');
    await facility.selectLocation('test location');
    await facility.editLocation('test location 2','','');
    await facility.saveFacility();
    //await facility.selectFacility('QA Facility 4');
    //await facility.trashButton();
    //await facility.facilityBackArrow();
    //await facility.facilitySearch('QA Facility 4');
    //await facility.trashButton();





})