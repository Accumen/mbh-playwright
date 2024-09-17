import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import WorklistPage from './classes/worklistPage';
import PatientsPage from './classes/patientsPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))

test('edit patient non surgical', async ({ page }) => {
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
    await worklist.searchMRN('58585')
    await worklist.selectPatientfromSearch('Clark Kent');
    await worklist.editPatientDetails('Changed Race and Ethnicity')
    await worklist.editPatientRace('White');
    await worklist.editPatientEthnicity('Not Hispanic');
    await worklist.saveEditPatient();
    await worklist.selectPatientDetails();
    await worklist.selectChainofCustody();
})

test('edit patient surgical', async ({ page }) => {
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
    await worklist.searchMRN('5554465')
    await worklist.selectPatientfromSearch('Betsy Jones');
    await worklist.editPatientDetails('Changed Race and Ethinicity')
    await worklist.editPatientRace('White');
    await worklist.editPatientEthnicity('Not Hispanic');
    await worklist.saveEditPatient();
    await worklist.selectPatientDetails();
    await worklist.selectChainofCustody(); 
})

test('verify latest labs', async ({ page }) => {
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
    await worklist.searchMRN('5554465')
    await worklist.selectPatientfromSearch('Betsy Jones');
    await worklist.latestlabs()
})

