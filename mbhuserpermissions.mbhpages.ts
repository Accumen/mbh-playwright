import {test} from "@playwright/test"
import LoginPage from "./classes/loginPage"// connects the login class to the test
import ReportsPage from "./classes/reportsPage"

test("test user permission for region", async({page})=>{
    test.slow();//changes default timeout from 30000 ms to 90000 ms

    const login = new LoginPage (page)
     await page.goto('https://qa-auto-base.mybloodhealth.com/login')
     await login.enterEmail('mbowen8486@gmail.com')//email needs moved into the login class
     await login.enterPassword('TossedSalad84!')//password needs moved into the login class
     await login.clickLoginBtn()

     const report = new ReportsPage(page)
     await report.selectReports();
     await report.chooseReport('Chronic: Total Enrolled Report');
     await report.selectFacilities();
    
    })
