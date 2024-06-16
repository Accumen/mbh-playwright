import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import WorklistPage from './classes/worklistPage';
const logindata = JSON.parse(JSON.stringify(require("./testdata/login.json")))

test('test assign visit', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');
    
    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.searchMRN('1478523690');
    await worklist.selectPatientfromSearch('Jerry Springer');
    await worklist.selectChainofCustody();
    
    await worklist.assignUser();
    await worklist.selectAssignUser('Test User');
    await worklist.saveUser();

    await worklist.worklistscreenshot(1);
    await worklist.assignedToCheck();

})

test('test unassign visit', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.searchMRN('1478523690');
    await worklist.selectPatientfromSearch('Jerry Springer');
    await worklist.selectChainofCustody();

    await worklist.assignUser();
    await worklist.unassignUser();
    await worklist.worklistscreenshot(1);


})
