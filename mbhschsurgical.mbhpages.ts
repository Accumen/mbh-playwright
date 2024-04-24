import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import WorklistPage from './classes/worklistPage';
const logindata = JSON.parse(JSON.stringify(require("../mbhpages/testdata/login.json")))

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
    await worklist.scheduleSurgicalVisit('New', 'July', '', 'Smith', '', '456789123','2022','MAR','10','6101231234','568 Willowbrook rd', 'Broomall',
    'PA','19008', 'Female','White','Not Hispanic','no','April 20','2024', 'MAR', '28', 5,
        'CARDIO', 'test');
    await worklist.saveScheduledVisit();
})