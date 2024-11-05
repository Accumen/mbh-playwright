import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import WorklistPage from './classes/worklistPage';
import PatientsPage from './classes/patientsPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))
const ssnpv = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/surgicalschnewptvisit.json")))
const ssepv = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/surgicalschexistingptvisit.json")))
const esw = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/exportsurgicalworklist.json")))
const swfb = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/surgicalworklistferritinbadge.json")))
const shim = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/surgicalhgbiconmatch.json")))
const sephw = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/surgicaleditpthtwt.json")))
const set = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/surgicaledittoggles.json")))
const svpd = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/surgicalviewptdetails.json")))
const fsw = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/filtersurgicalworklist.json")))
const asc = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/addsurgicalcomm.json")))
const esc = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/editsurgicalcomm.json")))
const dsc = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/deletesurgicalcomm.json")))
const ssw = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/searchsurgicalworklist.json")))
const swf = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/surgicalworklistfilter.json")))
const swdf = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/surgicalworklistdatefilter.json")))
const sctf = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/surgicalcasetypefilter.json")))
const swfr = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/surgicalworklistfilterretention.json")))
const swpr = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/surgicalworklistpaginationretention.json")))
const swrc = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/surgicalworklistrowcounter.json")))
const scev = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/surgicalclearexpiredvisits.json")))
const sanvd = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/surgicaladdnotifyvisitdocument.json")))


test('surgical shedule new patient visit', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(ssnpv.optionClient);

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.scheduleSurgicalVisit(ssnpv.patienttype, ssnpv.fname, ssnpv.lname, ssnpv.mrn,ssnpv.dobyear,ssnpv.dobMonth,ssnpv.dobDay,
    ssnpv.phone,ssnpv.street,ssnpv.city,ssnpv.state,ssnpv.zip,ssnpv.gender,ssnpv.race,ssnpv.ethnicity,ssnpv.hippa,ssnpv.hhMonthdd,'','',
    '','',ssnpv.pYear, ssnpv.pMonth, ssnpv.pDay, ssnpv.pclickcount,ssnpv.procedure, ssnpv.surgeon);
    await worklist.saveScheduledVisit();
})

test('surgical schedule existing patient visit', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(ssepv.optionClient);

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.scheduleSurgicalVisit(ssepv.patienttype,'','',ssepv.mrn,'','','','','','','','','','','',
        '','',ssepv.edit,'','','',ssepv.pYear,ssepv.pMonth,ssepv.pDay,ssepv.pclickcount,ssepv.procedure,ssepv.surgeon);
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
  await dashboard.clickClientDropDown(esw.optionClient);
  
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
  await dashboard.clickClientDropDown(swfb.optionClient);
  
  const worklist = new WorklistPage(page);
  await worklist.clickWorklist();
  await worklist.clickSurgical();
  await worklist.searchMRN(swfb.searchInfo);
  await worklist.selectPatientfromSearch(swfb.patient);
  
  const patient = new PatientsPage(page);
  await patient.viewAllLabs(swfb.labtype,swfb.startyear);
  await patient.editSearchedLab(swfb.result,swfb.resultyear,swfb.resultmonth,swfb.resultday);
  await patient.saveEditedLab();
  await patient.closeSearchListWindow();
  await patient.ferritinWorklistBadge(swfb.result);
  await worklist.selectChainofCustody();
})

test('Surgical Hgb icon match', async ({ page }) => {
  test.slow();
  const login = new LoginPage(page);
  await page.goto('https://qa-auto-base.mybloodhealth.com/login');
  await login.enterEmail(logindata.email);
  await login.enterPassword(logindata.password);
  await login.clickLoginBtn();

  const dashboard = new DashboardPage(page);
  await dashboard.clickClientDropDown(shim.optionClient);
  
  const worklist = new WorklistPage(page);
  await worklist.clickWorklist();
  await worklist.clickSurgical();
  await worklist.searchMRN(shim.searchInfo);
  await worklist.selectPatientfromSearch(shim.patient);

  const patients = new PatientsPage(page);
  await patients.viewAllLabs(shim.labtype,shim.startyear);
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
  await dashboard.clickClientDropDown(sephw.optionClient);

  const worklist = new WorklistPage(page);
  await worklist.clickWorklist();
  await worklist.clickSurgical();
  await worklist.searchMRN(sephw.searchInfo)
  await worklist.selectPatientfromSearch(sephw.patient);
  await worklist.editPatientDetails(sephw.changeDesc);
  await worklist.editPatientHeight(sephw.height);
  await worklist.editPatientWeight(sephw.weight);
  await worklist.saveEditPatient();
  await worklist.editPatientHeight(sephw.height2);
  await worklist.editPatientWeight(sephw.weight2);
  await worklist.saveEditPatient();      
  await worklist.editPatientHeight(sephw.height3);
  await worklist.editPatientWeight(sephw.weight3);
  await worklist.saveEditPatient();   
  await worklist.selectChainofCustody();
})

test('Surgical edit toggles', async ({ page }) => {
test.slow();
const login = new LoginPage(page);

await page.goto('https://qa-auto-base.mybloodhealth.com/login');
await login.enterEmail(logindata.email);
await login.enterPassword(logindata.password);
await login.clickLoginBtn();

const dashboard = new DashboardPage(page);
await dashboard.clickClientDropDown(set.optionClient);

const worklist = new WorklistPage(page);
await worklist.clickWorklist();
await worklist.clickSurgical();
await worklist.searchMRN(set.searchInfo)
await worklist.selectPatientfromSearch(set.patient);
await worklist.invasiveToggle();
await worklist.bloodlessToggle();
await worklist.selectChainofCustody
})

