import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import CaseTypesMappingPage from './classes/casetypesmappingPage'
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))

test('check pagination on case type mapping page', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const casetypesmap = new CaseTypesMappingPage(page);
    await casetypesmap.selectCaseTypesMapping();
    await casetypesmap.fullPageVerify();

})

test('pagination after search', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const casetypesmap = new CaseTypesMappingPage(page);
    await casetypesmap.selectCaseTypesMapping();
    await casetypesmap.paginationCheck();
    await casetypesmap.searchCode("230");
    await casetypesmap.clearSelections();
    await casetypesmap.paginationCheck();

})

test('pagination after filter', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const casetypesmap = new CaseTypesMappingPage(page);
    await casetypesmap.selectCaseTypesMapping();
    await casetypesmap.paginationCheck();
    await casetypesmap.searchTypeDropDown("CARDIO")
    await casetypesmap.clearSelections();
    await casetypesmap.paginationCheck();

})

test('map case type', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const casetypesmap = new CaseTypesMappingPage(page);
    await casetypesmap.selectCaseTypesMapping();
    await casetypesmap.searchCode('2864');
    await casetypesmap.selectCaseToMap('2864');
    await casetypesmap.clickToMap('2864','ORTHO');
    await casetypesmap.clearSelections();
    await casetypesmap.searchCode('2864');
    await casetypesmap.caseVerify('2864');

})

test('upload case type mappings', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const casetypesmap = new CaseTypesMappingPage(page);
    await casetypesmap.selectCaseTypesMapping();
    await casetypesmap.uploadCaseTypeMappings();
    await casetypesmap.searchCode('76543');
})

test('download case type mappings', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const casetypesmap = new CaseTypesMappingPage(page);
    await casetypesmap.selectCaseTypesMapping();
    await casetypesmap.downloadCaseTypeMappings();
})
