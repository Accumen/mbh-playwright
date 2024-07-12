import{test, expect}from "@playwright/test";
import LoginPage from "./classes/loginPage";
import DashboardPage from "./classes/dashboardPage";
import SmartsectionsPage from "./classes/smartsectionsPage";
const logindata = JSON.parse(JSON.stringify(require("./testdata/login.json")))

test("add smart section", async({page})=>{

    test.slow();
    const login = new LoginPage (page);
    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage (page);
    await dashboard.clickClientDropDown("QA Testing");

    const smart = new SmartsectionsPage (page);
    await smart.selectSmartSections();
    await smart.addSmartSection();
    await smart.backArrow();
    await smart.addSmartSection();
    await smart.editSmartSection('Test Name for Smart Section','This is a test','Active');
    await smart.addSmartOption('test option 1','this is test option 1','test adding a smart option with no sub option');
    await smart.addSmartOption('test option 2','testing option 2','Test option with sub-option');
    await smart.addSubOption('test suboption 1','suboption of option 2','test suboption can be added to second option');
    await smart.saveSmartOption();
    await smart.searchSmartSection('Test Name for Smart Section');
    await smart.selectSearchResult('Test Name for Smart Section');

})

test("edit smart section", async({page})=>{

    test.slow();
    const login = new LoginPage (page);
    await page.goto('https://qa.mybloodhealth.com/login');
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
    await smart.clearSelections();
    await smart.selectSmartStatus('Inactive');
    await smart.searchSmartSection('Test Name for Smart Sections');
    await smart.delete();
    await smart.searchSmartSection('Test Name for Smart Sections');
})

test("smart section pagination", async({page})=>{

    test.slow();
    const login = new LoginPage (page);
    await page.goto('https://qa.mybloodhealth.com/login');
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

test("smart section pagination dropdown", async({page})=>{

    test.slow();
    const login = new LoginPage (page);
    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage (page);
    await dashboard.clickClientDropDown("QA Testing");

    const smart = new SmartsectionsPage (page);
    await smart.selectSmartSections();
    await smart.adjustRowCount('30');
})