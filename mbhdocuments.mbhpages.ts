import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import DocumentsPage from './classes/documentsPage';
import WorklistPage from './classes/worklistPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))
const ud = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/uploaddocument.json")))
const pd = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/previewdocument.json")))
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
    await dashboard.clickClientDropDown('QA Testing');

    const document = new DocumentsPage (page);
    await document.selectDocuments();
    await document.addDocBtn();
    await document.backArrow();
    await document.addDocBtn();
    await document.addEditDoc('Second Test Document','Playwrights second test document','Assessment Template','Non-Surgical','Active')
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
    await dashboard.clickClientDropDown('QA Testing');

    const document = new DocumentsPage (page);
    await document.selectDocuments();
    await document.searchDoc('Iron Patient Letter');
    await document.selectDocFromList('Iron Patient Letter');
    await document.addSmartSection('Test Smart Section');
    await document.addDocBtn();
    await document.smartSecInfo('Test Smart Section','This is a test of smart.');
    await document.addTextSection('Text Section Name','Playwright text section','This is a test for playwright.');
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
    await dashboard.clickClientDropDown('QA Testing');

    const document = new DocumentsPage (page);
    await document.selectDocuments();
    await document.searchDoc('Second Test Document');
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
    await dashboard.clickClientDropDown('QA Testing');

    const document = new DocumentsPage (page);
    await document.selectDocuments();
    await document.searchDoc('Second Test Document');
    await document.docStatusdropdown('Inactive');
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
    await dashboard.clickClientDropDown('QA Testing');

    const document = new DocumentsPage (page);
    await document.selectDocuments();
    await document.documentPagination(3);
    await document.selectDocFromList('Surgeon Letter for the Abnormal Patient');
    await document.backArrow();
    await document.paginationCheck();
})

test('document pagination dropdown', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const document = new DocumentsPage (page);
    await document.selectDocuments();
    await document.adjustRowCount('30');
})

test('visit document retention', async ({page}) =>{
    //test.slow();
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
