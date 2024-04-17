import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import WorklistPage from './classes/worklistPage';
const logindata = JSON.parse(JSON.stringify(require("../mbhpages/testdata/login.json")))

test('worklist', async ({ page }) => {

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
  await worklist.searchMRN('12655473');
  await worklist.unselectAllCaseTypes();
  await worklist.selectCaseType('CARDIO');
  await worklist.selectFilter('Urgent');
  //await worklist.selectSortBy('Priority Score');
  await dashboard.clickLogout();  

});

