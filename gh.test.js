let page;
jest.setTimeout(60000); 

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {

  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

    test("The h1 header content'", async () => {
      jest.setTimeout(80000);
      const firstLink = await page.$("header div div a");
      await firstLink.click();
      await page.waitForSelector("h1");
      const title2 = await page.title();
      expect(title2).toEqual("GitHub for teams · Build like the best teams on the planet · GitHub");
    });

    test("The first link attribute", async () => {
      jest.setTimeout(10000);
      const actual = await page.$eval("a", (link) => link.getAttribute("href"));
      expect(actual).toEqual("#start-of-content");
    });

    test("The page contains Sign in button", async () => {
      jest.setTimeout(10000);
      const btnSelector = " a[class='btn-mktg btn-large-mktg btn-muted-mktg']";
      await page.waitForSelector(btnSelector, {
       visible: true,
      });
      const actual = await page.$eval(btnSelector, (link) => link.textContent);
      expect(actual).toContain("Sign up for free");
    });
});