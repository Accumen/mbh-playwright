import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import WorklistPage from './classes/worklistPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))

test("Worklist Filter Test", async({page})=>{
  test.slow();//changes default timeout from 30000 ms to 90000 ms
  const login = new LoginPage (page);
  await page.goto('https://qa.mybloodhealth.com/login');
  await login.enterEmail(logindata.email);
  await login.enterPassword(logindata.password);
  await login.clickLoginBtn();

  const dashboard = new DashboardPage (page);
  await dashboard.clickClientDropDown("QA Testing");

  const worklist = new WorklistPage (page);
  await worklist.clickWorklist();
  await worklist.clickSurgical();
  await worklist.selectFilter("Labs Missing");
  await dashboard.clickLogout();
})

test('worklist filter date range test', async ({ page }) => {

  test.slow();
  const login = new LoginPage(page);
  await page.goto('https://qa.mybloodhealth.com/login');
  await login.enterEmail(logindata.email);
  await login.enterPassword(logindata.password);
  await login.clickLoginBtn();

  const dashboard = new DashboardPage(page);
  await dashboard.clickClientDropDown('QA Testing');

  const worklist = new WorklistPage(page);
  await worklist.clickWorklist();
  await worklist.clickChronic();
  await worklist.sortByDateRange('2024','APR','12','2024','APR','12');
  await worklist.worklistscreenshot(1);
  await worklist.sortByDateRange('2024','APR','12','2024','APR','13');
  await worklist.worklistscreenshot(2);
})

test('worklist filter case type test', async ({ page }) => {

  test.slow();
  const login = new LoginPage(page);
  await page.goto('https://qa.mybloodhealth.com/login');
  await login.enterEmail(logindata.email);
  await login.enterPassword(logindata.password);
  await login.clickLoginBtn();

  const dashboard = new DashboardPage(page);
  await dashboard.clickClientDropDown('QA Testing');

  const worklist = new WorklistPage(page);
  await worklist.clickWorklist();
  await worklist.clickSurgical();
  await worklist.unselectAllCaseTypes();
  await worklist.selectCaseType('THORACIC');
  await worklist.worklistscreenshot(1);
})

test('retain worklist filter test', async ({ page }) => {

  test.slow();
  const login = new LoginPage(page);
  await page.goto('https://qa.mybloodhealth.com/login');
  await login.enterEmail(logindata.email);
  await login.enterPassword(logindata.password);
  await login.clickLoginBtn();

  const dashboard = new DashboardPage(page);
  await dashboard.clickClientDropDown('QA Testing');

  const worklist = new WorklistPage(page);
  await worklist.clickWorklist();
  await worklist.clickChronic();
  await worklist.unselectAllCaseTypes();
  await worklist.selectCaseType('CHRONIC MEDICAL');
  await worklist.selectStatus('Cancelled');
  await worklist.selectPatientfromSearch('Jack Black');
  await worklist.backarrow();
  await worklist.clickSurgical();
})

test('retain surgical worklist filter test', async ({ page }) => {

  test.slow();
  const login = new LoginPage(page);
  await page.goto('https://qa.mybloodhealth.com/login');
  await login.enterEmail(logindata.email);
  await login.enterPassword(logindata.password);
  await login.clickLoginBtn();

  const dashboard = new DashboardPage(page);
  await dashboard.clickClientDropDown('QA Testing');

  const worklist = new WorklistPage(page);
  await worklist.clickWorklist();
  await worklist.clickSurgical();
  await worklist.unselectAllCaseTypes();
  await worklist.selectCaseType('SPINE');
  await worklist.selectPatientfromSearch('Barney Rubble');
  await worklist.backarrow();
})

test('retain non surgical worklist filter test', async ({ page }) => {

  test.slow();
  const login = new LoginPage(page);
  await page.goto('https://qa.mybloodhealth.com/login');
  await login.enterEmail(logindata.email);
  await login.enterPassword(logindata.password);
  await login.clickLoginBtn();

  const dashboard = new DashboardPage(page);
  await dashboard.clickClientDropDown('QA Testing');

  const worklist = new WorklistPage(page);
  await worklist.clickWorklist();
  await worklist.clickChronic();
  await worklist.unselectAllCaseTypes();
  await worklist.selectCaseType("WOMEN'S HEALTH- CHRONIC");
  await worklist.selectPatientfromSearch('Betty Rubble');
  await worklist.backarrow();
})

test('Worklist pagination', async ({ page }) => {

  test.slow();
  const login = new LoginPage(page);
  await page.goto('https://qa.mybloodhealth.com/login');
  await login.enterEmail(logindata.email);
  await login.enterPassword(logindata.password);
  await login.clickLoginBtn();

  const dashboard = new DashboardPage(page);
  await dashboard.clickClientDropDown('QA Testing');

  const worklist = new WorklistPage(page);
  await worklist.clickWorklist();
  await worklist.clickSurgical();  
  await worklist.worklistPagination('3');
  await worklist.selectPatientfromSearch('John Smith');
  await worklist.backarrow();
  await worklist.paginationCheck();
  await worklist.worklistscreenshot(1);
})

test('worklist pagination dropdown', async ({ page }) => {

  test.slow();
  const login = new LoginPage(page);
  await page.goto('https://qa.mybloodhealth.com/login');
  await login.enterEmail(logindata.email);
  await login.enterPassword(logindata.password);
  await login.clickLoginBtn();

  const dashboard = new DashboardPage(page);
  await dashboard.clickClientDropDown('QA Testing');

  const worklist = new WorklistPage(page);
  await worklist.clickWorklist();
  await worklist.clickSurgical();
  await worklist.paginationCheck();
  await worklist.adjustRowCount('15');

  await worklist.clickChronic();
  await worklist.paginationCheck();
  await worklist.adjustRowCount('5');
})