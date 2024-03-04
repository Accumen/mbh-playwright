import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import ProviderPage from './classes/providersPage';
import ProvidersPage from './classes/providersPage';

test('addprovider', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail('cts-secure@accumen.com');
    await login.enterPassword('Iu$24680');
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const providers = new ProvidersPage(page);
    await providers.clickProviders();
    await providers.addProvider();
    await providers.editAddProviderInfo('Fred','Smith','fsmith@madeup.com','123456','Active');
    await providers.saveProvider();
})