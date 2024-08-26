import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import LabtypesPage from './classes/labtypesPage';
const logindata = JSON.parse(JSON.stringify(require("./testdata/login.json")))

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
    await labtypes.searchLabType('test');
    await labtypes.clickLabTypeList('test lab type');
    await labtypes.editLabTypeStatus('Inactive');
    await labtypes.saveLabType();

    await labtypes.clearLabTypesSelection();
    await labtypes.searchLabType('test lab type');
    await labtypes.searchStatus('Inactive');
    await labtypes.clickLabTypeList('test lab type')
})

test('delete lab type', async ({ page }) => {
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
    await labtypes.deleteLabType();

    await labtypes.clearLabTypesSelection();
    await labtypes.searchLabType('testtype');

})

test('lab type pagination', async ({ page }) => {
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
    await labtypes.labTypePagination(2);
    await labtypes.clickLabTypeList('Testing 12231');
    await labtypes.labTypeBackArrow();
    await labtypes.paginationCheck();
})

test('adjust row count', async ({ page }) => {
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
    await labtypes.adjustRowCount('30');
})