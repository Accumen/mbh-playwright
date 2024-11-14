import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import EmailtemplatesPage from './classes/emailtemplatesPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")));
const semt = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/searcheditemailtemplate.json")))

test('search,edit email template', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(semt.optionClient);

    const emailtemp = new EmailtemplatesPage(page);
    await emailtemp.clickEmailTemplate();
    await emailtemp.searchEmailTemplate(semt.templateName);
    await emailtemp.selectEmailtemplate(semt.templateName);
    await emailtemp.backArrow();
    await emailtemp.selectEmailtemplate(semt.templateName);
    await emailtemp.editTemplate(semt.templateName2,semt.templateType,semt.userFullname,semt.visitUrl,'','');
    await emailtemp.saveTemplate();
})