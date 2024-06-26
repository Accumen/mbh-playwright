import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import WorklistPage from './classes/worklistPage';
const logindata = JSON.parse(JSON.stringify(require("./testdata/login.json")))

test('verify document type', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.selectPatientfromSearch('Sam Smyth');
    await worklist.visitDocumentsAdd();
    await worklist.searchdoc('Retacrit Package Insert')
    await worklist.worklistscreenshot(1);
    await worklist.addVisitDocuments();
    await worklist.closeVisitDocuments();
    await worklist.worklistscreenshot(2);
})
