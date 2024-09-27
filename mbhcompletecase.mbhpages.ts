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
    await worklist.selectPatientfromSearch('Emily Smith');
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
    await worklist.searchMRN('1597642388');
    await worklist.selectPatientfromSearch('Frank Smith');
    await worklist.completeSurgicalVisit('Treated','B12','','yes','321','2024','OCT','28')

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
    await worklist.searchMRN('123456788');
    await worklist.selectPatientfromSearch('Wilma Flinestone');
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
    await worklist.searchMRN('Emily Smith');
    await worklist.selectPatientfromSearch('Emily Smith');
    await worklist.completeSurgicalVisit('Not Treated','','Patient declines treatment','yes','321','2024','JUNE','28');

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
    await worklist.searchMRN('947128');
    await worklist.selectPatientfromSearch('Chrystal Allinson');
    await worklist.completeNonSurgicalVisit('Treated','B12','','no','Patient treatment plan complete','test reason','','','','');
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
    await worklist.searchMRN('741852963');
    await worklist.selectPatientfromSearch('August Smith');
    await worklist.completeNonSurgicalVisit('Treated','EPO','','yes','','','','2024','JULY','28');
   
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
    await worklist.searchMRN('115495');
    await worklist.selectPatientfromSearch('Trueman Jacklings');
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
    await worklist.searchMRN('1270546');
    await worklist.selectPatientfromSearch('Augustine Coye');
    await worklist.completeNonSurgicalVisit('Not Treated','','No contact from patient','yes','','','321','2024','OCT','28')
})

test('edit complete non-surgical visit', async ({ page }) => {
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
    await worklist.searchMRN('3979531')
    await worklist.selectPatientfromSearch('Laughton Spring');
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
    await worklist.searchMRN('651325');
    await worklist.selectPatientfromSearch('Barney Rubble');
    await worklist.selectChainofCustody();
    await worklist.worklistscreenshot(1);
    await worklist.completeNonSurgicalVisit('Treated','B12','','yes','','','','2024','NOV','29');
    await worklist.backarrow();
    await worklist.worklistscreenshot(2);
    await worklist.selectPatientfromSearch('Barney Rubble');
    await worklist.selectChainofCustody();
    await worklist.worklistscreenshot(3);
    await worklist.backarrow();
    await worklist.selectStatus('Completed');
    await worklist.worklistscreenshot(4);
    await worklist.selectPatientfromSearch('Barney Rubble');
    await worklist.selectChainofCustody();
    await worklist.worklistscreenshot(5);
})


test('test nonsurgical number of doses autopopulates', async ({ page }) => {
   
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
    await worklist.searchMRN('August Smith');
    await worklist.selectPatientfromSearch('August Smith');
    await worklist.clickCompleteCase();
    await worklist.changeCompleteCaseType('Not Treated');
    await worklist.notTreatedFollowUp();
    await worklist.changeCompleteCaseType('Treated')
    await worklist.editTreatment('B12');
    await worklist.editTreatment ('EPO');
    await worklist.editTreatment('IV Iron');
})

test('test surgical number of doses autopopulates', async ({ page }) => {
   
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
    await worklist.searchMRN('Emily Smith');
    await worklist.selectPatientfromSearch('Emily Smith');
    await worklist.clickCompleteCase();
    await worklist.changeCompleteCaseType('Not Treated');
    await worklist.notTreatedFollowUp();
    await worklist.changeCompleteCaseType('Treated');
    await worklist.editTreatment('B12');
    await worklist.editTreatment ('EPO');
    await worklist.editTreatment('IV Iron');
})