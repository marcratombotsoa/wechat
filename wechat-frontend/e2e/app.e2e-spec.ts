import { WechatFrontendPage } from './app.po';

describe('wechat-frontend App', () => {
  let page: WechatFrontendPage;

  beforeEach(() => {
    page = new WechatFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
