import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import LabTypesMappingPage from './classes/labtypesmappingPage'
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))

test('pagination after search', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const labtypesmap = new LabTypesMappingPage(page);
    await labtypesmap.selectLabTypesMapping();
    await labtypesmap.paginationCheck();
    await labtypesmap.searchLabCode("1525952");
    await labtypesmap.clearSelections();
    await labtypesmap.paginationCheck();
    
})

test('pagination after filter', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const labtypesmap = new LabTypesMappingPage(page);
    await labtypesmap.selectLabTypesMapping();
    await labtypesmap.paginationCheck();
    await labtypesmap.searchLabTypeDropDown("WBC")
    await labtypesmap.clearSelections();
    await labtypesmap.paginationCheck();  
})

test('download mappings', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const labtypesmap = new LabTypesMappingPage(page);
    await labtypesmap.selectLabTypesMapping();
    await labtypesmap.downloadLabTypeMappings();    
})

test('upload mappings', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const labtypesmap = new LabTypesMappingPage(page);
    await labtypesmap.selectLabTypesMapping();
    await labtypesmap.uploadLabTypeMappings();  
    await labtypesmap.searchLabCode('1234567');
})

test('map lab type', async ({page}) => {
    test.slow();

    const login = new LoginPage(page);
    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const labtypesmap = new LabTypesMappingPage(page);
    await labtypesmap.selectLabTypesMapping();
    await labtypesmap.searchLabCode('1234567');
    await labtypesmap.clickToMap('1234567','test lab type');
    await labtypesmap.searchLabCode('1234567');
})