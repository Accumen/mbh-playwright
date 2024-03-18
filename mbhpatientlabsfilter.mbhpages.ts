import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import PatientsPage from './classes/patientsPage';
import WorklistPage from './classes/worklistPage';


test('filter patients labs', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://staging.mybloodhealth.com/login');
    await login.enterEmail('cts-secure@accumen.com');
    await login.enterPassword('Iu$24680');
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('Test Client');

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient('Smith');
    await patients.selectPatientfromSearch('Abbie K SMITH');
    await patients.viewAllLabs('Hgb','NULL');
    await patients.patientVerify();


})