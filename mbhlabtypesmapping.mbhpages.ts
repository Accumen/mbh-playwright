import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import LabTypesMappingPage from './classes/labtypesmappingPage'
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))
const ltmpas = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/ltmpaginationaftersearch.json")))
const ltmpaf = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/ltmpaginationafterfilter.json")))
const dltm = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/downloadlabtypemappings.json")))
const ultm = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/downloadlabtypemappings.json")))
const mlt = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/maplabtype.json")))
const umlt = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/unmaplabtype.json")))
const ltmrc = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/ltmrowcounter.json")))

test('ltm pagination after search', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(ltmpas.optionClient);

    const labtypesmap = new LabTypesMappingPage(page);
    await labtypesmap.selectLabTypesMapping();
    await labtypesmap.paginationCheck();
    await labtypesmap.searchLabCode(ltmpas.labcode);
    await labtypesmap.clearSelections();
    await labtypesmap.paginationCheck();
    
})

test('ltm pagination after filter', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(ltmpaf.optionClient);

    const labtypesmap = new LabTypesMappingPage(page);
    await labtypesmap.selectLabTypesMapping();
    await labtypesmap.paginationCheck();
    await labtypesmap.searchLabTypeDropDown(ltmpaf.labtype)
    await labtypesmap.clearSelections();
    await labtypesmap.paginationCheck();  
})

test('download lab type mappings', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(dltm.optionClient);

    const labtypesmap = new LabTypesMappingPage(page);
    await labtypesmap.selectLabTypesMapping();
    await labtypesmap.downloadLabTypeMappings();    
})

test('upload lab type mappings', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(ultm.optionClient);

    const labtypesmap = new LabTypesMappingPage(page);
    await labtypesmap.selectLabTypesMapping();
    await labtypesmap.uploadLabTypeMappings();  
})

test('map lab type', async ({page}) => {
    test.slow();

    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(mlt.optionClient);

    const labtypesmap = new LabTypesMappingPage(page);
    await labtypesmap.selectLabTypesMapping();    
    await labtypesmap.searchLabCode(mlt.labcode);
    await labtypesmap.clickToMap(mlt.labcode,mlt.labtype,mlt.labtype2);

})

test('unmap lab type', async ({page}) => {
    test.slow();

    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(umlt.optionClient);

    const labtypesmap = new LabTypesMappingPage(page);
    await labtypesmap.selectLabTypesMapping();
    await labtypesmap.searchLabCode(umlt.labcode);
    await labtypesmap.clickToMap(umlt.labcode,umlt.labtype,umlt.labtype2);
})

test('ltm row counter', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(ltmrc.optionClient);

    const labtypesmap = new LabTypesMappingPage(page);
    await labtypesmap.selectLabTypesMapping();
    await labtypesmap.adjustRowCount(ltmrc.row);
})