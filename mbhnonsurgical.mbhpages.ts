import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import WorklistPage from './classes/worklistPage';
import PatientsPage from './classes/patientsPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))
const tccul = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/tcclientuserlogin.json")))
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
const dnsc = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/deletenonsurgicalcomm.json")))
const snsw = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/searchnonsurgicalworklist.json")))
const nswf = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/nonsurgicalworklistfilter.json")))
const nswdf = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/nonsurgicalworklistdatefilter.json")))
const nsctf = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/nonsurgicalcasetypefilter.json")))
const nswsf = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/nonsurgicalworkliststatusfilter.json")))
const nswfr = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/nonsurgicalworklistfilterretention.json")))
const nswpr = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/nonsurgicalworklistpaginationretention.json")))
const nswrc = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/nonsurgicalworklistrowcounter.json")))
const nscev = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/nonsurgicalclearexpiredvisits.json")))
const nsctsf = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/nonsurgicalcasetypesavefilter.json")))
const esensp = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/editschexistingnspatient.json")))
const epns = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/editpatientnonsurgical.json")))
const rnscc = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/replynscommcomment.json")))
const rnscfc = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/replynscommcall.json")))
const nsaf = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/nonsurgicalallfacilities.json")))
const nsmf = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/nonsurgicalmultifacilities.json")))

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
    await worklist.scheduleChronicVisit(nssnpv.patienttype, nssnpv.fname, nssnpv.lname, nssnpv.mrn,nssnpv.dobyear,nssnpv.dobMonth,nssnpv.dobDay,
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
    await worklist.selectChainofCustody();
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
    await worklist.selectChainofCustody();  
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
    await worklist.selectChainofCustody();
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
      await dashboard.clickClientDropDown(dnsc.optionClient);
    
      const worklist = new WorklistPage(page);
      await worklist.clickWorklist();
      await worklist.clickChronic();
      await worklist.searchMRN(dnsc.searchInfo);
      await worklist.selectPatientfromSearch(dnsc.patient);
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
      await dashboard.clickClientDropDown(snsw.optionClient);
      
      const worklist = new WorklistPage(page);
      await worklist.clickWorklist();
      await worklist.clickChronic();
      await worklist.searchMRN(snsw.searchInfo);
      await worklist.selectPatientfromSearch(snsw.patient)
    })

    test("Non-surgical worklist filter", async({page})=>{
        test.slow();
        const login = new LoginPage (page);
        await page.goto('https://qa-auto-base.mybloodhealth.com/login');
        await login.enterEmail(logindata.email);
        await login.enterPassword(logindata.password);
        await login.clickLoginBtn();
      
        const dashboard = new DashboardPage (page);
        await dashboard.clickClientDropDown(nswf.optionClient);
      
        const worklist = new WorklistPage (page);
        await worklist.clickWorklist();
        await worklist.clickChronic();
        await worklist.selectFilter(nswf.filter);
      })
      
      test('non-surgical worklist date range filter', async ({ page }) => {
      
        test.slow();
        const login = new LoginPage(page);
        await page.goto('https://qa-auto-base.mybloodhealth.com/login');
        await login.enterEmail(logindata.email);
        await login.enterPassword(logindata.password);
        await login.clickLoginBtn();
      
        const dashboard = new DashboardPage(page);
        await dashboard.clickClientDropDown(nswdf.optionClient);
      
        const worklist = new WorklistPage(page);
        await worklist.clickWorklist();
        await worklist.clickChronic();
        await worklist.sortByDateRange(nswdf.startyear,nswdf.startmonth,nswdf.startday,nswdf.endyear,nswdf.endmonth,nswdf.endday);
      })
      
      test('non-surgical worklist case type filter', async ({ page }) => {
      
        test.slow();
        const login = new LoginPage(page);
        await page.goto('https://qa-auto-base.mybloodhealth.com/login');
        await login.enterEmail(logindata.email);
        await login.enterPassword(logindata.password);
        await login.clickLoginBtn();
      
        const dashboard = new DashboardPage(page);
        await dashboard.clickClientDropDown(nsctf.optionClient);
      
        const worklist = new WorklistPage(page);
        await worklist.clickWorklist();
        await worklist.clickChronic();
        await worklist.unselectAllCaseTypes();
        await worklist.selectCaseType(nsctf.casetype);
      })

      test('non-surgical worklist status filter', async ({ page }) => {
      
        test.slow();
        const login = new LoginPage(page);
        await page.goto('https://qa-auto-base.mybloodhealth.com/login');
        await login.enterEmail(logindata.email);
        await login.enterPassword(logindata.password);
        await login.clickLoginBtn();
      
        const dashboard = new DashboardPage(page);
        await dashboard.clickClientDropDown(nswsf.optionClient);
      
        const worklist = new WorklistPage(page);
        await worklist.clickWorklist();
        await worklist.clickChronic();
        await worklist.selectStatus(nswsf.status);
      })
      
      test('non surgical worklist filter retention', async ({ page }) => {
      
        test.slow();
        const login = new LoginPage(page);
        await page.goto('https://qa-auto-base.mybloodhealth.com/login');
        await login.enterEmail(logindata.email);
        await login.enterPassword(logindata.password);
        await login.clickLoginBtn();
      
        const dashboard = new DashboardPage(page);
        await dashboard.clickClientDropDown(nswfr.optionClient);
      
        const worklist = new WorklistPage(page);
        await worklist.clickWorklist();
        await worklist.clickChronic();
        await worklist.selectFilter(nswfr.filter);
        await worklist.selectPatientfromSearch(nswfr.patient);
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
        await dashboard.clickClientDropDown(nswpr.optionClient);
      
        const worklist = new WorklistPage(page);
        await worklist.clickWorklist();
        await worklist.clickChronic();  
        await worklist.worklistPagination(nswpr.num);
        await worklist.selectPatientfromSearch(nswpr.patient);
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
        await dashboard.clickClientDropDown(nswrc.optionClient);
      
        const worklist = new WorklistPage(page);
        await worklist.clickWorklist();
        await worklist.clickChronic();
        await worklist.adjustRowCount(nswrc.row);
        await worklist.selectPatientfromSearch(nswrc.patient);
      })

      test('non-surgical clear expired visits', async ({ page }) => {
      
        test.slow();
        const login = new LoginPage(page);
        await page.goto('https://qa-auto-base.mybloodhealth.com/login');
        await login.enterEmail(logindata.email);
        await login.enterPassword(logindata.password);
        await login.clickLoginBtn();
      
        const dashboard = new DashboardPage(page);
        await dashboard.clickClientDropDown(nscev.optionClient);
      
        const worklist = new WorklistPage(page);
        await worklist.clickWorklist();
        await worklist.clickChronic();
        await worklist.clearExpiredVisits();
      })

      test('edit existing non surgical', async ({ page }) => {
        test.slow();
        const login = new LoginPage(page);
    
        await page.goto('https://qa-auto-base.mybloodhealth.com/login');
        await login.enterEmail(logindata.email);
        await login.enterPassword(logindata.password);
        await login.clickLoginBtn();
    
        const dashboard = new DashboardPage(page);
        await dashboard.clickClientDropDown(esensp.optionClient);
    
        const worklist = new WorklistPage(page);
        await worklist.clickWorklist();
        await worklist.clickChronic();
        await worklist.scheduleChronicVisit(esensp.patienttype,'','',esensp.mrn,'','','','','','','','','','','','','',
        esensp.edit,esensp.editrace,esensp.editethnicity,esensp.changeDesc,esensp.pYear,
        esensp.pMonth,esensp.pDay,esensp.pclickcount,esensp.procedure,esensp.surgeon);
        await worklist.saveScheduledVisit();
    })

    test('edit patient non surgical', async ({ page }) => {
      test.slow();
      const login = new LoginPage(page);
  
      await page.goto('https://qa-auto-base.mybloodhealth.com/login');
      await login.enterEmail(logindata.email);
      await login.enterPassword(logindata.password);
      await login.clickLoginBtn();
  
      const dashboard = new DashboardPage(page);
      await dashboard.clickClientDropDown(epns.optionClient);
  
      const worklist = new WorklistPage(page);
      await worklist.clickWorklist();
      await worklist.clickChronic();
      await worklist.searchMRN(epns.searchInfo)
      await worklist.selectPatientfromSearch(epns.patient);
      await worklist.editPatientDetails(epns.changeDesc)
      await worklist.editPatientRace(epns.race);
      await worklist.editPatientEthnicity(epns.ethnicity);
      await worklist.saveEditPatient();
      await worklist.selectPatientDetails();
      await worklist.selectChainofCustody();
  })

  test('reply nonsurgical communication comment', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(rnscc.optionClient);

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickChronic();
    await worklist.searchMRN(rnscc.searchInfo)
    await worklist.selectPatientfromSearch(rnscc.patient);
    await worklist.replyCommunication(rnscc.commtype,rnscc.message,'');
  
  })

  test('reply nonsurgical communication call', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);
  
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(rnscfc.optionClient);
  
    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickChronic();
    await worklist.searchMRN(rnscfc.searchInfo)
    await worklist.selectPatientfromSearch(rnscfc.patient);
    await worklist.replyCommunication(rnscfc.commtype,rnscfc.message,rnscfc.resolved);
  })

  test('nonsurgical all facilities worklist', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);
  
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(nsaf.optionClient);
  
    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickChronic();
    await worklist.searchMRN(nsaf.searchInfo);
    await worklist.clickFacility(nsaf.fromfacility,nsaf.tofacility);
    await worklist.clearSelections();
    await worklist.unselectAllCaseTypes();
    await worklist.selectCaseType(nsaf.casetype);
    await worklist.selectFilter(nsaf.filter);
  })

  test('nonsurgical multi facilities worklist', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);
  
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(nsmf.optionClient);
  
    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickChronic();
    await worklist.searchMRN(nsmf.searchInfo);
    await worklist.clickMultiFacility(nsmf.fromfacility,nsmf.tofacility,nsmf.anotherfacility);
    await worklist.clearSelections();
    await worklist.unselectAllCaseTypes();
    await worklist.selectCaseType(nsmf.casetype);
    await worklist.selectFilter(nsmf.filter);
  })