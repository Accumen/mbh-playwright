import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import WorklistPage from './classes/worklistPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))

test('edit patient height and weight', async ({ page }) => {
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
    await worklist.clickChronic();
    await worklist.searchMRN('657984')
    await worklist.selectPatientfromSearch('Jack Black');
    await worklist.editPatientDetails('Updated Height and Weight')
    await worklist.editPatientHeight('63.4');
    await worklist.editPatientWeight('117.56');
    await worklist.saveEditPatient();
    await worklist.editPatientHeight('-63');
    await worklist.editPatientWeight('-118');
    await worklist.saveEditPatient();      
    await worklist.editPatientHeight('63');
    await worklist.editPatientWeight('118');
    await worklist.saveEditPatient();   
})

test('edit toggles', async ({ page }) => {
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
    await worklist.searchMRN('5554465')
    await worklist.selectPatientfromSearch('Betsy Jones');
    await worklist.invasiveToggle();
    await worklist.bloodlessToggle();


})
