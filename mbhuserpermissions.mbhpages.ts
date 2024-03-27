import {test, expect} from "@playwright/test"
import LoginPage from "./classes/loginPage"// connects the login class to the test
import ReportsPage from "./classes/reportsPage"

test("test user permission for region", async({page})=>{
    test.slow();//changes default timeout from 30000 ms to 90000 ms

    const login = new LoginPage (page)
     await page.goto('https://qa.mybloodhealth.com/login')
     await login.enterEmail('mbowen8486@gmail.com')//email needs moved into the login class
     await login.enterPassword('TossedSalad84!')//password needs moved into the login class
     await login.clickLoginBtn()

     const reports = new ReportsPage(page)
     reports.selectReports();
     reports.chooseReport('Chronic: Total Enrolled Report');
     reports.selectFacilities();
    
    })
