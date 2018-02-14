import { browser, by, element, ExpectedConditions, ElementArrayFinder } from 'protractor';

const timeout = 2000;

export class TodosPage {
  navigateTo() {
    return browser.get('/todos');
  }

  getLoader() {
    return element(by.css('mat-spinner'));
  }

  waitForList() {
    browser.wait(ExpectedConditions.presenceOf(element(by.css('mat-card-content mat-list'))), timeout);
  }

  getTodos() {
    return element.all(by.css('mat-card-content mat-list mat-list-item'));
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
