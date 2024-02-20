import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import WorklistPage from './classes/worklistPage';

test('surgical visit', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail('cts-secure@accumen.com');
    await login.enterPassword('Iu$24680');
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.scheduleSurgicalVisit('Existing', 'n/a', 'n/a', 'n/a', 'n/a', 'smith','n/a','n/a','n/a','n/a','n/a', 'n/a',
    'n/a','n/a', 'n/a','n/a','n/a','2024', 'MAR', '22', 10,
        'SPINE', 'test');
    await worklist.saveScheduledVisit();
})