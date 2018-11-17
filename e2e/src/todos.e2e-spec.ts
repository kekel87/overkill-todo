import { TodosPage } from './todos.po';

describe('Todos page', () => {
  let page: TodosPage;

  beforeEach(() => {
    page = new TodosPage();
  });

  it('should show list my three current todos', () => {
    page.navigateTo();
    page.waitForList();
    expect(page.getTodos().count()).toEqual(4);
  });

  it('should change a todo state by checking a "box"', () => {
    page.navigateTo();
    page.waitForList();

    const todo = page.getTodoAtPosition(1);
    page.clickTodoCheckBox(todo);
    expect(page.todoIsCheck(todo)).toBeTruthy();
  });
});
