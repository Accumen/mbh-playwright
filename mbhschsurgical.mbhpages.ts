import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import WorklistPage from './classes/worklistPage';
const logindata = JSON.parse(JSON.stringify(require("./testdata/login.json")))

test('surgical visit', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail('cts-secure@accumen.com');
    await login.enterPassword('Pass#123');
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.scheduleSurgicalVisit('New', 'nTreated', '', 'Follow', '', '789459','2022','MAR','10','6101231234','568 Willowbrook rd', 'Broomall',
    'PA','19008', 'Female','White','Not Hispanic','no','MAY 31','no','','','','2024', 'MAY', '31', 5,
        'CARDIO', 'test');
    await worklist.saveScheduledVisit();
})

test('surgical visit existing', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail('cts-secure@accumen.com');
    await login.enterPassword('Pass#123');
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.scheduleSurgicalVisit('Existing','','','','','651324','','','','','','','','','','','',
        '','','no','','','','2024','SEPT','28',13,'SPINE','test');
    await worklist.saveScheduledVisit()
})