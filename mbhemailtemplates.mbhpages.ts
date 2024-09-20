import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import EmailtemplatesPage from './classes/emailtemplatesPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")));

test('search,edit email template', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const emailtemp = new EmailtemplatesPage(page);
    await emailtemp.clickEmailTemplate();
    await emailtemp.searchEmailTemplate('Assign Visit Notification');
    await emailtemp.selectEmailtemplate('Assign Visit Notification');
    await emailtemp.backArrow();
    await emailtemp.selectEmailtemplate('Assign Visit Notification');
    await emailtemp.editTemplate('Test Assign Visit Notification','Assignment','Test User','www.visiturl.com/testuservisit');
    await emailtemp.saveTemplate();
    await emailtemp.searchEmailTemplate('Assign Visit Notification');
    await emailtemp.selectEmailtemplate('Assign Visit Notification');
})