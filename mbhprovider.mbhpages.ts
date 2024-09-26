import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import ProvidersPage from './classes/providersPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))

/**test coverage
 * add/edit/save/delete provider
 * search provider
 * status
 * clear selection
 * back arrow
 */

test('addprovider', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const providers = new ProvidersPage(page);
    await providers.clickProviders();
    await providers.addProvider();
    await providers.editAddProviderInfo('Constance','Smith','csmith@madeup.com','1234567891','Active');
    await providers.saveProvider();
})

test('edit provider', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const providers = new ProvidersPage(page);
    await providers.clickProviders();
    await providers.searchProvider('Dave');
    await providers.selectProvider('Dave Michael');
    await providers.editProviderFirstName('Scott');
    await providers.saveProvider();
})

test('delete provider', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const providers = new ProvidersPage(page);
    await providers.clickProviders();
    await providers.searchProvider('Surgeon');
    await providers.deleteProvider(); 
})

test('navigational features', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const providers = new ProvidersPage(page);
    await providers.clickProviders();
    await providers.providerStatus('Inactive');
    await providers.clearSelections();
    await providers.selectProvider('Surgeon Test');
    await providers.backArrow(); //back arrow
})

test('items per page', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const providers = new ProvidersPage(page);
    await providers.clickProviders();
    await providers.adjustRowCount('30');
})

test('Provider NPI error test', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const providers = new ProvidersPage(page);
    await providers.clickProviders();
    await providers.selectProvider('Surgeon Test');
    await providers.editProviderNPI('01234567899');
    await providers.editProviderNPI('012345');
})