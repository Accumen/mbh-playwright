import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import PatientsPage from './classes/patientsPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))
const clientlogindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/clientlogin.json")))

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
    await patients.searchPatient('Emily');
    await patients.selectPatientfromSearch('Emily Smith');
    await patients.patientschedulesurgical('2024','SEP','28',8,'ORTHO','test','QA Facility 1');
})

test('patient surgical visit client user', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(clientlogindata.email);
    await login.enterPassword(clientlogindata.password);
    await login.clickLoginBtn();

    //const dashboard = new DashboardPage(page);
    //await dashboard.clickClientDropDown('QA Testing');

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient('Emily');
    await patients.selectPatientfromSearch('Emily Smith');
    await patients.patientschedulesurgical('2024','NOV','28',8,'ORTHO','test','QA Facility 1');
})

test('patients non-surgical visit', async ({ page }) => {
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
    await patients.searchPatient('Emily');
    await patients.selectPatientfromSearch('Emily Smith');
    await patients.patientsschedulechronic('2024','SEP','28',15,'CHRONIC MEDICAL FOLLOW UP','test','QA Facility 1');
   
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

test('assign/unassign visit', async ({page})=>{
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
    await patients.saveAssigned();
    await patients.selectPatients();
    await patients.searchPatient('Rubble');
    await patients.selectPatientfromSearch('Barney Rubble');
    await patients.viewVisit();
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

test('edit communication', async({page})=>{
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
    await patients.editCommunication();
    await patients.editCommType('Task');
    await patients.editMessage('playwright test message');
    await patients.editPriority('Low');
    await patients.editResolveDate('June 24');
    await patients.saveCommEdits();
    await patients.replyCommunication('This reply is a playwright test.','yes');
    })

test('add communication', async({page})=>{
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
    await patients.addCommunication('Task','Playwright Test','Low','June 28');
})

test('visit view all labs by labtype filter', async ({page})=>{
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
    await patients.viewAllLabs('Hgb','NULL');

})