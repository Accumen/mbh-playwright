import {test, expect} from "@playwright/test"
import LoginPage from "./classes/loginPage"// connects the login class to the test
import DashboardPage from "./classes/dashboardPage"//  connects the dashboard class to the test
import CasetypesmappingPage from "./classes/casetypesmappingPage"//connect the case types mapping class to the test
const logindata = JSON.parse(JSON.stringify(require("../mbhpages/testdata/login.json")))

test("map by region test", async({page})=>{
    test.slow();//changes default timeout from 30000 ms to 90000 ms

    const login = new LoginPage (page)
     await page.goto('https://qa.mybloodhealth.com/login')
     await login.enterEmail(logindata.email);
     await login.enterPassword(logindata.password);
     await login.clickLoginBtn()

     const dashboard = new DashboardPage(page)
     await dashboard.clickClientDropDown("QA Testing");

     const casetypesmapping = new CasetypesmappingPage(page);
     await casetypesmapping.selectCaseTypesMapping();
     await casetypesmapping.searchCode('28');
     await casetypesmapping.overrideMapping('ORTHO');
     await casetypesmapping.searchCode('28');
     await casetypesmapping.fullPageVerify();


})