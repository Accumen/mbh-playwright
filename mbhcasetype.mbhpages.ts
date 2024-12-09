import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import CasetypesPage from './classes/casetypesPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))
const dct = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/deletecasetype.json")))
const act = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/addcasetype.json")))
const ect = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/editcasetype.json")))
const ctf = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/casetypesfeatures.json")))

test('delete case type', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(dct.optionClient);

    const casetypes = new CasetypesPage(page);
    await casetypes.selectCaseTypeMenu();
    await casetypes.searchCaseType(dct.searchCase);
    await casetypes.deleteCaseType();
})

test('add case type', async ({page})=> {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(act.optionClient);

    const casetypes = new CasetypesPage(page);
    await casetypes.selectCaseTypeMenu();
    await casetypes.clickAddCaseType();
    await casetypes.newCaseType(act.name,act.bloodloss,act.description,act.worklisttype,act.parentcasetype,act.status);
    await casetypes.saveCaseType();
})

test('edit case type', async ({page})=> {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(ect.optionClient);

    const casetypes = new CasetypesPage(page);
    await casetypes.selectCaseTypeMenu();
    await casetypes.searchCaseType(ect.searchCase);
    await casetypes.selectCaseTypeName(ect.searchCase);
    await casetypes.editWorklistType(ect.worklisttype);
    await casetypes.saveCaseType();

})

test('case types features', async ({page})=> {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(ctf.optionClient);

    const casetypes = new CasetypesPage(page);
    await casetypes.selectCaseTypeMenu();
    await casetypes.adjustRowCount(ctf.row);
    await casetypes.statusDropDown(ctf.status);
    await casetypes.clearSelections();
    await casetypes.selectCaseTypeName(ctf.searchCase);
    await casetypes.backArrow();
})