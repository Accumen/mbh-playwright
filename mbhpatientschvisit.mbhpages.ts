import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import PatientsPage from './classes/patientsPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))

test('patient surgical visit', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient('smith');
    await patients.selectPatientfromSearch('Pammi Smiths');
    await patients.patientschedulesurgical('2024','March','29',8,'CARDIO','test','QA Facility 1');
})

test('patients chronic visit', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient('Smith');
    await patients.selectPatientfromSearch('Smith');
    await patients.patientsschedulechronic('2024','Apr','4',15,'CHRONIC MEDICAL FOLLOW UP','test','QA Facility 1');
   
})

test('view / assign visit', async ({page})=> {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient('Rubble');
    await patients.selectPatientfromSearch('Barney Rubble');
    await patients.backarrow();
    await patients.searchPatient('Rubble');
    await patients.clearSelections();
    await patients.searchPatient('Rubble');
    await patients.selectPatientfromSearch('Barney Rubble');
    await patients.viewVisit();
    await patients.assignVisit('Test User');
    await patients.saveAssigned();
})

test('unassign visit', async ({page})=>{
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient('Rubble');
    await patients.selectPatientfromSearch('Barney Rubble');
    await patients.viewVisit();
    await patients.assignVisit('Test User');
    //await patients.closeAssignWindow(); uncomment when the close window button has a label
    await patients.unAssign();
    await patients.selectPatients();
    await patients.searchPatient('Rubble');
    await patients.selectPatientfromSearch('Barney Rubble');
    await patients.viewVisit();

})

test('edit visit pcp/surgeon/treatment center/facility', async ({page})=>{

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient('Rubble');
    await patients.selectPatientfromSearch('Barney Rubble');
    await patients.viewVisit();
    await patients.editPCP('test');
    await patients.editSurgeon('test');
    await patients.editFacility('QA Facility 2');
    await patients.editCenter('test location (QA1)');
})

test ('open drop downs on patient visit', async ({page})=>{

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient('Rubble');
    await patients.selectPatientfromSearch('Barney Rubble');
    await patients.viewVisit();
    await patients.seePatientDetails();
    await patients.seeMedications();
    await patients.seeAllergies();
    await patients.seeChainofCustody();
})