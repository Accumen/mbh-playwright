import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import WorklistPage from './classes/worklistPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))
const cstwofu = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/completesurgicaltreatednofu.json")))
const cstf = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/completesurgicaltreatedfu.json")))
const csntwofu = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/completesurgicalnottreatednofu.json")))
const csntfu = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/completesurgicalnottreatedfu.json")))
const cnstnfu = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/completenonsurgicaltreatednofu.json")))

test('complete surgical treated no followup', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(cstwofu.optionClient);

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.searchMRN(cstwofu.searchInfo);
    await worklist.selectPatientfromSearch(cstwofu.patient);
    await worklist.completeSurgicalVisit(cstwofu.completeType,cstwofu.treatment,'',cstwofu.followup,'','','','');
    await worklist.selectChainofCustody();
})

test('complete surgical treated followup', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(cstf.optionClient);

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.searchMRN(cstf.searchInfo);
    await worklist.selectPatientfromSearch(cstf.patient);
    await worklist.completeSurgicalVisit(cstf.completeType,cstf.treatment,'',cstf.followup,cstf.specialty,cstf.fyear,cstf.fmonth,cstf.fday)

})

test('complete surgical not treated no followup', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(csntwofu.optionClient);

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.searchMRN(csntwofu.searchInfo);
    await worklist.selectPatientfromSearch(csntwofu.patient);
    await worklist.completeSurgicalVisit(csntwofu.completeType,'',csntwofu.untreatedtype,csntwofu.followup,'','','','');
    await worklist.selectChainofCustody();
})

test('complete surgical not treated followup', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(csntfu.optionClient);

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.searchMRN(csntfu.searchInfo);
    await worklist.selectPatientfromSearch(csntfu.patient);
    await worklist.completeSurgicalVisit(csntfu.completeType,'',csntfu.untreatedtype,csntfu.followup,csntfu.specialty,csntfu.fyear,
    csntfu.fmonth,csntfu.fday);
})

test('complete nonsurgical treated no followup', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(cnstnfu.optionClient);

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickChronic();
    await worklist.clickFacility(cnstnfu.fromfacility,cnstnfu.tofacility)
    await worklist.searchMRN(cnstnfu.searchInfo);
    await worklist.selectPatientfromSearch(cnstnfu.patient);
    await worklist.completeNonSurgicalVisit(cnstnfu.completedType,cnstnfu.treatment,'',cnstnfu.followup,cnstnfu.freason,cnstnfu.freasonfill,'','','','');
    await worklist.selectChainofCustody();


})

test('complete nonsurgical treated followup', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
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

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
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

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
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

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
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

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
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


test('test nonsurgical edit number of doses', async ({ page }) => {
   
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
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
    await worklist.changeCompleteCaseType('Treated')
    await worklist.editTreatment('IV Iron');
    await worklist.editDosage(3);
})

test('test surgical edit number of doses', async ({ page }) => {
   
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
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
    await worklist.changeCompleteCaseType('Treated');
    await worklist.editTreatment('B12');
    await worklist.editDosage(2)
})