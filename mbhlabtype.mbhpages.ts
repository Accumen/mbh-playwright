import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import LabtypesPage from './classes/labtypesPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))
const alt = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/addlabtype.json")))
const elt = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/editlabtype.json")))
const dlt = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/deletelabtype.json")))
const ltn = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/labtypenavigation.json")))
const ltrc = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/labtyperowcounter.json")))

test('add lab type', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(alt.optionClient);

    const labtypes = new LabtypesPage(page);
    await labtypes.selectLabTypes();
    await labtypes.addLabType(alt.testname,alt.unitOfMeasure,alt.minValue,alt.maxValue,alt.uniqueCode,alt.labtypestatus,alt.gendered,'','','','','','',
    alt.mRefMin,alt.mRefMax,alt.mAbnormalAbove,alt.mAboveReportLabel,alt.mAbnormalBelow,alt.mBelowReportLabel,alt.fRefMin,alt.fRefMax,alt.fAbnormalAbove,alt.fAboveReportLabel,alt.fAbnormalBelow,alt.fBelowReportLabel);
    await labtypes.saveNewLabType();
})

test('edit lab type', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(elt.optionClient);

    const labtypes = new LabtypesPage(page);
    await labtypes.selectLabTypes();
    await labtypes.searchLabType(elt.labtype);
    await labtypes.selectLabType(elt.labtype);
    await labtypes.editLabTypeStatus(elt.labtypestatus);
    await labtypes.saveLabType();
})

test('delete lab type', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(dlt.optionClient);

    const labtypes = new LabtypesPage(page);
    await labtypes.selectLabTypes();
    await labtypes.searchLabType(dlt.labtype);
    await labtypes.deleteLabType();
})

test('lab type navigation', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(ltn.optionClient);

    const labtypes = new LabtypesPage(page);
    await labtypes.selectLabTypes();
    await labtypes.searchStatus(ltn.labtypestatus);
    await labtypes.clearLabTypesSelection();
    await labtypes.selectLabType(ltn.labtype);
    await labtypes.labTypeBackArrow();
})

test('adjust row count', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(ltrc.optionClient);

    const labtypes = new LabtypesPage(page);
    await labtypes.selectLabTypes();
    await labtypes.adjustRowCount(ltrc.row);
})