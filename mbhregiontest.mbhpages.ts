import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import RegionPage from './classes/regionsPage';
const logindata = JSON.parse(JSON.stringify(require("./testdata/login.json")))

/**test coverage
 * add/edit/save/delete region
 * back arrow
 */

test("region regression testing", async ({page})=>{

    test.slow();

    const login = new LoginPage(page);
    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const region = new RegionPage(page);
    await region.selectRegionsMenu();
    await region.addRegion();
    await region.newRegion('Test 2','218','InActive'); //add region
    await region.saveRegion(); //save region

    await region.selectRegion('Test 2');
    await region.editRegionName('Test 3'); //edit region
    await region.editRegionCode('219');
    await region.editRegionStatus('Active');
    await region.saveRegion();

    await region.selectRegion('Test 3');
    await region.backArrow(); //back arrow
    await region.deleteRegion(); //delete region

})
