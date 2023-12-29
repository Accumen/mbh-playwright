import { test, expect } from '@playwright/test';

test('worklist', async ({ page }) => {

  const email = 'mperez@accumen.com'
  const password = 'ThisShit2023!'

  await page.goto('https://qa.mybloodhealth.com/login');
  await page.locator('form div').filter({ hasText: 'Email address' }).click();
  await page.getByPlaceholder('Enter your email').fill(email);
  await page.getByPlaceholder('Enter your password').click();
  await page.getByPlaceholder('Enter your password').fill(password);
  await page.getByRole('button', { name: 'Log in to your account' }).click();
  await page.getByRole('button', { name: 'MBH' }).click();
  await page.getByLabel('MBH').locator('div').nth(3).click();
  await page.getByRole('option', { name: 'QA Testing' }).locator('span').click();
  await page.getByRole('button', { name: 'Change' }).click();
  await page.getByRole('button', { name: ' Worklist' }).locator('a').click();
  await page.getByRole('link', { name: ' S Surgical' }).click();// this is missing a scroll into view line of code
  await page.getByText('Haley Koche').click();
  await page.getByLabel('Example icon-button with share icon').click();
  await page.getByRole('menuitem', { name: ' Logout' }).click();
});

/*
Thoughts..
These will need to be developed as individual classes to be pulled into a "test" 
This will allow the customization of tests and the reusablility of scripts.
*/ 