import {test} from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))
const rct = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/resetcachetest.json")))
const fdaete = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/filterdashboardandexporttoexcel.json")))
const fdaetp = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/filterdashboardandexporttopdf.json")))
const dpc = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/dataperformancecalendar.json")))
const gcnkt = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/ganzonicalcnegativekgtest.json")))
const gcnlt = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/ganzonicalcnegativelbstest.json")))
const gcdkt = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/ganzonicalcdeckgtest.json")))
const gcdlt = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/ganzonicalcdeclbstest.json")))
const gchkt = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/ganzonicalchcurhgbforkgtest.json")))
const gchlt = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/ganzonicalchcurhgbforlbstest.json")))

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
    await dashboard.clickClientDropDown(fdaete.optionClient);
    await dashboard.unselectAllFacility();
    await dashboard.clickFacility(fdaete.facility);
    await dashboard.unselectAllCaseTypes();
    await dashboard.clickCaseType(fdaete.casetype);
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
    await dashboard.clickClientDropDown(fdaetp.optionClient);
    await dashboard.unselectAllFacility();
    await dashboard.clickFacility(fdaetp.facility);
    await dashboard.unselectAllCaseTypes();
    await dashboard.clickCaseType(fdaetp.casetype);
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
    await dashboard.clickClientDropDown(dpc.optionClient);
    await dashboard.dataCalendar(dpc.year,dpc.month);
    await dashboard.changeMonthDC(dpc.nextchange);
    await dashboard.changeMonthDC(dpc.previouschange);
    await dashboard.pickDayDC(dpc.day);

})

test('ganzoni calc negative kg test',async ({page})=>{
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(gcnkt.optionClient);
    await dashboard.ganzoniCalculator(gcnkt.weightype,gcnkt.weight,gcnkt.curHgb);
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
    await dashboard.clickClientDropDown(gcnlt.optionClient);
    await dashboard.ganzoniCalculator(gcnlt.weightype,gcnlt.weight,gcnlt.curHgb);
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
    await dashboard.clickClientDropDown(gcdkt.optionClient);
    await dashboard.ganzoniCalculator(gcdkt.weightype, gcdkt.weight, gcdkt.curHgb);
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
    await dashboard.clickClientDropDown(gcdlt.optionClient);
    await dashboard.ganzoniCalculator(gcdlt.weightype, gcdlt.weight, gcdlt.curHgb);
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
    await dashboard.clickClientDropDown(gchkt.optionClient);
    await dashboard.ganzoniCalculator(gchkt.weightype, gchkt.weight, gchkt.curHgb);
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
    await dashboard.clickClientDropDown(gchlt.optionClient);
    await dashboard.ganzoniCalculator(gchlt.weightype, gchlt.weight, gchlt.curHgb);
    await dashboard.dataverify(6);
})