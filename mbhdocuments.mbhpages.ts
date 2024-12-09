import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import DocumentsPage from './classes/documentsPage';
import WorklistPage from './classes/worklistPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))
const ud = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/uploaddocument.json")))
const pd = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/previewdocument.json")))
const ad = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/adddocument.json")))
const ed = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/editdocument.json")))
const dd = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/deletedocument.json")))
const dsf = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/documentsearchfeature.json")))
const dp = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/documentpagination.json")))
const drc = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/documentrowcount.json")))
const vdr = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/visitdocumentretention.json")))

test('upload document', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(ud.optionClient);

    const document = new DocumentsPage (page);
    await document.selectDocuments();
    await document.uploadDocBtn();
    await document.newStaticDoc(ud.docname,ud.desc,ud.doctype,ud.casetype,ud.docstat);
    await document.saveDoc();
})

test('preview document', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(pd.optionClient);

    const document = new DocumentsPage (page);
    await document.selectDocuments();
    await document.searchDoc(pd.document);
    await document.selectDocFromList(pd.docname);
    await document.previewdoc();
})

test('add document', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(ad.optionClient);

    const document = new DocumentsPage (page);
    await document.selectDocuments();
    await document.addDocBtn();
    await document.addEditDoc(ad.docname,ad.desc,ad.doctype,ad.casetype,ad.docstat)
    await document.saveDoc();
})
test('edit document', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(ed.optionClient);

    const document = new DocumentsPage (page);
    await document.selectDocuments();
    await document.searchDoc(ed.document);
    await document.selectDocFromList(ed.docname);
    await document.addSmartSection(ed.smartdoctype);
    await document.addDocBtn();
    await document.smartSecInfo(ed.smartsecname,ed.smartsecdesc);
    await document.addTextSection(ed.secname,ed.secdesc,ed.seccontent);
    await document.saveDoc();
})
test('delete document', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(dd.optionClient);

    const document = new DocumentsPage (page);
    await document.selectDocuments();
    await document.searchDoc(dd.document);
    await document.delete();
})
test('document search feature', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(dsf.optionClient);

    const document = new DocumentsPage (page);
    await document.selectDocuments();
    await document.searchDoc(dsf.document);
    await document.selectDocFromList(dsf.docname);
    await document.backArrow();
    await document.docStatusdropdown(dsf.docstat);
    await document.clearSelections();
})

test('document pagination', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(dp.optionClient);

    const document = new DocumentsPage (page);
    await document.selectDocuments();
    await document.documentPagination(dp.num);
    await document.selectDocFromList(dp.docname);
    await document.backArrow();
    await document.paginationCheck();
})

test('document row count', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(drc.optionClient);

    const document = new DocumentsPage (page);
    await document.selectDocuments();
    await document.adjustRowCount(drc.row);
    await document.selectDocFromList(drc.docname);
})

test('visit document retention', async ({page}) =>{
    
    test.setTimeout(120000);
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown(vdr.optionClient);

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.searchMRN(vdr.searchInfo);
    await worklist.selectPatientfromSearch(vdr.patient);
    await worklist.completeSurgicalVisit(vdr.completeType,'',vdr.untreatedtype,vdr.followup);

    await dashboard.changeClient(vdr.currentClient,vdr.newClient);
    const documents = new DocumentsPage(page);
    await  documents.selectDocuments();
    await documents.searchDoc(vdr.document);
    await documents.selectDocFromList(vdr.docname);
    await documents.addSmartSection(vdr.smartdoctype);
    await documents.addSmartSecDocBtn();
    await documents.saveDoc();

    await dashboard.changeClient(vdr.currentClient2,vdr.newClient2);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.searchMRN(vdr.searchInfo);
    await worklist.selectStatus(vdr.status);
    await worklist.selectPatientfromSearch(vdr.patient);
    await worklist.visitDocumentsPreview();
})
