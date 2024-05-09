import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import LabtypesPage from './classes/labtypesPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))

test('add lab type', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const labtypes = new LabtypesPage(page);
    await labtypes.selectLabTypes();
    await labtypes.addLabType('testtype','x10(9)/L','1','125','tstp','ACTIVE','Gendered','','','','','','',
    '5','10','10','above','5','below','5','10','10','above','5','below');
    await labtypes.saveLabType();

    await labtypes.clearLabTypesSelection();
    await labtypes.searchLabType('testtype');
    await labtypes.clickLabTypeList('testtype')
})

test('edit lab type', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const labtypes = new LabtypesPage(page);
    await labtypes.selectLabTypes();
    await labtypes.searchLabType('testtype');
    await labtypes.clickLabTypeList('testtype')
    await labtypes.editLabTypeUniqueCode('tstp2')
    await labtypes.saveLabType();

    await labtypes.clearLabTypesSelection();
    await labtypes.searchLabType('testtype');
    await labtypes.clickLabTypeList('testtype')
})