test('view surgical patient details dropdown', async ({ page }) => {
test.slow();
const login = new LoginPage(page);

await page.goto('https://qa-auto-base.mybloodhealth.com/login');
await login.enterEmail(logindata.email);
await login.enterPassword(logindata.password);
await login.clickLoginBtn();

const dashboard = new DashboardPage(page);
await dashboard.clickClientDropDown(svpd.optionClient);

const worklist = new WorklistPage(page);
await worklist.clickWorklist();
await worklist.clickSurgical();
await worklist.searchMRN(svpd.searchInfo)
await worklist.selectPatientfromSearch(svpd.patient);
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
    await dashboard.clickClientDropDown(fsw.optionClient);
    
    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.unselectAllCaseTypes();
    await worklist.selectCaseType(fsw.casetype);
    await worklist.selectFilter(fsw.filter);
      
  })
  
  test('add surgical communication', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);
  
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(asc.optionClient);
  
    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.searchMRN(asc.searchInfo);
    await worklist.selectPatientfromSearch(asc.patient);
    await worklist.addcommunication(asc.comtype,asc.comment,asc.priority);
  })
  
  test('edit surgical communication', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);
  
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(esc.optionClient);
  
    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.searchMRN(esc.searchInfo);
    await worklist.selectPatientfromSearch(esc.patient);
    await worklist.editcommunication(esc.comtype,esc.comment,esc.priority,esc.resolveyear,esc.resolvemonth,esc.resolveday);
    })
  
    test('delete surgical communication', async ({ page }) => {
      test.slow();
      const login = new LoginPage(page);
    
      await page.goto('https://qa-auto-base.mybloodhealth.com/login');
      await login.enterEmail(logindata.email);
      await login.enterPassword(logindata.password);
      await login.clickLoginBtn();
    
      const dashboard = new DashboardPage(page);
      await dashboard.clickClientDropDown(dsc.optionClient);
    
      const worklist = new WorklistPage(page);
      await worklist.clickWorklist();
      await worklist.clickSurgical();
      await worklist.searchMRN(dsc.searchInfo);
      await worklist.selectPatientfromSearch(dsc.patient);
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
      await dashboard.clickClientDropDown(ssw.optionClient);
      
      const worklist = new WorklistPage(page);
      await worklist.clickWorklist();
      await worklist.clickSurgical();
      await worklist.searchMRN(ssw.searchInfo);
      await worklist.selectPatientfromSearch(ssw.patient)
    })
    
    test('export surgical worklist after filter', async ({ page }) => {
      //contemplating the necessity of this one.
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
    await dashboard.clickClientDropDown(swf.optionClient);
  
    const worklist = new WorklistPage (page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.selectFilter(swf.filter);
  })
  
  test('surgical worklist date range filter', async ({ page }) => {
  
    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(swdf.optionClient);
  
    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.sortByDateRange(swdf.startyear,swdf.startmonth,swdf.startday,swdf.endyear,swdf.endmonth,swdf.endday);
  })
  
  test('surgical worklist case type filter', async ({ page }) => {
  
    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(sctf.optionClient);
  
    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.unselectAllCaseTypes();
    await worklist.selectCaseType(sctf.casetype);
  })
  
  test('surgical worklist filter retention', async ({ page }) => {
  
    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(swfr.optionClient);
  
    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.unselectAllCaseTypes();
    await worklist.selectCaseType(swfr.casetype);
    await worklist.selectPatientfromSearch(swfr.patient);
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
    await dashboard.clickClientDropDown(swpr.optionClient);
  
    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();  
    await worklist.worklistPagination(swpr.num);
    await worklist.selectPatientfromSearch(swpr.patient);
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
    await dashboard.clickClientDropDown(swrc.optionClient);
  
    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.adjustRowCount(swrc.row);
    await worklist.selectPatientfromSearch(swrc.patient)
  })

  test('clear expired visits from surgical worklist', async ({ page }) => {
      
    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(scev.optionClient);
  
    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.clearExpiredVisits();
  })

  test('surgical worklist add notify visit document', async ({ page }) => {
      
    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(sanvd.optionClient);
  
    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.clickFacility(sanvd.fromfacility,sanvd.tofacility);
    await worklist.searchMRN(sanvd.searchInfo);
    await worklist.selectPatientfromSearch(sanvd.patient);
    await worklist.visitDocumentsAdd();
    await worklist.searchdoc(sanvd.doc);
    await worklist.addVisitDocuments();
    await worklist.closeVisitDocuments();
    await worklist.notifyVisitDocs(sanvd.user,sanvd.comment);
    await worklist.visitDocumentsPreview();
  })

  test('edit existing surgical', async ({ page }) => {
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
    await worklist.scheduleSurgicalVisit('Existing','','','','','651324','','','','','','','','','','','','','',
    'yes','White','Not Hispanic','Changed Race and Ethnicity','2024','NOV','12',7,'CARDIO','test');
    await worklist.saveScheduledVisit();
})

test('edit patient surgical', async ({ page }) => {
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
  await worklist.editPatientDetails('Changed Race and Ethinicity')
  await worklist.editPatientRace('White');
  await worklist.editPatientEthnicity('Not Hispanic');
  await worklist.saveEditPatient();
  await worklist.selectPatientDetails();
  await worklist.selectChainofCustody(); 
})

test('verify latest labs', async ({ page }) => {
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
  await worklist.latestlabs()
})
