import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import WorklistPage from './classes/worklistPage';
import PatientsPage from './classes/patientsPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))

test('Non-surgical schedule new patient visit', async ({ page }) => {
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
    await worklist.clickChronic();
    await worklist.scheduleChronicVisit('New', 'June', 'Smith', '', '987654321','2000','JAN','18','5656678945','568 Willowbrook rd', 'Broomall',
    'PA','19008', 'Female','White','Not Hispanic','yes','25', '2024','MAR', '25', 10,
        'CHRONIC MEDICAL', 'test')
    await worklist.saveScheduledVisit();
})

test('export non-surgical worklist', async ({ page }) => {

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
    await worklist.exportVisits();
  })

  test('Non-Surgical Worklist Badge', async ({ page }) => {

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
    await patient.worklistBadge('301');
  })

  test('Non-surgical Hgb icon match', async ({ page }) => {
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
    await worklist.searchMRN('Betty');
    await worklist.selectPatientfromSearch('Betty Rubble');

    const patients = new PatientsPage(page);
    await patients.viewAllLabs('Hgb','NULL');
})

test('Non-Surgical edit patient height and weight', async ({ page }) => {
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

test('non-surgical edit toggles', async ({ page }) => {
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
    await worklist.searchMRN('5554465')
    await worklist.selectPatientfromSearch('Betsy Jones');
    await worklist.invasiveToggle();
    await worklist.bloodlessToggle();
  })
  
  test('Non-surgical view patient details dropdown', async ({ page }) => {
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
    await worklist.searchMRN('789456123')
    await worklist.selectPatientfromSearch('Emily Smith');
    await worklist.selectPatientDetails();
  })

  test('filter non-surgical worklist', async ({ page }) => {

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
    await worklist.searchMRN('12655473');
    await worklist.unselectAllCaseTypes();
    await worklist.selectCaseType('CARDIO');
    await worklist.selectFilter('Urgent');  
  })
  
  test('add non-surgical communication', async ({ page }) => {
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
    await worklist.searchMRN('1478523690')
    await worklist.selectPatientfromSearch('Jerry Springer');
    await worklist.addcommunication('Comment','Testing for ticket MBHS-1187',
      'Low',2024,'JUNE',14)
  
  })
  
  test('edit non-surgical communication', async ({ page }) => {
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
    await worklist.searchMRN('1478523690');
    await worklist.selectPatientfromSearch('Jerry Springer');
    await worklist.editcommunication('Comment','Testing for ticket MBHS-1187',
      'Medium',2024,'JUNE',12)
  
    })
  
    test('delete non-surgical communication', async ({ page }) => {
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
      await worklist.searchMRN('789456123');
      await worklist.selectPatientfromSearch('Emily Smith');
      await worklist.deleteCommunication();    
      })
  
    test('search non-surgical worklist', async ({ page }) => {
  
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
      await worklist.searchMRN('Rubble');
    })

    test("Non-surgical worklist filter", async({page})=>{
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
        await worklist.clickChronic();
        await worklist.selectFilter("Labs Missing");
      })
      
      test('non-surgical worklist date range filter', async ({ page }) => {
      
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
        await worklist.sortByDateRange('2024','APR','12','2024','APR','13');
      })
      
      test('non-surgical worklist case type filter', async ({ page }) => {
      
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
        await worklist.unselectAllCaseTypes();
        await worklist.selectCaseType('CHRONIC MEDICAL');
      })
      
      test('non surgical worklist filter retention test', async ({ page }) => {
      
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
        await worklist.unselectAllCaseTypes();
        await worklist.selectCaseType("WOMEN'S HEALTH- CHRONIC");
        await worklist.selectPatientfromSearch('Betty Rubble');
        await worklist.backarrow();
      })
      
      test('non-surgical worklist pagination retention', async ({ page }) => {
      
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
      
      test('non-surgical worklist row counter', async ({ page }) => {
      
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
        await worklist.paginationCheck();
        await worklist.adjustRowCount('30');
      })

      test('clear expired visits from non-surgical worklist', async ({ page }) => {
      
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
        await worklist.clearExpiredVisits();
      })