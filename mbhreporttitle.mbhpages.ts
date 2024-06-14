import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import ReportsPage from './classes/reportsPage';
const logindata = JSON.parse(JSON.stringify(require("./testdata/login.json")))

test('verify report title', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const reports = new ReportsPage(page);
    await reports.selectReports();
    await reports.searchReport('Chronic');
    await reports.verifyReport(1);
    await reports.clearSelections();
    await reports.searchReport('Non-Surgical');
    await reports.chooseReport('Non-Surgical: Total Enrolled Report');
    await reports.verifyReport(2);
})

test('verify report data shows', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const reports = new ReportsPage(page);
    await reports.selectReports();
    await reports.searchReport('Patient Enroll Report');
    await reports.chooseReport('Patient Enroll Report');
    //await reports.selectDateRange('Last 3 Months'); commented out for MBHS-1200
    await reports.selectDateRange('Last 30 Days'); // added for MBHS-1315
    await reports.applyChanges(); // added for MBHS-1315
    await reports.verifyReport(1);
})
