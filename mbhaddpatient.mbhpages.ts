import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import PatientsPage from './classes/patientsPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))


test('addpatient', async ({ page }) => {

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
    await patients.addPatient('Donald','Duck','859423','2024','June','25','Male','White','Not Hispanic','1987','May','16','yes','2548879845',
    '543 Waddle Way','Bedrock','CA','56795','68','156');
    await patients.savePatient();
    await patients.searchPatient('859423');
    await patients.selectPatientfromSearch('Donald Duck');
    await patients.patientschedulesurgical('2024','July','12',13,'SPINE','test','QA Facility 1');

})

test('add edit patient', async ({ page }) => {

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
    await patients.addPatient('Emily','Smith','789456123','2024','April','25','Female','Other Race','Unknown','1999','October','18','no','7539511234',
    '568 Willowbrook rd','Broomall','PA','19008','76','256');
    await patients.savePatient();

    await patients.searchPatient('789456123');
    await patients.selectPatientfromSearch('Emily Smith');
    await patients.editPatientDetails('Changed Race and Ethnicity');
    await patients.editPatientRace('White');
    await patients.editPatientEthnicity('Not Hispanic')
    await patients.saveEditPatient();

})

test('new patient height and weight test', async ({ page }) => {

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
    await patients.addPatient('Nacho','Libre','365524987','2024','April','25','Male','Other Race','Hispanic','1988','January','18','no','2673196195',
    '123 Monk House rd','Nowhere','MX','19008','63.4','117.56');
    await patients.editPatientHeight('-63');
    await patients.editPatientWeight('-117')
    await patients.editPatientHeight('63');
    await patients.editPatientWeight('117');
    await patients.savePatient();
})