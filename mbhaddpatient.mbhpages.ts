import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import PatientsPage from './classes/patientsPage';
import WorklistPage from './classes/worklistPage';


test('addpatient', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail('cts-secure@accumen.com');
    await login.enterPassword('Iu$24680');
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.addPatient('Barney','Rubble','651325','2024','March','25','Male','1970','May','23','yes','2548879845',
    '881 Dinosaur Way','Bedrock','CA','56795');
    await patients.savePatient();
    await patients.searchPatient('651325');
    await patients.selectPatientfromSearch('Barney Rubble');
    await patients.patientschedulesurgical('2024','May','12',13,'SPINE','test','QA Facility 1');

})