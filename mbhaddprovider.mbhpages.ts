import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import ProvidersPage from './classes/providersPage';
const logindata = JSON.parse(JSON.stringify(require("./testdata/login.json")))

test('addprovider', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const providers = new ProvidersPage(page);
    await providers.clickProviders();
    await providers.addProvider();
    await providers.editAddProviderInfo('Fred','Smith','fsmith@madeup.com','123456','Active');
    await providers.saveProvider();
})

/**test coverage
 * 
 * 
 */

test('provider regression testing', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const providers = new ProvidersPage(page);
    await providers.clickProviders();
    await providers.addProvider();
    await providers.editAddProviderInfo('Dave','Michael','Smith','Dr','Jr','123pass','test','123 Test Rd','Brooklyn','NY','19008',
        'dsmith@test.com','1234567890','1234567890','1122334455','Test Clinic','Inactive')
    await providers.saveProvider();

    await providers.providerStatus('Inactive');
    await providers.selectProvider('Dr Dave Michael Smith Jr 123pass');
    await providers.editProviderFirstName('Scott');
    await providers.providerStatus('Active');
    await providers.saveProvider();
    
    await providers.providerStatus('Active');
    await providers.providerSearch('Surgeon Test');
    await providers.selectProvider('Surgeon Test');
    await providers.backArrow();
    await providers.clearSelections();
    await providers.deleteProvider();    

})
