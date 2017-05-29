import { NobillAppPage } from './app.po';

describe('nobill-app App', () => {
  let page: NobillAppPage;

  beforeEach(() => {
    page = new NobillAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
