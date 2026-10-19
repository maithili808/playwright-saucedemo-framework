# Playwright TypeScript Automation Framework

![Playwright Tests](https://github.com/maithili808/playwright-saucedemo-framework/actions/workflows/playwright.yml/badge.svg)

UI and API test automation framework built with **Playwright** and **TypeScript**, using the **Page Object Model (POM)**, custom fixtures, data-driven tests and multi-environment configuration. UI tests run against the practice shop [SauceDemo](https://www.saucedemo.com/) and API tests run against [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

## Highlights
- 25 UI tests running on **Chromium, Firefox and WebKit**, plus 5 API tests (80 test runs in total)
- **Page Object Model** with one class per page
- **Custom fixtures** that supply page objects and a ready-logged-in user
- **Data-driven tests** for login (valid and invalid users)
- **Multi-environment config** (dev, qa, stage, prod) selected with the `ENV` variable
- **CI** with GitHub Actions
- HTML report, plus screenshots and video for failed tests

## Tech stack
- Playwright
- TypeScript
- Node.js
- GitHub Actions
- cross-env

## Test coverage
| Area | Tests | What is checked |
|---|---|---|
| Login | 11 | 5 valid users, 5 invalid logins (locked out, wrong password, unknown user, empty username, empty password), logout |
| Inventory | 6 | Sort by name and price, cart badge when adding and removing products |
| Cart | 3 | Add a random product, add several products, remove a product |
| Checkout | 5 | Full purchase, missing first name, last name and postal code errors, item total and tax calculation |
| API | 5 | GET, POST, DELETE and 404 checks on JSONPlaceholder |

UI tests run on 3 browsers (25 x 3 = 75 runs) and API tests run once (5), which gives 80 test runs.

## Project structure
```
src/
  config/saucedemo/     environment settings (dev, qa, stage, prod)
  data/saucedemo/       test data (users and expected login errors)
  fixtures/saucedemo/   fixtures that give tests their page objects
  pages/saucedemo/      Page Object classes (login, inventory, cart, checkout)
  utils/                helper functions (random picker, price parser)
tests/
  ui/saucedemo/         UI test specs
  api/jsonplaceholder/  API test specs
playwright.config.ts    Playwright settings (browsers, reports, timeouts)
tsconfig.json           TypeScript settings
.github/workflows/      GitHub Actions workflow
```

## Getting started
You need [Node.js](https://nodejs.org/) installed.

```bash
git clone https://github.com/maithili808/playwright-saucedemo-framework.git
cd playwright-saucedemo-framework
npm install
npx playwright install
npm test
```

## Run commands
```bash
npm test                  # run all tests on all browsers
npm run test:headed       # watch the browser while tests run
npm run test:ui           # interactive UI mode
npm run test:qa           # run against the qa environment
npm run report            # open the HTML report

npx playwright test --project=chromium     # one browser only
npx playwright test --project=api          # API tests only
npx playwright test -g "login"             # tests with "login" in the name
```

## Environments
The `ENV` variable chooses the settings in `src/config/saucedemo/env.config.ts`. The default is `dev`.

```bash
npm run test:dev
npm run test:qa
npm run test:stage
npm run test:prod
```

SauceDemo has only one public site, so all four environments point to the same address. The structure is built so that each environment can be given its own URL and credentials.

## How it works
1. `playwright.config.ts` reads the settings and the `ENV` value.
2. Each test asks for the page objects it needs through a fixture.
3. Page objects hold the locators and actions (`login()`, `addRandomProduct()`, `checkout()`), so a UI change is fixed in one file.
4. Tests use `expect` assertions to check the result.
5. Playwright creates an HTML report, and keeps a screenshot and video for failures.

## What I learned
- **Page Object Model:** I kept locators and actions in page classes (`LoginPage`, `InventoryPage`, `CartPage`, `CheckoutPage`), so a UI change means editing one file instead of every test.
- **Fixtures:** I wrote custom fixtures in `pages.fixture.ts`, including a `loggedInInventory` fixture that starts a test already logged in.
- **Data-driven testing:** Login tests loop over a list of users and expected error messages, so adding a case means adding one row of data.
- **Multiple environments:** The `ENV` variable selects the config, and `cross-env` makes the npm scripts work on Windows, Mac and Linux.
- **Stable locators:** I used `getByTestId` (with `testIdAttribute` set to `data-test`) and `getByRole` instead of CSS or XPath selectors.
- **Cross-browser and API testing:** The same suite runs on Chromium, Firefox and WebKit, and API tests use Playwright's `request` fixture.
- **Debugging:** I fixed a TypeScript setup error (`Cannot find name 'process'`) by adding a `tsconfig.json`, and fixed a failing logout test by reading Playwright's error log and finding the correct locator.

## Author
**Maithili Zope**
[LinkedIn](https://linkedin.com/in/maithili-zope) | [GitHub](https://github.com/maithili808) | zopemaithili5@gmail.com