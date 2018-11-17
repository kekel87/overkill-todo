import { AppPage } from './app.po';

describe('overkill-todo App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Overkill todo !', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Overkill todo !');
  });
});
