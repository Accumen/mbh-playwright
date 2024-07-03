import {test} from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))

//serial test for capturing baseline screenshot 
test('filter dashboard data', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');
    await dashboard.clickDateRange('Last 3 Months');
    await dashboard.datacomparison();
})

//serial test for capturing comparison screenshot
test('filter screenshot comparison',async ({page})=>{
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');
    await dashboard.clickDateRange('Custom','2024','APR','1','2024','JUN','30');
    await dashboard.datacomparison();
})
//reset cache 
test('reset cache test',async ({page})=>{
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('Farmers Trauma Center');
    await dashboard.clickDateRange('This Week');
    await dashboard.dataverify(2);
    await dashboard.resetCache();
    await dashboard.dataverify(3);
})

//filters export to excel
test('filter dashboard and export to excel',async ({page})=>{
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');
    await dashboard.unselectAllFacility();
    await dashboard.clickFacility('QA Facility 1');
    await dashboard.unselectAllCaseTypes();
    await dashboard.clickCaseType('CARDIO');
    await dashboard.applyFilters();
    await dashboard.exportToExcel();
})

//filters export to pdf
test('filter dashboard and export to pdf',async ({page})=>{
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');
    await dashboard.unselectAllFacility();
    await dashboard.clickFacility('QA Facility 2');
    await dashboard.unselectAllCaseTypes();
    await dashboard.clickCaseType('THORACIC');
    await dashboard.applyFilters();
    await dashboard.exportToPdf();
})