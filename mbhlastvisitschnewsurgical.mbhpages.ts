import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import WorklistPage from './classes/worklistPage';
import PatientsPage from './classes/patientsPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))

test('surgical visit', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.scheduleSurgicalVisit('New', 'Tom', '', 'Hanks', '', '1597534268','1962','MAR','10','6101231234','568 Willowbrook rd', 'Broomall',
    'PA','19008', 'Male','White','Not Hispanic','No','May 20','No','','','','2024', 'MAY', '28', 5,
        'CARDIO', 'test');
    await worklist.saveScheduledVisit();

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient('1597534268');
    await patients.patientVerify(1);
    await patients.selectPatientfromSearch('Tom Hanks');

})