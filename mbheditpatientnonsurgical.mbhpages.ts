import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import WorklistPage from './classes/worklistPage';

test('edit patient non surgical', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail('cts-secure@accumen.com');
    await login.enterPassword('Pass#123');
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickChronic();
    await worklist.searchMRN('58585')
    await worklist.selectPatientfromSearch('Clark Kent');
    await worklist.editPatientDetails('Changed Race and Ethinicity')
    await worklist.editPatientRace('White');
    await worklist.editPatientEthnicity('Not Hispanic');
    await worklist.saveEditPatient();
    await worklist.selectPatientDetails();
    await worklist.selectChainofCustody();
    
})