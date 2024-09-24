import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import ReportsPage from './classes/reportsPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))

test('search/select report', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const reports = new ReportsPage(page);
    await reports.selectReports();
    await reports.searchReport('Chronic');
    await reports.clearSelections();
    await reports.searchReport('Non-Surgical');
    await reports.chooseReport('Non-Surgical: Total Enrolled Report');
})

test('Custom Date Range Filter', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const reports = new ReportsPage(page);
    await reports.selectReports();
    await reports.searchReport('Patient Enroll Report');
    await reports.chooseReport('Patient Enroll Report');
    await reports.selectDateRange('Custom', '2024','MAY','5','2024','JUL','5'); 
    await reports.applyChanges(); 
})

test('Facility Report Filter', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const reports = new ReportsPage(page);
    await reports.selectReports();
    await reports.searchReport('LOS Impact');
    await reports.chooseReport('LOS Impact');
    await reports.selectFacility('QA Facility 2')
    await reports.applyChanges();
})

test('Case Type Report Filter', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const reports = new ReportsPage(page);
    await reports.selectReports();
    await reports.searchReport('Total Completed');
    await reports.chooseReport('Total Completed Cases');
    await reports.selectCaseType('Select All');
    await reports.selectCaseType('CARDIO');
    await reports.applyChanges();
})

test('Provider Report Filter', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const reports = new ReportsPage(page);
    await reports.selectReports();
    await reports.searchReport('Total Patient');
    await reports.chooseReport('Total Patient Qualified Report');
    await reports.selectProvider('Surgeon Test');
    await reports.applyChanges();
})

