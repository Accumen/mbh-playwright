import {test} from "@playwright/test"
import LoginPage from "./classes/loginPage"
import UsersPage from "./classes/usersPage"
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))

/**test coverage
 * adding a user
 * back arrow
 * save user
 * search user
 * status
 * clear selections
 * edit user
 * set user permissions
 * reset password
 * delete user
 */

    test("add user", async({page})=>{
        //MBHS-1686
        test.slow();
    
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

    test("edit user", async({page})=>{
        test.slow();
    
        const login = new LoginPage (page)
         await page.goto('https://qa-auto-base.mybloodhealth.com/login')
         await login.enterEmail(logindata.email)
         await login.enterPassword(logindata.password)
         await login.clickLoginBtn()
        
        const user = new UsersPage(page)
        await user.selectUsers();
        await user.searchUser('First');
        await user.userStatus('Active');
        await user.selectUserfromSearch('First');
        await user.editUserfName('Fred');
        await user.saveUser();
    })

    test("reset user password", async({page})=>{
        test.slow();
    
        const login = new LoginPage (page)
         await page.goto('https://qa-auto-base.mybloodhealth.com/login')
         await login.enterEmail(logindata.email)
         await login.enterPassword(logindata.password)
         await login.clickLoginBtn()
        
        const user = new UsersPage(page)
        await user.selectUsers();
        await user.searchUser('First');
        await user.selectUserfromSearch('First');
        await user.resetPassword();
        await user.saveUser();
    })

    test("delete user", async({page})=>{
        test.slow();
    
        const login = new LoginPage (page)
         await page.goto('https://qa-auto-base.mybloodhealth.com/login')
         await login.enterEmail(logindata.email)
         await login.enterPassword(logindata.password)
         await login.clickLoginBtn()
        
        const user = new UsersPage(page)
        await user.selectUsers();
        await user.searchUser('First');
        await user.deleteUser();
    })

    test("user navigation", async({page})=>{
        test.slow();
    
        const login = new LoginPage (page)
         await page.goto('https://qa-auto-base.mybloodhealth.com/login')
         await login.enterEmail(logindata.email)
         await login.enterPassword(logindata.password)
         await login.clickLoginBtn()
        
        const user = new UsersPage(page)
        await user.selectUsers();
        await user.userStatus('Inactive');
        await user.clearSelections();
        await user.searchUser('Fred');
        await user.selectUserfromSearch('Fred Smith');
        await user.backArrow();
    })

    test("assign user to region", async({page})=>{
        test.slow();
    
        const login = new LoginPage (page)
         await page.goto('https://qa-auto-base.mybloodhealth.com/login')
         await login.enterEmail(logindata.email)
         await login.enterPassword(logindata.password)
         await login.clickLoginBtn()
        
        const user = new UsersPage(page)
        await user.selectUsers();
        await user.searchUser('Fred');
        await user.selectUserfromSearch('Fred Smith');
        await user.addregion('Texas');
        await user.saveUser();
    })

    test("assign user to facility", async({page})=>{
        test.slow();
    
        const login = new LoginPage (page)
         await page.goto('https://qa-auto-base.mybloodhealth.com/login')
         await login.enterEmail(logindata.email)
         await login.enterPassword(logindata.password)
         await login.clickLoginBtn()
        
        const user = new UsersPage(page)
        await user.selectUsers();
        await user.searchUser('Fred');
        await user.selectUserfromSearch('Fred Smith');
        await user.addFacility('QA Facility 1');
        await user.saveUser();
    })

    test("adjust row count", async({page})=>{
        test.slow();
    
        const login = new LoginPage (page)
         await page.goto('https://qa-auto-base.mybloodhealth.com/login')
         await login.enterEmail(logindata.email)
         await login.enterPassword(logindata.password)
         await login.clickLoginBtn()
        
        const user = new UsersPage(page)
        await user.selectUsers();
        await user.adjustRowCount('30');
    })
