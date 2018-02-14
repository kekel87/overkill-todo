import { TodosPage } from './todos.po';

describe('Todos page', () => {
  let page: TodosPage;

  beforeEach(() => {
    page = new TodosPage();
  });

  it('should show list my three current todos', () => {
    page.navigateTo();
    page.waitForList();
    expect(page.getTodos().count()).toEqual(3);
  });
});
