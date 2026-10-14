# Playwright TypeScript Automation Framework

UI test automation framework built with **Playwright** and **TypeScript**, using the **Page Object Model (POM)**, custom fixtures and multi-environment configuration. Tests run against the practice site [SauceDemo](https://www.saucedemo.com/).

## Tech stack
- Playwright
- TypeScript
- Node.js
- Page Object Model + custom fixtures
- GitHub Actions (CI)

## Project structure
- `src/pages/saucedemo/` : Page Object classes (login, inventory, cart, checkout)
- `src/fixtures/saucedemo/` : fixtures that supply page objects to tests
- `src/config/saucedemo/` : environment config (dev, qa, stage, prod)
- `src/utils/` : helper functions
- `tests/ui/saucedemo/` : test specs
- `playwright.config.ts` : Playwright settings

## Test coverage
- Login: valid user, locked-out user, wrong password, empty username
- Cart: add a random product and verify it appears in the cart
- Checkout: complete end-to-end purchase
- [Add more as you write them]

## Getting started
```bash
git clone https://github.com/maithili808/playwright-saucedemo-framework.git
cd playwright-saucedemo-framework
npm install
npx playwright install
npm test
```

## Run commands
```bash
npm run test:headed     # watch the browser
npm run test:ui         # interactive UI mode
npm run test:qa         # run against the qa environment
npm run report          # open the HTML report
```

## What I learned
- Page Object Model and why it keeps tests maintainable
- Using fixtures to share setup across tests
- Switching environments with the ENV variable
- Writing stable locators with getByTestId and getByRole

## Author
**Maithili Zope** | [LinkedIn](https://linkedin.com/in/maithili-zope) | zopemaithili5@gmail.com