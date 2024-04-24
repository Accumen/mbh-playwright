import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import CaseTypesMappingPage from './classes/casetypesmappingPage'
const logindata = JSON.parse(JSON.stringify(require("../mbhpages/testdata/login.json")))

test('check pagination on case type mapping page', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const casetypesmap = new CaseTypesMappingPage(page);
    await casetypesmap.selectCaseTypesMapping();
    await casetypesmap.fullPageVerify();




})