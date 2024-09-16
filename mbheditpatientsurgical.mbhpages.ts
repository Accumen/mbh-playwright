import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import WorklistPage from './classes/worklistPage';
import PatientsPage from './classes/patientsPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))

test('edit patient surgical', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail('cts-secure@accumen.com');
    await login.enterPassword('Pass#123');
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
    await login.enterEmail('cts-secure@accumen.com');
    await login.enterPassword('Pass#123');
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

test('verify latest labs after add', async ({ page }) => {
    test.slow();
    test.setTimeout(120000);
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail('cts-secure@accumen.com');
    await login.enterPassword('Pass#123');
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.scheduleSurgicalVisit('New', 'Denzel', '', 'Washington', '', '871545674','1954','JUL','21','6103211234','2468 Main St', 'New York',
    'NY','10001', 'Male','Black or African American','Not Hispanic','No','May 20','No','','','','2024', 'MAY', '28', 5,
        'CARDIO', 'test');
    await worklist.saveScheduledVisit();
    await worklist.searchMRN('871545674');
    await worklist.selectPatientfromSearch('Denzel Washington');
    await worklist.addlab('Hgb','5.5','2024','APR','19');
    await worklist.latestlabs();
    await worklist.backarrow();
    await worklist.searchMRN('871545674');
    await worklist.selectPatientfromSearch('Denzel Washington');
    await worklist.latestlabs()

})