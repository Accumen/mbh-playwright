import {test} from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))
const rct = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/resetcachetest.json")))

//serial test for capturing baseline screenshot 
/*
test('filter dashboard data', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
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

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');
    await dashboard.clickDateRange('Custom','2024','APR','1','2024','JUN','30');
    await dashboard.datacomparison();
})
    */
//reset cache 
test('reset cache test',async ({page})=>{
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(rct.optionClient);
    await dashboard.clickDateRange(rct.selection);
    await dashboard.dataverify(2);
    await dashboard.resetCache();
    await dashboard.dataverify(3);
})

//filters export to excel
test('filter dashboard and export to excel',async ({page})=>{
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
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

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
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

//test dashboard data performance calendar
test('data performance calendar',async ({page})=>{
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');
    await dashboard.dataCalendar('2024','JUN');
    await dashboard.changeMonthDC('Previous');
    await dashboard.changeMonthDC('Next');
    await dashboard.pickDayDC('12');

})

test('ganzoni calc negative kg test',async ({page})=>{
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');
    await dashboard.ganzoniCalculator('kgs','-258','-9');
    await dashboard.dataverify(1);
})

test('ganzoni calc negative lbs test',async ({page})=>{
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');
    await dashboard.ganzoniCalculator('lbs','-153','-8');
    await dashboard.dataverify(2);
})
test('ganzoni calc decimal kg test',async ({page})=>{
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');
    await dashboard.ganzoniCalculator('kgs','258.5','9.1');
    await dashboard.dataverify(3);
})
test('ganzoni calc decimal lbs test',async ({page})=>{
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');
    await dashboard.ganzoniCalculator('lbs','153.6','8.7');
    await dashboard.dataverify(4);
})
test('ganzoni calc higher current hgb for kg test',async ({page})=>{
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');
    await dashboard.ganzoniCalculator('kgs','258','15');
    await dashboard.dataverify(5);
})
test('ganzoni calc higher current hgb for lbs test',async ({page})=>{
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');
    await dashboard.ganzoniCalculator('lbs','153','16');
    await dashboard.dataverify(6);
})