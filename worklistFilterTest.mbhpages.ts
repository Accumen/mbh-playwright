import{test, expect}from "@playwright/test";
import LoginPage from "./classes/loginPage";
import DashboardPage from "./classes/dashboardPage";
import WorklistPage from "./classes/worklistPage";
const logindata = JSON.parse(JSON.stringify(require("../mbhpages/testdata/login.json")))

test("Worklist Filter Test", async({page})=>{
    test.slow();//changes default timeout from 30000 ms to 90000 ms
    const login = new LoginPage (page);
    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage (page);
    await dashboard.clickClientDropDown("Deaconess New");

    const worklist = new WorklistPage (page);
    await worklist.clickSurgical();
    await worklist.selectFilter("Labs Missing");
    await dashboard.clickLogout();

    
})