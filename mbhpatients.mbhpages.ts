import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import PatientsPage from './classes/patientsPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))


test('filter patients labs', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient('Rubble');
    await patients.selectPatientfromSearch('Betty Rubble');
    await patients.viewAllLabs('Hgb','2023','Dec','28','2024','Mar','7');
    await patients.patientVerify(1);

})

test('add patients lab', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient('Terrell');
    await patients.selectPatientfromSearch('Terrell Jack');
    await patients.addLabs('test lab type', '123', '2024', 'JUL', '3')

})

test('delete patients lab', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient('Terrell');
    await patients.selectPatientfromSearch('Terrell Jack');
    await patients.viewAllLabs('test lab type','NULL');
    await patients.deleteSearchedLab('test lab type');
    await patients.patientVerify(2);
    await patients.closeSearchListWindow();
    await patients.viewAllLabs('test lab type','NULL');
})

test('patient surgical visit', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
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

test('patients non-surgical visit', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
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

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
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
    await patients.clearSelections();
    await patients.searchPatient('Rubble');
    await patients.selectPatientfromSearch('Barney Rubble');
    await patients.viewVisit();
    await patients.assignButton();
    await patients.assignVisit('Test User');
    await patients.saveAssigned();
})

test('unassign visit', async ({page})=>{
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
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
    await patients.assignButton();
    await patients.unAssign();
})

test('edit visit pcp/surgeon/treatment center/facility', async ({page})=>{

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
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

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
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
    await patients.seeAnemiaManagement();
    await patients.seeAllergies();
    await patients.seeChainofCustody();
})

test('add communication', async({page})=>{
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
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

test('edit communication', async({page})=>{
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
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
    await patients.editMessage('edited playwright test message');
    await patients.editPriority('Medium');
    await patients.editResolveDate('September 29');
    await patients.saveCommEdits();
    await patients.replyCommunication('This reply is a playwright test.','yes');
    })

    test('reply to communication', async({page})=>{
        test.slow();
        const login = new LoginPage(page);
    
        await page.goto('https://qa-auto-base.mybloodhealth.com/login');
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
        await patients.replyCommunication('This reply is a playwright test.','yes');
        })


