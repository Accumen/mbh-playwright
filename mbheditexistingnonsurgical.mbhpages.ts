import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import WorklistPage from './classes/worklistPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))
const client = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/clientlogin.json")))

test('edit existing non surgical', async ({ page }) => {
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
    await worklist.clickChronic();
    await worklist.scheduleChronicVisit('Existing','','','651325','','','','','','','','','','','','','',
    'no','','','','2024','DEC','30',5,'CHRONIC MEDICAL','test');
    await worklist.saveScheduledVisit();

})

test('edit existing non surgical client user', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(client.email);
    await login.enterPassword(client.password);
    await login.clickLoginBtn();

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickChronic();
    await worklist.scheduleChronicVisit('Existing','','','651325','','','','','','','','','','','','','',
    'no','','','','2024','DEC','30',5,'CHRONIC MEDICAL','test');
    await worklist.saveScheduledVisit();

})