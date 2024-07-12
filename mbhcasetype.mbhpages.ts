import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import CasetypesPage from './classes/casetypesPage';
const logindata = JSON.parse(JSON.stringify(require("./testdata/login.json")))

test('delete case type', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const casetypes = new CasetypesPage(page);
    await casetypes.selectCaseTypeMenu();
    await casetypes.searchCaseType('123');
    await casetypes.deleteCaseType();
    await casetypes.clearSelections();
    await casetypes.searchCaseType('123');
})

test('add/save case type', async ({page})=> {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const casetypes = new CasetypesPage(page);
    await casetypes.selectCaseTypeMenu();
    await casetypes.clickAddCaseType();
    await casetypes.newCaseType('123','3mL/h','test case for playwright','Surgical','VASCULAR','Active');
    await casetypes.backArrow();
    await casetypes.clickAddCaseType();
    await casetypes.newCaseType('123','3mL/h','test case for playwright','Surgical','VASCULAR','Active');
    await casetypes.saveCaseType();
})

test('search/edit case type', async ({page})=> {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const casetypes = new CasetypesPage(page);
    await casetypes.selectCaseTypeMenu();
    await casetypes.searchCaseType('123');
    await casetypes.statusDropDown('Inactive');
    await casetypes.clearSelections();
    await casetypes.searchCaseType('123');
    await casetypes.selectCaseTypeName('123');
    await casetypes.editWorklistType('Non-Surgical');
    await casetypes.saveCaseType();

})

test('check parent case type match', async ({page})=> {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const casetypes = new CasetypesPage(page);
    await casetypes.selectCaseTypeMenu();
    await casetypes.selectCaseTypeName('ORTHO');
    await casetypes.caseTypeScreenshot(1);

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    await casetypes.selectCaseTypeMenu();
    await casetypes.selectCaseTypeName('ORTHO');
    await casetypes.caseTypeScreenshot(2);


})

test('check parent case type match after save/sync', async ({page})=> {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const casetypes = new CasetypesPage(page);
    await casetypes.selectCaseTypeMenu();
    await casetypes.selectCaseTypeName('ORTHO');
    await casetypes.editParentCaseType('ANY OPEN ABDOMINAL PROCEDURE');
    await casetypes.saveCaseType();
    await casetypes.selectCaseTypeName('ORTHO');
    await casetypes.caseTypeScreenshot(1);

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    await casetypes.selectCaseTypeMenu();
    await casetypes.searchCaseType('ORTHO');
    await casetypes.syncCaseType();
    await casetypes.selectCaseTypeName('ORTHO');
    await casetypes.caseTypeScreenshot(2);
})

test('adjust row count', async ({page})=> {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const casetypes = new CasetypesPage(page);
    await casetypes.selectCaseTypeMenu();
    await casetypes.adjustRowCount('30');
})