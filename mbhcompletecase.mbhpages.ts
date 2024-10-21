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
const cnstfu = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/completenonsurgicaltreatedfu.json")))
const cnsntnfu = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/completenonsurgicalnottreatedwofu.json")))
const cnsntfu = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/completenonsurgicalnottreatedfu.json")))
const ecnsv = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/editcompletenonsurgicalvisit.json")))
const nsfui = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/nonsurgicalfollowupicon.json")))

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
    await dashboard.clickClientDropDown(cnstfu.optionClient);

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickChronic();
    await worklist.clickFacility(cnstfu.fromfacility,cnstfu.tofacility)
    await worklist.searchMRN(cnstfu.searchInfo);
    await worklist.selectPatientfromSearch(cnstfu.patient);
    await worklist.completeNonSurgicalVisit(cnstfu.completeType,cnstfu.treatment,'',cnstfu.followup,'','','',cnstfu.fyear,cnstfu.fmonth,cnstfu.fday);
    await worklist.selectChainofCustody();
})

test('complete nonsurgical not treated no followup', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(cnsntnfu.optionClient);

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickChronic();
    await worklist.clickFacility(cnsntnfu.fromfacility,cnsntnfu.tofacility);
    await worklist.searchMRN(cnsntnfu.searchInfo);
    await worklist.selectPatientfromSearch(cnsntnfu.patient);
    await worklist.completeNonSurgicalVisit(cnsntnfu.completeType,'',cnsntnfu.untreatedtype,cnsntnfu.followup,'','','','','','');
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
    await dashboard.clickClientDropDown(cnsntfu.optionClient);

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickChronic();
    await worklist.clickFacility(cnsntfu.fromfacility,cnsntfu.tofacility);
    await worklist.searchMRN(cnsntfu.searchInfo);
    await worklist.selectPatientfromSearch(cnsntfu.patient);
    await worklist.completeNonSurgicalVisit(cnsntfu.completeType,'',cnsntfu.untreatedtype,cnsntfu.followup,'','',
    cnsntfu.specialty,cnsntfu.fyear,cnsntfu.fmonth,cnsntfu.fday)
    await worklist.selectChainofCustody();
})

test('edit complete non-surgical visit', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(ecnsv.optionClient);

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickChronic();
    await worklist.clickFacility(ecnsv.fromfacility,ecnsv.tofacility)
    await worklist.searchMRN(ecnsv.searchInfo)
    await worklist.selectPatientfromSearch(ecnsv.patient);
    await worklist.clickCompleteCase();
    await worklist.changeCompleteCaseType(ecnsv.completedType);
    await worklist.notTreatedFollowUp();
    await worklist.changeCompleteCaseType(ecnsv.completedType2);
    await worklist.editTreatment(ecnsv.treatment);
})

test('test nonsurgical followup icon', async ({ page }) => {
    
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(nsfui.optionClient);

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickChronic();
    await worklist.clickFacility(nsfui.fromfacility,nsfui.tofacility)
    await worklist.searchMRN(nsfui.searchInfo);
    await worklist.selectPatientfromSearch(nsfui.patient);
    await worklist.completeNonSurgicalVisit(nsfui.completedType,nsfui.treatment,'',nsfui.followup,'','','',nsfui.fyear,nsfui.fmonth,nsfui.fday);
    await worklist.backarrow();
    await worklist.selectPatientfromSearch(nsfui.patient)
    await worklist.selectChainofCustody();
    await worklist.backarrow();
    await worklist.selectStatus(nsfui.status);
    await worklist.selectPatientfromSearch(nsfui.patient);
    await worklist.selectChainofCustody();
    await worklist.backarrow();
    await worklist.selectStatus(nsfui.status2);
    await worklist.hoverSearch(nsfui.searchInfo);
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