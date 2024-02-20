import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';

test('login', async ({ page }) => {
  test.slow();
  const login = new LoginPage(page);
  await page.goto('https://qa.mybloodhealth.com/login');
  await login.enterEmail('cts-secure@accumen.com');
  await login.enterEmail('Iu$24680');
  await login.clickLoginBtn();
  
});
