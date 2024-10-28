import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import PatientsPage from './classes/patientsPage';
import WorklistPage from './classes/worklistPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))
const fpl = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/filterpatientslab.json")))
const apl = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/addpatientslab.json")))
const dpl = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/deletepatientslabs.json")))
const psv = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/patientsurgicalvisit.json")))
const pnsv = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/patientsnonsurgicalvisit.json")))
const pav = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/patientassignvisit.json")))
const puav = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/patientunassignvisit.json")))

test('filter patients labs', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(fpl.optionClient);

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient(fpl.patient);
    await patients.selectPatientfromSearch(fpl.patient);
    await patients.viewAllLabs(fpl.labtype,fpl.startyear,fpl.startmonth,fpl.startday,fpl.endyear,fpl.endmonth,fpl.endday);

})

test('add patients lab', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(apl.optionClient);

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient(apl.patient);
    await patients.selectPatientfromSearch(apl.patient);
    await patients.addLabs(apl.labtype, apl.labvalue, apl.resultyear, apl.resultmonth, apl.resultday);
})

test('delete patients lab', async ({ page }) => {

    test.slow();
    const login = new LoginPage(page);
    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();
  
    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(dpl.optionClient);

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient(dpl.patient);
    await patients.selectPatientfromSearch(dpl.patient);
    await patients.viewAllLabs(dpl.labtype,dpl.startyear);
    await patients.deleteSearchedLab();
    await patients.closeSearchListWindow();
    await patients.viewAllLabs(dpl.labtype,dpl.startyear);
})

test('patient surgical visit', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(psv.optionClient);

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient(psv.patient);
    await patients.selectPatientfromSearch(psv.patient);
    await patients.patientschedulesurgical(psv.pYear,psv.pMonth,psv.pDay,psv.pclickcount,psv.procedure,psv.surgeon,psv.pFacility);
})

test('patients non-surgical visit', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(pnsv.optionClient);

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient(pnsv.patient);
    await patients.selectPatientfromSearch(pnsv.patient);
    await patients.patientsschedulechronic(pnsv.pYear,pnsv.pMonth,pnsv.pDay,pnsv.pclickcount,pnsv.procedure,pnsv.surgeon,pnsv.pFacility);
   
})

test('patient assign visit', async ({page})=> {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(pav.optionClient);

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient(pav.patient);
    await patients.selectPatientfromSearch(pav.patient2);
    await patients.viewVisit();
    await patients.assignButton();
    await patients.assignVisit(pav.user);
    await patients.saveAssigned();
    await patients.seeChainofCustody();
})

test('patient unassign visit', async ({page})=>{
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(puav.optionClient);

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient(puav.patient);
    await patients.selectPatientfromSearch(puav.patient);
    await patients.viewVisit();
    await patients.assignButton();
    await patients.unAssign();
    await patients.seeChainofCustody();
})

test('edit visit pcp/surgeon/treatment center/facility', async ({page})=>{

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient('Rubble');
    await patients.selectPatientfromSearch('Barney Rubble');
    await patients.viewVisit();
    await patients.editPCP('test');
    await patients.editSurgeon('test');
    await patients.editFacility('QA Facility 2');
    await patients.editCenter('test location (QA1)');
    await patients.seeChainofCustody();
    
})

test ('open drop downs on patient visit', async ({page})=>{

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient('Rubble');
    await patients.selectPatientfromSearch('Barney Rubble');
    await patients.viewVisit();
    await patients.seePatientDetails();
    await patients.seeMedications();
    await patients.seeAnemiaManagement();
    await patients.seeAllergies();
    await patients.seeChainofCustody();
})

test('add communication', async({page})=>{
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient('Rubble');
    await patients.selectPatientfromSearch('Barney Rubble');
    await patients.viewVisit();
    await patients.addCommunication('Task','Playwright Test','Low','June 28');
    await patients.seeChainofCustody();
})

test('edit communication', async({page})=>{
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient('Rubble');
    await patients.selectPatientfromSearch('Barney Rubble');
    await patients.viewVisit();
    await patients.editCommunication();
    await patients.editCommType('Task');
    await patients.editMessage('edited playwright test message');
    await patients.editPriority('Medium');
    await patients.editResolveDate('September 29');
    await patients.saveCommEdits();
    await patients.replyCommunication('This reply is a playwright test.','yes');
    await patients.seeChainofCustody();
    })

    test('reply to communication', async({page})=>{
        test.slow();
        const login = new LoginPage(page);
    
        await page.goto('https://qa-auto-base.mybloodhealth.com/login');
        await login.enterEmail(logindata.email);
        await login.enterPassword(logindata.password);
        await login.clickLoginBtn();
    
        const dashboard = new DashboardPage(page);
        await dashboard.clickClientDropDown('QA Testing');
    
        const patients = new PatientsPage(page);
        await patients.selectPatients();
        await patients.searchPatient('Rubble');
        await patients.selectPatientfromSearch('Barney Rubble');
        await patients.viewVisit();
        await patients.replyCommunication('This reply is a playwright test.','yes');
        await patients.seeChainofCustody();
        })


