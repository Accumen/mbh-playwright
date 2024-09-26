import {test} from "@playwright/test"
import LoginPage from "./classes/loginPage"// connects the login class to the test
import ReportsPage from "./classes/reportsPage"
import UsersPage from "./classes/usersPage"
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))

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

    test("add user", async({page})=>{
        //MBHS-1686
        test.slow();//changes default timeout from 30000 ms to 90000 ms
    
        const login = new LoginPage (page)
         await page.goto('https://qa-auto-base.mybloodhealth.com/login')
         await login.enterEmail(logindata.email)
         await login.enterPassword(logindata.password)
         await login.clickLoginBtn()
        
        const user = new UsersPage(page)
        await user.selectUsers();
        await user.addUser();
        await user.newUser('First','Name','fName2000@yahoo.com','No','yes','no','yes','yes','yes','Active');
        await user.saveUser();
    })