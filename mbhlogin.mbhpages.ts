import { test, expect } from '@playwright/test';

/*test.use({
  browserName: "firefox"   // this allows you to run the test in firefox, or webkit.  Commenting out returns test to run in defualt chrome
  
})*/
test('login', async ({ page }) => {
const email = 'mperez@accumen.com'
const password = 'ThisShit2023!'
  await page.goto('https://qa.mybloodhealth.com/login');
  await page.getByPlaceholder('Enter your email').click();
  await page.getByPlaceholder('Enter your email').fill(email); // store this info in a variable and pass the variable
  await page.getByPlaceholder('Enter your password').click();
  await page.getByPlaceholder('Enter your password').fill(password); // store this info in a variable and pass the variable
  await page.getByRole('button', { name: 'Log in to your account' }).click();
  await page.getByLabel('Example icon-button with share icon').click();
  await page.getByRole('menuitem', { name: ' Logout' }).click();
});
