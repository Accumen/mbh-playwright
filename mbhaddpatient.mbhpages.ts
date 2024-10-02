import { test} from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import PatientsPage from './classes/patientsPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))
const ap = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/addpatient.json")))
const ep = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/editpatient.json")))
const nphw = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/newpatienthw.json")))
const vpd = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/viewpatientdetails.json")))

test('add patient', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(ap.optionClient);

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.addPatient(ap.fname,ap.lname,ap.mrn,ap.hhYear,ap.hhMonth,ap.hhDay,
        ap.gender,ap.race,ap.ethnicity,ap.dobyear,ap.dobmonth,ap.dobday,ap.hippa,ap.phone,
    ap.street,ap.city,ap.state,ap.zipcode,ap.height,ap.weight);
    await patients.savePatient();
})

test('new patient height and weight', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(nphw.optionClient);

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.addPatient(nphw.fname,nphw.lname,nphw.mrn,nphw.hhYear,nphw.hhMonth,nphw.hhDay,
    nphw.gender,nphw.race,nphw.ethnicity,nphw.dobyear,nphw.dobmonth,nphw.dobday,nphw.hippa,
    nphw.phone,nphw.street,nphw.city,nphw.state,nphw.zipcode,nphw.height,nphw.weight);
    await patients.editPatientHeight(nphw.height2);
    await patients.editPatientWeight(nphw.weight2)
    await patients.editPatientHeight(nphw.height3);
    await patients.editPatientWeight(nphw.weight3);
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
    await dashboard.clickClientDropDown(ep.optionClient);

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient(ep.patient);
    await patients.selectPatientfromSearch(ep.patient);
    await patients.editPatientDetails(ep.changeDesc);
    await patients.editPatientRace(ep.race);
    await patients.editPatientEthnicity(ep.ethnicity);
    await patients.editPatientHeight(ep.height);
    await patients.editPatientWeight(ep.weight);
    await patients.savePatient();
})

test('view patient details', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(vpd.optionClient);

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient(vpd.patient);
    await patients.selectPatientfromSearch(vpd.patient);
    await patients.hoverPatientDetails();
})