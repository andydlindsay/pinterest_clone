import { PinterestCloneSrcPage } from './app.po';

describe('pinterest-clone-src App', () => {
  let page: PinterestCloneSrcPage;

  beforeEach(() => {
    page = new PinterestCloneSrcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
