import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import PatientsPage from './classes/patientsPage';
import WorklistPage from './classes/worklistPage';
const logindata = JSON.parse(JSON.stringify(require("../mbhpages/testdata/login.json")))


test('filter patients labs', async ({ page }) => {

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
    await patients.selectPatientfromSearch('Betty Rubble');
    await patients.viewAllLabs('Hgb','2023','Dec','28','2024','Mar','7');
    await patients.patientVerify(1);

})

test('delete patients lab', async ({ page }) => {

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
    await patients.selectPatientfromSearch('Betty Rubble');
    await patients.viewAllLabs('WBC','NULL');
    await patients.deleteSearchedLab('WBC');
    await patients.patientVerify(2);
    await patients.closeSearchListWindow();
    
})