let page;
const timeout = 60000;

function setupPageHooks(url) {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(url, { timeout });
  }, timeout);

  afterEach(async () => {
    if (page && !page.isClosed()) {
      await page.close();
    }
  }, timeout);
}

describe("Github Team page tests", () => {
  setupPageHooks("https://github.com/team");

  test("The h1 header content", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub · Build and ship software on a single, collaborative platform · GitHub"
    );
  }, timeout);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, timeout);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, { visible: true });
    const actual = await page.$eval(btnSelector, (link) =>
      link.textContent.trim()
    );
    expect(actual).toContain("Get started with Team");
  }, timeout);
});

describe("Main page tests", () => {
  setupPageHooks("https://github.com/");

  test("should see homepage h1", async () => {
    await page.waitForSelector("h1");
    const title3 = await page.title();
    expect(title3).toEqual(
      "GitHub · Build and ship software on a single, collaborative platform · GitHub"
    );
  }, timeout);

  test("should navigate to Copilot Business and verify title", async () => {
    const copilotButtonSelector =
      ".Primer_Brand__Button-module__Button--label-secondary___DRJoJ";

    await page.waitForSelector(copilotButtonSelector, { visible: true });
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded", timeout }),
      page.click(copilotButtonSelector),
    ]);

    const title = await page.title();
    expect(title).toContain("GitHub Copilot");
  }, timeout);

  test("should navigate to Pricing page and verify title", async () => {
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded", timeout }),
      page.click('a[href="/pricing"]'),
    ]);

    const title = await page.title();
    expect(title).toContain("Pricing");
  }, timeout);
});
