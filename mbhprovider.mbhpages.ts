import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import ProvidersPage from './classes/providersPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))
const ap = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/addprovider.json")))
const ep = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/editprovider.json")))
const dp = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/deleteprovider.json")))
const pnf = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/providernavigationalfeatures.json")))
const pipp = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/provideritemsperpage.json")))
const pne = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/providerNPIerror.json")))

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
    await dashboard.clickClientDropDown(ap.optionClient);

    const providers = new ProvidersPage(page);
    await providers.clickProviders();
    await providers.addProvider();
    await providers.editAddProviderInfo(ap.fname,ap.lname,ap.email,ap.npi,ap.status);
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
    await dashboard.clickClientDropDown(ep.optionClient);

    const providers = new ProvidersPage(page);
    await providers.clickProviders();
    await providers.searchProvider(ep.provider);
    await providers.selectProvider(ep.provider);
    await providers.editProviderEmail(ep.email);
    await providers.editPostalCode(ep.zipcode)
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
    await dashboard.clickClientDropDown(dp.optionClient);

    const providers = new ProvidersPage(page);
    await providers.clickProviders();
    await providers.searchProvider(dp.provider);
    await providers.deleteProvider(); 
})

test('provider navigational features', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(pnf.optionClient);

    const providers = new ProvidersPage(page);
    await providers.clickProviders();
    await providers.providerStatus(pnf.status);
    await providers.clearSelections();
    await providers.searchProvider(pnf.provider)
    await providers.selectProvider(pnf.provider2);
    await providers.backArrow(); 
})

test('provider items per page', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(pipp.optionClient);

    const providers = new ProvidersPage(page);
    await providers.clickProviders();
    await providers.adjustRowCount(pipp.row);
})

test('provider NPI error', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(pne.optionClient);

    const providers = new ProvidersPage(page);
    await providers.clickProviders();
    await providers.selectProvider(pne.provider);
    await providers.editProviderNPI(pne.npi);
    await providers.npiErrorCheck();
})