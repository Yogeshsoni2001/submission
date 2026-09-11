# Architecture and Design Decisions

This document outlines the key decisions made while building the test automation framework for the ShopNest Checkout 2.0.

## 1. Framework and Language Choice: Playwright with TypeScript

**Decision:** Use Playwright with TypeScript for both UI and API testing.

**Reasoning:**
- **Unified Framework:** Playwright provides excellent, built-in API testing capabilities via `request` context. This allowed me to avoid introducing a second library (like Axios or Supertest) for the API tasks. A single framework reduces context switching, simplifies CI/CD, and lowers the maintenance burden.
- **Reliability:** Playwright's auto-waiting mechanism handles asynchronous DOM changes gracefully, which is crucial for modern React applications (and explicitly required for the Dynamic Controls task).
- **TypeScript:** Adds static typing, improving code readability, catching errors early during development, and providing better IDE support for the Page Object Model.
- **Built-in HTML Reporting:** Generates a comprehensive, easy-to-read report out of the box without needing external plugins like Allure.

## 2. Test Data Management

**Decision:** Hardcode basic test data within the tests/page objects for this assignment, and use dynamic test data generation where needed (e.g., file paths).

**Reasoning:**
- Given the scope of the demo targets (`the-internet.herokuapp.com` and `reqres.in`), the required data points are static (like 'tomsmith' or specific API credentials).
- For the file upload test, I dynamically generate a temporary text file using Node's `fs` module during the test run and clean it up afterward. This ensures the test is self-contained and doesn't rely on checking external static assets into version control.

## 3. Environment Configuration

**Decision:** Hardcoded Base URLs in `playwright.config.ts` (or individual test suites) for the demo targets.

**Reasoning:**
- Since there is no staging environment provided and we are testing entirely against public demo sites, I kept the configuration simple.
- In a real-world scenario with multiple environments (Dev, QA, Staging, Prod), I would extract these URLs into `.env` files (managed by `dotenv`) and load them dynamically based on a `process.env.TEST_ENV` flag in the `playwright.config.ts`.

## 4. Future Improvements (If more time allowed)

If I were integrating this into a long-term production project, I would add:
- **Environment Variables (`dotenv`):** To manage different environments and sensitive credentials securely.
- **Test Data Factory (e.g., Faker.js):** To generate random, realistic user data for registration and checkout flows instead of using static strings.
- **ESLint & Prettier:** To enforce coding standards and formatting rules automatically across the team.
- **Visual Regression Testing:** Utilizing Playwright's visual comparison features to catch UI styling regressions on the checkout pages.
