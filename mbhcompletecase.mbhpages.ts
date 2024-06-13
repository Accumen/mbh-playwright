import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import WorklistPage from './classes/worklistPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))

test('complete surgical treated no followup', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.searchMRN('789456');
    await worklist.selectPatientfromSearch('Treated nFollow');
    await worklist.completeSurgicalVisit('Treated','B12','','no','','','','');
    await worklist.selectChainofCustody();


})

test('complete surgical treated followup', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.searchMRN('789457');
    await worklist.selectPatientfromSearch('Treated Follow');
    await worklist.completeSurgicalVisit('Treated','B12','','yes','321','2024','JUNE','18');
    await worklist.selectChainofCustody();


})

test('complete surgical not treated no followup', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.searchMRN('789458');
    await worklist.selectPatientfromSearch('nTreated nFollow');
    await worklist.completeSurgicalVisit('Not Treated','','Does not meet criteria for treatment','no','','','','');
    await worklist.selectChainofCustody();


})

test('complete surgical not treated followup', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.searchMRN('789459');
    await worklist.selectPatientfromSearch('nTreated Follow');
    await worklist.completeSurgicalVisit('Not Treated','','Does not meet criteria for treatment','yes','321','2024','JUNE','18');
    await worklist.selectChainofCustody();


})

test('complete nonsurgical treated no followup', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickChronic();
    await worklist.searchMRN('789456');
    await worklist.selectPatientfromSearch('Treated nFollow');
    await worklist.completeNonSurgicalVisit('Treated','B12','','no','Patient declines treatment','test reason','','','','');
    await worklist.selectChainofCustody();


})

test('complete nonsurgical treated followup', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickChronic();
    await worklist.searchMRN('789457');
    await worklist.selectPatientfromSearch('Treated Follow');
    await worklist.completeNonSurgicalVisit('Treated','B12','','yes','','','','2024','JUNE','18');
    await worklist.selectChainofCustody();
    await worklist.worklistscreenshot(1);
    await worklist.backarrow();
    await worklist.searchMRN('789457');
    await worklist.worklistscreenshot(2);
    await worklist.selectPatientfromSearch('Treated Follow');
    await worklist.selectChainofCustody();
    await worklist.worklistscreenshot(3);
    await worklist.followUpScnsht();



})

test('complete nonsurgical not treated no followup', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickChronic();
    await worklist.searchMRN('789458');
    await worklist.selectPatientfromSearch('nTreated nFollow');
    await worklist.completeNonSurgicalVisit('Not Treated','','No contact from patient','no','','','','','','');
    await worklist.selectChainofCustody();


})

test('complete nonsurgical not treated followup', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickChronic();
    await worklist.searchMRN('789459');
    await worklist.selectPatientfromSearch('nTreated Follow');
    await worklist.completeNonSurgicalVisit('Not Treated','','No contact from patient','yes','','','321','2024','JUNE','18');
    await worklist.selectChainofCustody();


})

test('test complete visit workflow', async ({ page }) => {
    //MBHS-1227
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickChronic();
    await worklist.selectPatientfromSearch('anna tipoli');
    await worklist.clickCompleteCase();
    await worklist.changeCompleteCaseType('Not Treated');
    await worklist.notTreatedFollowUp();
    await worklist.changeCompleteCaseType('Treated');

})

test('test nonsurgical followup icon', async ({ page }) => {
    //MBHS-1247
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickChronic();
    await worklist.searchMRN('3845239');
    await worklist.selectPatientfromSearch('Dylan Maryska');
    await worklist.selectChainofCustody();
    await worklist.worklistscreenshot(1);
    
    await worklist.completeNonSurgicalVisit('Treated','B12','','yes','','','','2024','JUNE','29');
    await worklist.backarrow();
    await worklist.searchMRN('3845239');
    await worklist.hoverSearch('Dylan Maryska');
    await worklist.worklistscreenshot(2);

    await worklist.selectPatientfromSearch('Dylan Maryska');
    await worklist.selectChainofCustody();
    await worklist.worklistscreenshot(3);

    await worklist.backarrow();
    await worklist.selectStatus('Completed');
    await worklist.searchMRN('3845239');
    await worklist.worklistscreenshot(4);

    await worklist.selectPatientfromSearch('Dylan Maryska');
    await worklist.selectChainofCustody();
    await worklist.worklistscreenshot(5);


})