import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import WorklistPage from './classes/worklistPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))
const tccul = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/tcclientuserlogin.json")))
const sw = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/switchworklist.json")))
const swp = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/switchworklistpagination.json")))
const swsf = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/switchworklistsavedfilters.json")))
const tccl = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/tcclientuserlogin.json")))

test('switch worklist', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(sw.optionClient);

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.clickChronic();
    await worklist.clickSurgical();
})

test('switch worklist pagination', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(swp.optionClient);

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.clickFacility(swp.fromfacility,swp.tofacility)
    await worklist.worklistPagination(swp.num);
    await worklist.clickChronic();
    await worklist.paginationCheck();
})

test('switch worklist change filter', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.selectFilter('Bloodless');
    await worklist.clickChronic();
    await worklist.selectFilter('Labs Missing');
    await worklist.clickSurgical();
})

test('switch worklist saved filters', async ({ page }) => {
    //client user only  
    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(tccul.email);
    await login.enterPassword(tccul.password);
    await login.clickLoginBtn();

    const worklist = new WorklistPage (page);
    await worklist.clickWorklist();
    await worklist.clickChronic();
    await worklist.clickFacility(swsf.fromfacility,swsf.tofacility);
    await worklist.unselectAllCaseTypes();
    await worklist.selectCaseType(swsf.casetype);
    await worklist.selectFilter(swsf.filter);
    await worklist.saveFilters();
    await worklist.clickSurgical();
    await worklist.unselectAllCaseTypes();
    await worklist.selectCaseType(swsf.casetype2);
    await worklist.saveFilters();
    await worklist.clickChronic();
    await worklist.selectPatientfromSearch(swsf.patient);
    await worklist.backarrow();
    await worklist.clearSelections();
    await worklist.clickSurgical();
    await worklist.selectPatientfromSearch(swsf.patient2);
    await worklist.backarrow(); 
    await worklist.clearSelections();
  })

test('favorite facility switch worklist', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);
  
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(tccl.email);
    await login.enterPassword(tccl.password);
    await login.clickLoginBtn();
  
    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.favoriteFacility();
    await worklist.clickChronic();
    await worklist.clickSurgical();
    await worklist.clearFavoriteFacility();!
  })