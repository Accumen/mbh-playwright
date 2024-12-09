import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import CaseTypesMappingPage from './classes/casetypesmappingPage'
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))
const cpas = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/ctmpaginationaftersearch.json")))
const cpaf = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/ctmpaginationafterfilter.json")))
const mct = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/mapcasetype.json")))
const umct = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/unmapcasetype.json")))
const uctm = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/uploadcasetypemapping.json")))
const dctm = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/downloadcasetypemapping.json")))
const ctmrc = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/ctmrowcounter.json")))
const mbr = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/mapbyregion.json")))


test('ctm pagination after search', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(cpas.optionClient);

    const casetypesmap = new CaseTypesMappingPage(page);
    await casetypesmap.selectCaseTypesMapping();
    await casetypesmap.paginationCheck();
    await casetypesmap.searchCode(cpas.searchCaseCode);
    await casetypesmap.clearSelections();
    await casetypesmap.paginationCheck();
})

test('ctm pagination after filter', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(cpaf.optionClient);

    const casetypesmap = new CaseTypesMappingPage(page);
    await casetypesmap.selectCaseTypesMapping();
    await casetypesmap.paginationCheck();
    await casetypesmap.searchTypeDropDown(cpaf.casetype)
    await casetypesmap.clearSelections();
    await casetypesmap.paginationCheck();
})

test('map case type', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(mct.optionClient);

    const casetypesmap = new CaseTypesMappingPage(page);
    await casetypesmap.selectCaseTypesMapping();
    await casetypesmap.searchCode(mct.searchCaseCode);
    await casetypesmap.clickToMap(mct.searchCaseCode,mct.casetype,mct.casetype2);
})

test('unmap case type', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(umct.optionClient);

    const casetypesmap = new CaseTypesMappingPage(page);
    await casetypesmap.selectCaseTypesMapping();
    await casetypesmap.searchCode(umct.searchCaseCode);
    await casetypesmap.clickToMap(umct.searchCaseCode,umct.casetype,umct.casetype2);
})

test('upload case type mappings', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(uctm.optionClient);

    const casetypesmap = new CaseTypesMappingPage(page);
    await casetypesmap.selectCaseTypesMapping();
    await casetypesmap.uploadCaseTypeMappings();
    await casetypesmap.searchCode(uctm.searchCaseCode);
})

test('download case type mappings', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(dctm.optionClient);

    const casetypesmap = new CaseTypesMappingPage(page);
    await casetypesmap.selectCaseTypesMapping();
    await casetypesmap.downloadCaseTypeMappings();
})

test('adjust row count', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(ctmrc.optionClient);

    const casetypesmap = new CaseTypesMappingPage(page);
    await casetypesmap.selectCaseTypesMapping();
    await casetypesmap.adjustRowCount(ctmrc.row);
})

test("map by region", async({page})=>{
    test.slow();

    const login = new LoginPage (page)
    await page.goto('https://qa-auto-base.mybloodhealth.com/login')
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn()

    const dashboard = new DashboardPage(page)
    await dashboard.clickClientDropDown(mbr.optionClient);

    const casetypesmap = new CaseTypesMappingPage(page);
    await casetypesmap.selectCaseTypesMapping();
    await casetypesmap.searchCode(mbr.searchCaseCode);
    await casetypesmap.overrideMapping(mbr.casetype);
})
