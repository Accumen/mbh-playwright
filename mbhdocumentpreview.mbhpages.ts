import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import WorklistPage from './classes/worklistPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))
const dp = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/documentpreview.json")))

test('document preview', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(dp.optionClient);

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.searchMRN(dp.searchInfo);
    await worklist.selectPatientfromSearch(dp.patient);
    await worklist.visitDocumentsAdd();
    await worklist.addVisitDocuments();
    await worklist.closeVisitDocuments();
    await worklist.visitDocumentsPreview();

})