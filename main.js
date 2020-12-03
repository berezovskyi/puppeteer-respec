const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page._client.send("Page.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: "./respec-out",
  });

  await page.goto(
    "https://oslc-op.github.io/oslc-specs/specs/auto/automation-spec.html",
    { waitUntil: "networkidle0" }
  );

  await page.click("#respec-ui > button:nth-child(1)"); //click ReSpec
  await page.click("#respec-ui > div > button:nth-child(1)"); // click Save Snapshot
  await page.waitFor(100);
  await page.click(".inside > div:nth-child(1) > a:nth-child(1)"); // click Save as HTML

  await page.waitFor(5000);

  await browser.close();
})();
