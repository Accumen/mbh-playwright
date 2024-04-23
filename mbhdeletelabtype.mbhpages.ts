import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import LabtypesPage from './classes/labtypesPage';
const logindata = JSON.parse(JSON.stringify(require("../mbhpages/testdata/login.json")))

test('delete lab type', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const labtypes = new LabtypesPage(page);
    await labtypes.selectLabTypes();
    await labtypes.searchLabType('testtype');
    await labtypes.deleteLabType();

    await labtypes.clearLabTypesSelection();
    await labtypes.searchLabType('testtype');

})