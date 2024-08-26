import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import UsersPage from './classes/usersPage';
const logindata = JSON.parse(JSON.stringify(require("./testdata/login.json")))

test('add new users', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const users = new UsersPage(page);
    await users.selectUsers();
    await users.addUser();
    await users.newUser('Test','User2','testuser2@testmail.com','no','','','','','','Active');
    await users.addregion();
    await users.saveUser();
    await users.selectUserfromSearch('Test User2');

})
