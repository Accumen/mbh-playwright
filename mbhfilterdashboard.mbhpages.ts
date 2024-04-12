import {test} from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';

test('filter dashboard data', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail('cts-secure@accumen.com');
    await login.enterPassword('Pass#123');
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('Farmers Trauma Center');
    await dashboard.clickDateRange('Last 3 Months');
    await dashboard.datacomparison();
})

test('filter screenshot comparison',async ({page})=>{
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail('cts-secure@accumen.com');
    await login.enterPassword('Pass#123');
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('Farmers Trauma Center');
    await dashboard.clickDateRange('Custom','2024','JAN','1','2024','MAR','31');
    await dashboard.datacomparison();
})