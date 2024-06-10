import { test, expect } from '@playwright/test';
import LoginPage from './classes/loginPage';
import DashboardPage from './classes/dashboardPage';
import DocumentsPage from './classes/documentsPage';
const logindata = JSON.parse(JSON.stringify(require("../mbh-playwright/testdata/login.json")))

test('upload document', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
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

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const document = new DocumentsPage (page);
    await document.selectDocuments();
    await document.searchDoc('Playwright');
    await document.selectDocFromList('Playwright Test Document');
    await document.previewdoc();
})

test('add/edit/delete document', async ({ page }) => {
    test.slow();
    const login = new LoginPage(page);

    await page.goto('https://qa.mybloodhealth.com/login');
    await login.enterEmail(logindata.email);
    await login.enterPassword(logindata.password);
    await login.clickLoginBtn();

    const dashboard = new DashboardPage(page);
    await dashboard.clickClientDropDown('QA Testing');

    const document = new DocumentsPage (page);
    await document.selectDocuments();
    await document.addDocBtn();
    //await document.backArrow();
    //await document.addDocBtn();
    await document.addEditDoc('Second Test Document','Playwrights second test document','Assessment Template','Non-Surgical','Active')
    await document.saveDoc();
    await document.searchDoc('Second Test Document');
    await document.docStatusdropdown('Inactive');
    await document.clearSelections();
    await document.searchDoc('Second Test Document');
    await document.selectDocFromList('Second Test Document');
    await document.addSmartSection('Test');
    await document.addDocBtn();
    await document.smartSecInfo('Test Smart Section','This is a test of smart.');
    await document.addTextSection('Test Section Name','Playwright text section','This is a test for playwright.');
    await document.saveDoc();
    await document.searchDoc('Second Test Document');
    await document.delete();
    await document.searchDoc('Second Test Document');

})

