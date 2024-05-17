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

test("test user permission for region", async({page})=>{
    test.slow();//changes default timeout from 30000 ms to 90000 ms

    const login = new LoginPage (page)
     await page.goto('https://qa.mybloodhealth.com/login')
     await login.enterEmail(logindata.email)
     await login.enterPassword(logindata.password)
     await login.clickLoginBtn()
    
    const user = new UsersPage(page)
    await user.selectUsers();
    await user.addUser();
    await user.newUser('First','Name','fName2000@yahoo.com','No','yes','no','yes','yes','yes','Active');
    await user.backArrow();
    await user.newUser('First','Name','fName2000@yahoo.com','No','yes','no','yes','yes','yes','Active');
    await user.saveUser();
    await user.searchUser('First');
    await user.userStatus('Inactive');
    await user.clearSelections();
    await user.searchUser('First');
    await user.userStatus('Active');
    await user.selectUserfromSearch('First');
    await user.editUserfName('Fred');
    await user.addeditUserRegions(1);
    await user.resetPassword();
    await user.saveUser();
    await user.searchUser('Fred');
    await user.deleteUser();    
    
    })