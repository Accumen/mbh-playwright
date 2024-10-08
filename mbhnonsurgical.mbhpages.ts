import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import WorklistPage from './classes/worklistPage';
import PatientsPage from './classes/patientsPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))
const nssnpv = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/nonsurgicalschnewptvisit.json")))
const nssepv = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/nonsurgicalschexistingptvisit.json")))
const nswfb = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/nonsurgicalferritinbadge.json")))
const nshim = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/nonsurgicalhgbiconmatch.json")))
const nsepthtwt = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/nonsurgicaleditpthtwt.json")))
const nset = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/nonsurgicaledittoggles.json")))
const nsvpd = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/nonsurgicalviewptdetails.json")))
const fnsw = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/filternonsurgicalworklist.json")))
const ansc = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/addnonsurgicalcomm.json")))
const ensc = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/editnonsurgicalcomm.json")))

test('Non-surgical schedule new patient visit', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(nssnpv.optionClient);

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickChronic();
    await worklist.scheduleChronicVisit(nssnpv.patienttype, nssnpv.fname, nssnpv.lname, nssnpv.email, nssnpv.mrn,nssnpv.dobyear,nssnpv.dobMonth,nssnpv.dobDay,
      nssnpv.phone,nssnpv.street, nssnpv.city,nssnpv.state,nssnpv.zip,nssnpv.gender,nssnpv.race,nssnpv.ethnicity,nssnpv.hippa,nssnpv.hhMonthdd,
      nssnpv.pYear,nssnpv.pMonth,nssnpv.pDay,nssnpv.pclickcount,nssnpv.procedure,nssnpv.provider)
    await worklist.saveScheduledVisit();
})

test('Non-surgical schedule existing patient visit', async ({ page }) => {
  test.slow();
  const login = new LoginPage(page);

  await page.goto('https://qa-auto-base.mybloodhealth.com/login');
  await login.enterEmail(logindata.email);
  await login.enterPassword(logindata.password);
  await login.clickLoginBtn();

  const dashboard = new DashboardPage(page);
  await dashboard.clickClientDropDown(nssepv.optionClient);

  const worklist = new WorklistPage(page);
  await worklist.clickWorklist();
  await worklist.clickChronic();
  await worklist.scheduleChronicVisit(nssepv.patienttype,'','',nssepv.mrn,'','','','','','','','','','','',
      '','',nssepv.edit,'','','',nssepv.pYear,nssepv.pMonth,nssepv.pDay,nssepv.pclickcount,nssepv.procedure,nssepv.provider);
  await worklist.saveScheduledVisit()
})

test('export non-surgical worklist', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('Jefferson Health');
    
    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickChronic();
    await worklist.exportVisits();
  })

  test('Non-Surgical Worklist Ferritin Badge', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(nswfb.optionClient);
    
    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickChronic();
    await worklist.searchMRN(nswfb.searchInfo);
    await worklist.selectPatientfromSearch(nswfb.patient);
    
    const patient = new PatientsPage(page);
    await patient.viewAllLabs(nswfb.labtype,nswfb.startyear);
    await patient.editSearchedLab(nswfb.result,nswfb.resultyear,nswfb.resultmonth,nswfb.resultday);
    await patient.saveEditedLab();
    await patient.closeSearchListWindow();
    await patient.ferritinWorklistBadge(nswfb.result);
  })

  test('Non-surgical Hgb icon match', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(nshim.optionClient);
    
    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickChronic();
    await worklist.searchMRN(nshim.searchInfo);
    await worklist.selectPatientfromSearch(nshim.patient);

    const patients = new PatientsPage(page);
    await patients.viewAllLabs(nshim.labtype,nshim.startyear);
    await patients.closeSearchListWindow();
    await patients.hgbWorklistBadge();
})

test('Non-Surgical edit patient height and weight', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(nsepthtwt.optionClient);

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickChronic();
    await worklist.searchMRN(nsepthtwt.searchInfo);
    await worklist.selectPatientfromSearch(nsepthtwt.patient);
    await worklist.editPatientDetails(nsepthtwt.changeDesc);
    await worklist.editPatientHeight(nsepthtwt.height);
    await worklist.editPatientWeight(nsepthtwt.weight);
    await worklist.saveEditPatient();
    await worklist.editPatientHeight(nsepthtwt.height2);
    await worklist.editPatientWeight(nsepthtwt.weight2);
    await worklist.saveEditPatient();      
    await worklist.editPatientHeight(nsepthtwt.height3);
    await worklist.editPatientWeight(nsepthtwt.weight3);
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
    await dashboard.clickClientDropDown(nset.optionClient);
  
    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickChronic();
    await worklist.searchMRN(nset.searchInfo)
    await worklist.selectPatientfromSearch(nset.patient);
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
    await dashboard.clickClientDropDown(nsvpd.optionClient);
  
    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickChronic();
    await worklist.searchMRN(nsvpd.searchInfo)
    await worklist.selectPatientfromSearch(nsvpd.patient);
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
    await dashboard.clickClientDropDown(fnsw.optionClient);
    
    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickChronic();
    await worklist.unselectAllCaseTypes();
    await worklist.selectCaseType(fnsw.casetype);
    await worklist.selectFilter(fnsw.filter);  
  })
  
  test('add non-surgical communication', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);
  
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(ansc.optionClient);
  
    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickChronic();
    await worklist.searchMRN(ansc.searchInfo)
    await worklist.selectPatientfromSearch(ansc.patient);
    await worklist.addcommunication(ansc.comtype,ansc.comment,ansc.priority,ansc.resolveyear,ansc.resolvemonth,ansc.resolveday);
  })
  
  test('edit non-surgical communication', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);
  
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(ensc.optionClient);
  
    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickChronic();
    await worklist.searchMRN(ensc.searchInfo);
    await worklist.selectPatientfromSearch(ensc.patient);
    await worklist.editcommunication(ensc.comtype,ensc.comment,ensc.priority,ensc.resolveyear,ensc.resolvemonth,ensc.resolveday);
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

      test('non-surgical worklist status filter', async ({ page }) => {
      
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
        await worklist.selectStatus('Follow Up');
      })
      
      test('non surgical worklist filter retention', async ({ page }) => {
      
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
        await worklist.selectFilter('Anemic');
        await worklist.selectPatientfromSearch('Jacky Batcheldor');
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
        await worklist.adjustRowCount('15');
      })

      test('clear expired visits', async ({ page }) => {
      
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