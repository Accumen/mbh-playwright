import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import ReportsPage from './classes/reportsPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))
const sr = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/searchreports.json")))
const rcdf = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/reportcustomdatefilter.json")))
const rff = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/reportfacilityfilter.json")))
const rctf = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/reportcasetypefilter.json")))
const rpf = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/reportproviderfilter.json")))

test('search reports', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(sr.optionClient);

    const reports = new ReportsPage(page);
    await reports.selectReports();
    await reports.searchReport(sr.reportName);
    await reports.clearSelections();
    await reports.searchReport(sr.reportName2);
    await reports.chooseReport(sr.reportName3);
})

test('Report Custom Date Filter', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(rcdf.optionClient);

    const reports = new ReportsPage(page);
    await reports.selectReports();
    await reports.searchReport(rcdf.reportName);
    await reports.chooseReport(rcdf.reportName);
    await reports.selectDateRange(rcdf.dateRange, rcdf.startyear,rcdf.startMonth,rcdf.startDay,rcdf.endyear,rcdf.endMonth,rcdf.endDay); 
    await reports.applyChanges(); 
})

test('Report Facility Filter', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(rff.optionClient);

    const reports = new ReportsPage(page);
    await reports.selectReports();
    await reports.searchReport(rff.reportName);
    await reports.chooseReport(rff.reportName);
    await reports.selectFacility(rff.facility)
    await reports.applyChanges();
})

test('Report Case Type Filter', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(rctf.optionClient);

    const reports = new ReportsPage(page);
    await reports.selectReports();
    await reports.searchReport(rctf.reportName);
    await reports.chooseReport(rctf.reportName);
    await reports.selectCaseType(rctf.casetype);
    await reports.applyChanges();
})

test('Report Provider Filter', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(rpf.optionClient);

    const reports = new ReportsPage(page);
    await reports.selectReports();
    await reports.searchReport(rpf.reportName);
    await reports.chooseReport(rpf.reportName);
    await reports.selectProvider(rpf.provider);
    await reports.applyChanges();
})

