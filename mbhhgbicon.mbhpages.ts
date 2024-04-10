import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import WorklistPage from './classes/worklistPage';
import PatientsPage from './classes/patientsPage';

test('Hgb icon match', async ({ page }) => {
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
    await worklist.clickChronic();
    await worklist.searchMRN('Betty');
    await worklist.worklistscreenshot(1);
    await worklist.selectPatientfromSearch('Betty Rubble');
    await worklist.worklistscreenshot(2);

    const patients = new PatientsPage(page);
    await patients.viewAllLabs('Hgb','NULL');
    await patients.patientVerify(1);
    
})