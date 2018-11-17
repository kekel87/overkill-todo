import {
  browser, by, element,
  ExpectedConditions, ElementFinder, ElementArrayFinder,
  $, $$
} from 'protractor';

const timeout = 2000;

export class TodosPage {
  navigateTo() {
    return browser.get('/todos');
  }

  getLoader() {
    return $('mat-spinner');
  }

  waitForList() {
    browser.wait(ExpectedConditions.presenceOf($('mat-card-content mat-list')), timeout);
  }

  getTodos() {
    return $$('mat-card-content mat-list mat-list-item');
  }

  getTodoAtPosition(pos: number) {
    return $(`mat-card-content mat-list mat-list-item:nth-of-type(${pos})`);
  }

  clickTodoCheckBox(todo: ElementFinder) {
    return todo.$('mat-checkbox').click();
  }

  todoIsCheck(todo: ElementFinder) {
    return todo.$('.mat-checkbox-checked') !== null;
  }

  getParagraphText() {
    return $('app-root h1').getText();
  }
}
