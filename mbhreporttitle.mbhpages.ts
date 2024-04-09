import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import ReportsPage from './classes/reportsPage';

test('verify report title', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail('cts-secure@accumen.com');
    await login.enterPassword('Iu$24680');
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