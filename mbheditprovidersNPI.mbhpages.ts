import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import ProvidersPage from './classes/providersPage';

test('edit provider NPI', async ({ page }) => {
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
    await providers.selectProvider('Surgeon Test');

    await page.getByLabel('NPI *').click();
    await page.getByLabel('NPI *').fill('012345678');
    await page.getByLabel('NPI *').fill('01234567899');
    await page.getByLabel('NPI *').fill('9876543210');

    await providers.saveProvider();

})