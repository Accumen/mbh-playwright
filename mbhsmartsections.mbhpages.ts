import{test, expect}from "@playwright/test";
import LoginPage from "./classes/loginPage";
import DashboardPage from "./classes/dashboardPage";
import SmartsectionsPage from "./classes/smartsectionsPage";
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))
const ass = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/addsmartsection.json")))
const ao = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/addoption.json")))
const aso = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/addsuboption.json")))
const ess = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/editsmartsection.json")))
const dsso = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/deletesmartsectoption.json")))
const ssp = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/smartsectionpagination.json")))
const ssn = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/smartsectionnavigation.json")))
const ssrc = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/smartsectionrowcount.json")))

test("add smart section", async({page})=>{

    test.slow();
    const login = new LoginPage (page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage (page);
    await dashboard.clickClientDropDown(ass.optionClient);

    const smart = new SmartsectionsPage (page);
    await smart.selectSmartSections();
    await smart.addSmartSection();
    await smart.editSmartSection(ass.smartname,ass.smartdesc,ass.smartstatus);
    await smart.saveSmartOption();
})

test("add option", async({page})=>{

    test.slow();
    const login = new LoginPage (page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage (page);
    await dashboard.clickClientDropDown(ao.optionClient);

    const smart = new SmartsectionsPage (page);
    await smart.selectSmartSections();
    await smart.searchSmartSection(ao.smartname);
    await smart.selectSearchResult(ao.smartname);
    await smart.addSmartOption(ao.smartoption,ao.smartoptdesc,ao.smartcomment);
    await smart.saveSmartOption();
})

test("add sub-option", async({page})=>{

    test.slow();
    const login = new LoginPage (page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage (page);
    await dashboard.clickClientDropDown(aso.optionClient);

    const smart = new SmartsectionsPage (page);
    await smart.selectSmartSections();
    await smart.searchSmartSection(aso.smartname);
    await smart.selectSearchResult(aso.smartname);
    await smart.addSubOption(aso.suboption,aso.suboptdesc,aso.suboptcomment);
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
    await dashboard.clickClientDropDown(ess.optionClient);

    const smart = new SmartsectionsPage (page);
    await smart.selectSmartSections();
    await smart.searchSmartSection(ess.smartname);
    await smart.selectSearchResult(ess.smartname);
    await smart.editSmartSection(ess.smartname2,ess.smartdesc,ess.smartstatus);
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
    await dashboard.clickClientDropDown(dsso.optionClient);

    const smart = new SmartsectionsPage (page);
    await smart.selectSmartSections();
    await smart.searchSmartSection(dsso.smartname);
    await smart.selectSearchResult(dsso.smartname);
    await smart.delete();
    await smart.saveSmartOption();
})

test("smart section pagination", async({page})=>{

    test.slow();
    const login = new LoginPage (page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage (page);
    await dashboard.clickClientDropDown(ssp.optionClient);

    const smart = new SmartsectionsPage (page);
    await smart.selectSmartSections();
    await smart.smartSectionPagination(ssp.num);
    await smart.selectSearchResult(ssp.smartname);
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
    await dashboard.clickClientDropDown(ssn.optionClient);

    const smart = new SmartsectionsPage (page);
    await smart.selectSmartSections();
    await smart.selectSmartStatus(ssn.smartstatus);
    await smart.clearSelections();
    await smart.searchSmartSection(ssn.smartname);
    await smart.selectSearchResult(ssn.smartname);
    await smart.delete();
    await smart.saveSmartOption();
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
    await dashboard.clickClientDropDown(ssrc.optionClient);

    const smart = new SmartsectionsPage (page);
    await smart.selectSmartSections();
    await smart.adjustRowCount(ssrc.row);
    await smart.selectSearchResult(ssrc.smartname)
})