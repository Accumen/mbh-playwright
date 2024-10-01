import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import PatientsPage from './classes/patientsPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))
const addpatient = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/addpatient.json")))
const editpatient = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/editpatient.json")))


test('add patient', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(addpatient.optionClient);

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.addPatient(addpatient.fname,addpatient.lname,addpatient.mrn,addpatient.hhYear,addpatient.hhMonth,addpatient.hhDay,
        addpatient.gender,addpatient.race,addpatient.ethnicity,addpatient.dobyear,addpatient.dobmonth,addpatient.dobday,addpatient.hippa,addpatient.phone,
    addpatient.street,addpatient.city,addpatient.state,addpatient.zipcode,addpatient.height,addpatient.weight);
    await patients.savePatient();
})

test('new patient height and weight test', async ({ page }) => {

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
    await patients.addPatient('Nacho','Libre','365524987','2024','April','25','Male','Other Race','Hispanic','1988','January','18','no','2673196195',
    '123 Monk House rd','Nowhere','NM','19008','63.4','117.56');
    await patients.editPatientHeight('-63');
    await patients.editPatientWeight('-117')
    await patients.editPatientHeight('63');
    await patients.editPatientWeight('117');
    await patients.savePatient();
})

test('edit patient', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(editpatient.optionClient);

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient(editpatient.patient);
    await patients.selectPatientfromSearch(editpatient.patient);
    await patients.editPatientDetails(editpatient.changeDesc);
    await patients.editPatientRace(editpatient.race);
    await patients.editPatientEthnicity(editpatient.ethnicity);
    await patients.editPatientHeight(editpatient.height);
    await patients.editPatientWeight(editpatient.weight);
    await patients.savePatient();
})

test('check patient details', async ({ page }) => {

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
    await patients.searchPatient('Jack');
    await patients.selectPatientfromSearch('Jack Black');
    await patients.hoverPatientDetails();
    await patients.patientVerify(1);

})