import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import WorklistPage from './classes/worklistPage';
import PatientsPage from './classes/patientsPage';
const logindata = JSON.parse(JSON.stringify(require("../mbhpages/testdata/login.json")))

test('labvalue', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');
    
    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.searchMRN('Betty');
    await worklist.selectPatientfromSearch('Betty Rubble');
    
    const patients = new PatientsPage(page);
    await patients.viewAllLabs('Hgb','NULL');
    await patients.editSearchedLab('2.49999', '2024','February','27');
    await patients.patientVerify(1);
    await patients.saveEditedLab();
    await patients.closeSearchListWindow();
    await patients.selectPatients();
    await patients.searchPatient('Betty');
    await patients.selectPatientfromSearch('Betty Rubble');
    await patients.latestLabs();
    await patients.patientVerify(2);

})