import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import WorklistPage from './classes/worklistPage';
import PatientsPage from './classes/patientsPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))

test('surgical shedule new patient visit', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail('cts-secure@accumen.com');
    await login.enterPassword('Pass#123');
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.scheduleSurgicalVisit('New', 'nTreated', '', 'Follow', '', '789459','2022','MAR','10','6101231234','568 Willowbrook rd', 'Broomall',
    'PA','19008', 'Female','White','Not Hispanic','no','MAY 31','no','','','','2024', 'MAY', '31', 5,
        'CARDIO', 'test');
    await worklist.saveScheduledVisit();
})

test('surgical schedule existing patient visit', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail('cts-secure@accumen.com');
    await login.enterPassword('Pass#123');
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.scheduleSurgicalVisit('Existing','','','','','651324','','','','','','','','','','','',
        '','','no','','','','2024','SEPT','28',13,'SPINE','test');
    await worklist.saveScheduledVisit()
})

test('export surgical worklist', async ({ page }) => {

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
  await worklist.exportVisits();
})

test('Surgical Worklist Ferritin Badge', async ({ page }) => {

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
  await worklist.clickChronic();
  await worklist.searchMRN('Smith');
  await worklist.selectPatientfromSearch('August Smith');
  
  const patient = new PatientsPage(page);
  await patient.viewAllLabs('Ferritin','NULL');
  await patient.editSearchedLab('301','2024','SEP','1');
  await patient.saveEditedLab();
  await patient.closeSearchListWindow();
  await patient.ferritinWorklistBadge('301');
})

test('Surgical Hgb icon match', async ({ page }) => {
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
  await worklist.searchMRN('Betty');
  await worklist.selectPatientfromSearch('Betty Rubble');

  const patients = new PatientsPage(page);
  await patients.viewAllLabs('Hgb','NULL');
  await patients.hgbWorklistBadge();
})

test('Surgical edit patient height and weight', async ({ page }) => {
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

test('Surgical edit toggles', async ({ page }) => {
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
await worklist.searchMRN('5554465')
await worklist.selectPatientfromSearch('Betsy Jones');
await worklist.invasiveToggle();
await worklist.bloodlessToggle();
})

test('view surgical patient details dropdown', async ({ page }) => {
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
await worklist.searchMRN('789456123')
await worklist.selectPatientfromSearch('Emily Smith');
await worklist.selectPatientDetails();
})

test('filter surgical worklist', async ({ page }) => {

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
    await worklist.searchMRN('12655473');
    await worklist.unselectAllCaseTypes();
    await worklist.selectCaseType('CARDIO');
    await worklist.selectFilter('Urgent');
    await dashboard.clickLogout();  
  })
  
  test('add surgical communication', async ({ page }) => {
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
    await worklist.searchMRN('1478523690')
    await worklist.selectPatientfromSearch('Jerry Springer');
    await worklist.addcommunication('Comment','Testing for ticket MBHS-1187',
      'Low',2024,'JUNE',14)
  
  })
  
  test('edit surgical communication', async ({ page }) => {
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
    await worklist.searchMRN('1478523690');
    await worklist.selectPatientfromSearch('Jerry Springer');
    await worklist.editcommunication('Comment','Testing for ticket MBHS-1187',
      'Medium',2024,'JUNE',12)
  
    })
  
    test('delete surgical communication', async ({ page }) => {
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
      await worklist.searchMRN('789456123');
      await worklist.selectPatientfromSearch('Emily Smith');
      await worklist.deleteCommunication();    
      })
  
    test('search surgical worklist', async ({ page }) => {
  
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
      await worklist.searchMRN('Rubble');
    })
    
    test('export surgical worklist after filter', async ({ page }) => {
  
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
      await worklist.sortByDateRange('2024','NOV','12','2024','NOV','12');
      await worklist.exportVisits();
    })

  test("surgical worklist filter", async({page})=>{
    test.slow();//changes default timeout from 30000 ms to 90000 ms
    const login = new LoginPage (page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage (page);
    await dashboard.clickClientDropDown("QA Testing");
  
    const worklist = new WorklistPage (page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.selectFilter("Labs Missing");
  })
  
  test('surgical worklist date range filter', async ({ page }) => {
  
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
    await worklist.sortByDateRange('2024','APR','12','2024','APR','13');
  })
  
  test('surgical worklist case type filter', async ({ page }) => {
  
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
    await worklist.unselectAllCaseTypes();
    await worklist.selectCaseType('THORACIC');
  })
  
  test('surgical worklist filter retention', async ({ page }) => {
  
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
    await worklist.unselectAllCaseTypes();
    await worklist.selectCaseType('SPINE');
    await worklist.selectPatientfromSearch('Barney Rubble');
    await worklist.backarrow();
  })
  
  test('surgical worklist pagination retention', async ({ page }) => {
  
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
    await worklist.worklistPagination('3');
    await worklist.selectPatientfromSearch('John Smith');
    await worklist.backarrow();
    await worklist.paginationCheck();
  })
  
  test('surgical worklist row counter', async ({ page }) => {
  
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
    await worklist.paginationCheck();
    await worklist.adjustRowCount('30');
  })

  test('clear expired visits from surgical worklist', async ({ page }) => {
      
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
    await worklist.clearExpiredVisits();
  })