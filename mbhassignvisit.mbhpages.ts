import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import WorklistPage from './classes/worklistPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))
const tav = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/testassignvisit.json")))

test('test assign visit', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(tav.optionClient);
    
    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.searchMRN(tav.searchInfo);
    await worklist.selectPatientfromSearch(tav.patient);
    await worklist.selectChainofCustody();
    await worklist.assignUser();
    await worklist.selectAssignUser(tav.user);
    await worklist.saveUser();
    await worklist.assignedToCheck();
})

test('test unassign visit', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(tav.optionClient);

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.searchMRN(tav.searchInfo);
    await worklist.selectPatientfromSearch(tav.patient);
    await worklist.selectChainofCustody();
    await worklist.assignUser();
    await worklist.unassignUser();
})