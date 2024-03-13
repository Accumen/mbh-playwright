import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import WorklistPage from './classes/worklistPage';
import PatientsPage from './classes/patientsPage';

test('surgical visit', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail('cts-secure@accumen.com');
    await login.enterPassword('Iu$24680');
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.scheduleSurgicalVisit('New', 'June', '', 'Smith', '', '123654789','2022','MAR','10','6101231234','568 Willowbrook rd', 'Broomall',
    'PA','19008', 'Male','No','','2024', 'MAR', '28', 5,
        'CARDIO', 'test');
    await worklist.saveScheduledVisit();

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient('123654789');
    await patients.patientVerify('June Smith');

})