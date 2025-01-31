import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import RegionPage from './classes/regionsPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))
const ar = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/addregion.json")))
const er = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/editregion.json")))
const ndr = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/navigatedeleteregion.json")))

/**test coverage
 * add/edit/save/delete region
 * back arrow
 */

test("add region", async ({page})=>{

    test.slow();

    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(ar.optionClient);

    const region = new RegionPage(page);
    await region.selectRegionsMenu();
    await region.addRegion();
    await region.newRegion(ar.regionName,ar.regionCode,ar.regionStatus); 
    await region.saveNewRegion(); 
})

test("edit region", async ({page})=>{

    test.slow();

    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(er.optionClient);

    const region = new RegionPage(page);
    await region.selectRegionsMenu();
    await region.selectRegion(er.regionName);
    await region.editRegionName(er.regionName2); 
    await region.editRegionCode(er.regionCode);
    await region.editRegionStatus(er.regionStatus);
    await region.save();
})

test("navigate/delete region", async ({page})=>{

    test.slow();

    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(ndr.optionClient);

    const region = new RegionPage(page);
    await region.selectRegionsMenu();
    await region.selectRegion(ndr.regionName);
    await region.backArrow(); 
    await region.deleteRegion(ndr.regionName); 

})