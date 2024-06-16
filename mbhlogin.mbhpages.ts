import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
const logindata = JSON.parse(JSON.stringify(require("./testdata/login.json")))

test('login', async ({ page }) => {
  test.slow();
  const login = new LoginPage(page);
  await page.goto('https://qa.mybloodhealth.com/login');
  await login.enterEmail(logindata.email);
  await login.enterPassword(logindata.password);
  await login.clickLoginBtn();
  
});
