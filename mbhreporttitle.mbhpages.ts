import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import ReportsPage from './classes/reportsPage';
const logindata = JSON.parse(JSON.stringify(require("../mbhpages/testdata/login.json")))

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
    await reports.searchReport('Opportunity Report');
    await reports.chooseReport('Opportunity Report');
    await reports.selectDateRange('This Week');
    await reports.verifyReport(1);
})