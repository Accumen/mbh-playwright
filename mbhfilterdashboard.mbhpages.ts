import {test} from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';

test('filter dashboard data', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail('cts-secure@accumen.com');
    await login.enterPassword('Iu$24680');
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');
    await dashboard.clickDateRange('This Week');
    await dashboard.dataverify(1);
    await dashboard.clickDateRange('Custom','2024','MAR','31','2024','APR','6');
    await dashboard.dataverify(2);
    await dashboard.datacomparison();
})