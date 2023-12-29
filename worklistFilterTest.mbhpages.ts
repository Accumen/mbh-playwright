import{test, expect}from "@playwright/test";
import LoginPage from "./classes/loginPage";
import DashboardPage from "./classes/dashboardPage";
import WorklistPage from "./classes/worklistPage";

test("Worklist Filter Test", async({page})=>{
    test.slow();//changes default timeout from 30000 ms to 90000 ms
    const login = new LoginPage (page);
    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail('cts-secure@accumen.com');
    await login.enterPassword('Iu$24680');
    await login.clickLoginBtn();

    const dashboard = new DashboardPage (page);
    await dashboard.clickClientDropDown("Deaconess New");

    const worklist = new WorklistPage (page);
    await worklist.clickSurgical();
    await worklist.selectFilter("Labs Missing");
    await dashboard.clickLogout();

    
})