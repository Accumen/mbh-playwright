import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import WorklistPage from './classes/worklistPage';

test('worklist filter test', async ({ page }) => {

  test.slow();
  const login = new LoginPage(page);
  await page.goto('https://qa.mybloodhealth.com/login');
  await login.enterEmail('cts-secure@accumen.com');
  await login.enterPassword('Pass#123');
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