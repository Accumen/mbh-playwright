import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import DocumentsPage from './classes/documentsPage';
import WorklistPage from './classes/worklistPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))

test('upload document', async ({ page }) => {
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
    await document.uploadDocBtn();
    await document.newStaticDoc('Playwright Test Document','Playwright placed this document as a test.','Patient Letter','Surgical','Active');
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
    await dashboard.clickClientDropDown('QA Testing');

    const document = new DocumentsPage (page);
    await document.selectDocuments();
    await document.searchDoc('Invasive Anemia Treatment');
    await document.selectDocFromList('Invasive Anemia Treatment');
    await document.previewdoc();
})

test('add/edit/delete document', async ({ page }) => {
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
    await document.searchDoc('Second Test Document');
    await document.docStatusdropdown('Inactive');
    await document.clearSelections();
    await document.searchDoc('Second Test Document');
    await document.selectDocFromList('Second Test Document');
    await document.addSmartSection('Test Smart Section');
    await document.addDocBtn();
    await document.smartSecInfo('Test Smart Section','This is a test of smart.');
    await document.addTextSection('Text Section Name','Playwright text section','This is a test for playwright.');
    await document.saveDoc();
    await document.searchDoc('Second Test Document');
    await document.delete();
    await document.searchDoc('Second Test Document');
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
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa-auto-base.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('Accumen Hospital System');

    const worklist = new WorklistPage(page);
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.searchMRN('ZZ940308943');
    await worklist.selectPatientfromSearch("Kenya O'Reilly");
    await worklist.completeSurgicalVisit('Not Treated','','Patient has not received pre-admission testing','no');

    await dashboard.changeClient('Accumen Hospital System','MBH');
    const documents = new DocumentsPage(page);
    await documents.selectDocuments();
    await documents.searchDoc('Treatment');
    await documents.selectDocFromList('Treatment Orders: Medication Options');
    await documents.addSmartSection('Medication Order - Provider Signature');
    await documents.addSmartSecDocBtn();
    await documents.saveDoc();

    await dashboard.changeClient('MBH','Accumen Hospital System');
    await worklist.clickWorklist();
    await worklist.clickSurgical();
    await worklist.searchMRN('ZZ940308943');
    await worklist.status('Completed');
    await worklist.selectPatientfromSearch("Kenya O'Reilly");
    await worklist.visitDocumentsEdit();
    await page.getByText('Footer').scrollIntoViewIfNeeded();   
})
