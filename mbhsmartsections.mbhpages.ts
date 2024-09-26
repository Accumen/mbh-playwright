import{test, expect}from "@playwright/test";
import LoginPage from "./classes/loginPage";
import DashboardPage from "./classes/dashboardPage";
import SmartsectionsPage from "./classes/smartsectionsPage";
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))

test("add smart section", async({page})=>{

    test.slow();
    const login = new LoginPage (page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage (page);
    await dashboard.clickClientDropDown("QA Testing");

    const smart = new SmartsectionsPage (page);
    await smart.selectSmartSections();
    await smart.addSmartSection();
    await smart.editSmartSection('Test Name for Smart Section','This is a test','Active');
    await smart.saveSmartOption();
})

test("add option to smart section", async({page})=>{

    test.slow();
    const login = new LoginPage (page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage (page);
    await dashboard.clickClientDropDown("QA Testing");

    const smart = new SmartsectionsPage (page);
    await smart.selectSmartSections();
    await smart.searchSmartSection('Test Name for Smart Section');
    await smart.selectSearchResult('Test Name for Smart Section');
    await smart.addSmartOption('Test Smart Option 1','This is a test of adding an option.','testing');
    await smart.saveSmartOption();
})

test("add sub-option to smart option", async({page})=>{

    test.slow();
    const login = new LoginPage (page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage (page);
    await dashboard.clickClientDropDown("QA Testing");

    const smart = new SmartsectionsPage (page);
    await smart.selectSmartSections();
    await smart.searchSmartSection('Test Name for Smart Section');
    await smart.selectSearchResult('Test Name for Smart Section');
    await smart.addSubOption('Test subopt1','This is a test suboption','test1');
    await smart.saveSmartOption();
})

test("edit smart section", async({page})=>{

    test.slow();
    const login = new LoginPage (page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage (page);
    await dashboard.clickClientDropDown("QA Testing");

    const smart = new SmartsectionsPage (page);
    await smart.selectSmartSections();
    await smart.searchSmartSection('Test Name for Smart Section');
    await smart.selectSearchResult('Test Name for Smart Section');
    await smart.editSmartSection('Test Name for Smart Sections','This is an editing test','Inactive');
    await smart.saveSmartOption();
})

test("delete smart section option", async({page})=>{

    test.slow();
    const login = new LoginPage (page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage (page);
    await dashboard.clickClientDropDown("QA Testing");

    const smart = new SmartsectionsPage (page);
    await smart.selectSmartSections();
    await smart.searchSmartSection('Test');
    await smart.selectSearchResult('Test Smart Section');
    await smart.delete();
})

test("smart section pagination", async({page})=>{

    test.slow();
    const login = new LoginPage (page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage (page);
    await dashboard.clickClientDropDown("QA Testing");

    const smart = new SmartsectionsPage (page);
    await smart.selectSmartSections();
    await smart.smartSectionPagination(3);
    await smart.selectSearchResult('Medication Order-MONOFERRIC');
    await smart.backArrow();
    await smart.paginationCheck();
})

test("smart section navigation", async({page})=>{

    test.slow();
    const login = new LoginPage (page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage (page);
    await dashboard.clickClientDropDown("QA Testing");

    const smart = new SmartsectionsPage (page);
    await smart.selectSmartSections();
    await smart.smartstatus('Inactive');
    await smart.clearSelections();
    await smart.searchSmartSection('Test Smart Section');
    await smart.selectSearchResult('Test Smart Section');
    await smart.backArrow();
    await smart.syncSection();

})

test("smart section items per page", async({page})=>{

    test.slow();
    const login = new LoginPage (page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage (page);
    await dashboard.clickClientDropDown("QA Testing");

    const smart = new SmartsectionsPage (page);
    await smart.selectSmartSections();
    await smart.adjustRowCount('30');
})