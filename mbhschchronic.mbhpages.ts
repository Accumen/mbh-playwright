import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import WorklistPage from './classes/worklistPage';

test('chronic visit', async ({ page }) => {
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
    await worklist.clickChronic();
    await worklist.scheduleChronicVisit('Existing', 'n/a', 'n/a', 'n/a', 'n/a', 'smith','n/a','n/a','n/a','n/a','n/a', 'n/a',
    'n/a','n/a', 'n/a','n/a','n/a', '2024','MAR', '25', 10,
        'CHRONIC MEDICAL', 'test')
    await worklist.saveScheduledVisit();
})
