import {test} from "@playwright/test"
import LoginPage from "./classes/loginPage"
import UsersPage from "./classes/usersPage"
import DashboardPage from "./classes/dashboardPage"
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))
const au = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/adduser.json")))
const eu = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/edituser.json")))
const du = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/deleteuser.json")))
const rup = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/resetuserpassword.json")))
const un = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/usernavigation.json")))
const autr = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/assignusertoregion.json")))
const autf = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/assignusertofacility.json")))
const urc = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/userrowcount.json")))

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
        await user.newUser(au.fname,au.lname,au.email,au.cadmin,au.contents,au.users,au.clinical,au.reports,au.mapping,au.ustatus);
        await user.saveUser();
        await user.searchUser(au.fname);
    })

    test("edit user", async({page})=>{
        test.slow();
    
        const login = new LoginPage (page)
         await page.goto('https://qa-auto-base.mybloodhealth.com/login')
         await login.enterEmail(logindata.email)
         await login.enterPassword(logindata.password)
         await login.clickLoginBtn()
        
        const dashboard = new DashboardPage (page)
        await dashboard.clickClientDropDown(eu.optionClient);

        const user = new UsersPage(page)
        await user.selectUsers();
        await user.searchUser(eu.user);
        await user.userStatus(eu.ustatus);
        await user.selectUserfromSearch(eu.user);
        await user.editUserfName(eu.fname);
        await user.saveUser();
    })

    test("reset user password", async({page})=>{
        test.slow();
    
        const login = new LoginPage (page)
         await page.goto('https://qa-auto-base.mybloodhealth.com/login')
         await login.enterEmail(logindata.email)
         await login.enterPassword(logindata.password)
         await login.clickLoginBtn()

        const dashboard = new DashboardPage (page)
        await dashboard.clickClientDropDown(rup.optionClient);
        
        const user = new UsersPage(page)
        await user.selectUsers();
        await user.searchUser(rup.user);
        await user.selectUserfromSearch(rup.user);
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

         const dashboard = new DashboardPage (page)
         await dashboard.clickClientDropDown(du.optionClient);
        
        const user = new UsersPage(page)
        await user.selectUsers();
        await user.searchUser(du.user);
        await user.deleteUser(du.user);
    })

    test("user navigation", async({page})=>{
        test.slow();
    
        const login = new LoginPage (page)
         await page.goto('https://qa-auto-base.mybloodhealth.com/login')
         await login.enterEmail(logindata.email)
         await login.enterPassword(logindata.password)
         await login.clickLoginBtn()
        
         const dashboard = new DashboardPage (page)
         await dashboard.clickClientDropDown(un.optionClient); 
        
        const user = new UsersPage(page)
        await user.selectUsers();
        await user.userStatus(un.ustatus);
        await user.clearSelections();
        await user.searchUser(un.user);
        await user.selectUserfromSearch(un.user);
        await user.backArrow();
    })

    test("assign user to region", async({page})=>{
        test.slow();
    
        const login = new LoginPage (page)
         await page.goto('https://qa-auto-base.mybloodhealth.com/login')
         await login.enterEmail(logindata.email)
         await login.enterPassword(logindata.password)
         await login.clickLoginBtn()

        const dashboard = new DashboardPage(page)
        await dashboard.clickClientDropDown(autr.optionClient);
        
        const user = new UsersPage(page)
        await user.selectUsers();
        await user.searchUser(autr.user);
        await user.selectUserfromSearch(autr.user);
        await user.addregion(autr.region);
        await user.saveUser();
    })

    test("assign user to facility", async({page})=>{
        test.slow();
    
        const login = new LoginPage (page)
         await page.goto('https://qa-auto-base.mybloodhealth.com/login')
         await login.enterEmail(logindata.email)
         await login.enterPassword(logindata.password)
         await login.clickLoginBtn()

         const dashboard = new DashboardPage(page)
         await dashboard.clickClientDropDown(autf.optionClient);
        
        const user = new UsersPage(page)
        await user.selectUsers();
        await user.searchUser(autf.user);
        await user.selectUserfromSearch(autf.user);
        await user.addFacility(autf.facility);
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
        await user.adjustRowCount(urc.row);
        await user.selectUserfromSearch(urc.user);
    })
