import { StrikersoftTestAssignmentPage } from './app.po';

describe('strikersoft-test-assignment App', function() {
  let page: StrikersoftTestAssignmentPage;

  beforeEach(() => {
    page = new StrikersoftTestAssignmentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
