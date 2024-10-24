import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import WorklistPage from './classes/worklistPage';
import PatientsPage from './classes/patientsPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))
const elv = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/editlabvalue.json")))
const altpv = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/addlabtopatientvisit.json")))
const dlfpv = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/deletelabfrompatientvisit.json")))

test('edit lab value', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(elv.optionClient);
    
    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.searchMRN(elv.searchInfo);
    await worklist.selectPatientfromSearch(elv.patient);
    
    const patients = new PatientsPage(page);
    await patients.viewAllLabs(elv.labtype,elv.startyear);
    await patients.editSearchedLab(elv.result, elv.resultyear,elv.resultmonth,elv.resultday);
    await patients.saveEditedLab();
    await patients.closeSearchListWindow();
    await worklist.selectChainofCustody();
    await worklist.worklistscreenshot(1);
    await patients.selectPatients();
    await patients.searchPatient(elv.patient);
    await patients.selectPatientfromSearch(elv.patient);
    await patients.latestLabs();
})

test('add lab to patient visit', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(altpv.optionClient);
    
    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.searchMRN(altpv.searchInfo);
    await worklist.selectPatientfromSearch(altpv.patient);
    await worklist.addlab(altpv.labtype,altpv.result,altpv.resultyear,altpv.resultmonth,altpv.resultday);
    await worklist.selectChainofCustody();
})

test('delete lab from patient visit', async ({page}) => {
    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(dlfpv.optionClient);
    
    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.searchMRN(dlfpv.searchInfo);
    await worklist.selectPatientfromSearch(dlfpv.patient);
    
    const patients = new PatientsPage (page);
    await patients.viewAllLabs(dlfpv.labtype,dlfpv.startyear);
    await patients.deleteSearchedLab(dlfpv.labtype);
    await patients.closeSearchListWindow();
    await worklist.selectChainofCustody();

})
