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
const pevd = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/patienteditvisitdetails.json")))
const pvdd = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/patientvisitdropdowns.json")))
const pac = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/patientaddcommunication.json")))
const pec = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/patienteditcomm.json")))
const prtc = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/patientreplytocomm.json")))

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
    await patients.unAssign();
    await patients.seeChainofCustody();
})

test('patient edit visit details', async ({page})=>{

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(pevd.optionClient);

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient(pevd.patient);
    await patients.selectPatientfromSearch(pevd.patient);
    await patients.viewVisit();
    await patients.editPCP(pevd.provider);
    await patients.editSurgeon(pevd.surgeon);
    await patients.editFacility(pevd.facility);
    await patients.editCenter(pevd.center);
    await patients.seeChainofCustody();   
})

test ('patient visit drop downs', async ({page})=>{

    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(pvdd.optionClient);

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient(pvdd.patient);
    await patients.selectPatientfromSearch(pvdd.patient);
    await patients.viewVisit();
    await patients.seePatientDetails();
    await patients.seeMedications();
    await patients.seeAnemiaManagement();
    await patients.seeAllergies();
    await patients.seeChainofCustody();
})

test('patient add communication', async({page})=>{
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(pac.optionClient);

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient(pac.patient);
    await patients.selectPatientfromSearch(pac.patient2);
    await patients.viewVisit();
    await patients.addCommunication(pac.commType,pac.message,pac.priority,pac.resolveYear,pac.resolveMonth,pac.resolveDay);
    await patients.seeChainofCustody();
})

test('patient edit communication', async({page})=>{
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(pec.optionClient);

    const patients = new PatientsPage(page);
    await patients.selectPatients();
    await patients.searchPatient(pec.patient);
    await patients.selectPatientfromSearch(pec.patient);
    await patients.viewVisit();
    await patients.editCommunication();
    await patients.editCommType(pec.commType);
    await patients.editMessage(pec.message);
    await patients.editPriority(pec.priority);
    await patients.editResolveDate(pec.resolveYear,pec.resolveMonth,pec.resolveDay);
    await patients.saveCommEdits();
    await patients.seeChainofCustody();
    })

    test('patient reply to communication', async({page})=>{
        test.slow();
        const login = new LoginPage(page);
    
        await page.goto('https://qa-auto-base.mybloodhealth.com/login');
        await login.enterEmail(logindata.email);
        await login.enterPassword(logindata.password);
        await login.clickLoginBtn();
    
        const dashboard = new DashboardPage(page);
        await dashboard.clickClientDropDown(prtc.optionClient);
    
        const patients = new PatientsPage(page);
        await patients.selectPatients();
        await patients.searchPatient(prtc.patient);
        await patients.selectPatientfromSearch(prtc.patient);
        await patients.viewVisit();
        await patients.replyCommunication(prtc.comment,prtc.resolved);
        await patients.seeChainofCustody();
        })


