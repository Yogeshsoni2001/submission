# ShopNest E-Commerce Platform - QA Automation

This repository contains the automated test suite for the ShopNest checkout experience rebuild. It includes both UI automation using the Page Object Model (POM) and API testing, built with Playwright and TypeScript.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (v9 or higher)

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright Browsers:**
   ```bash
   npx playwright install --with-deps chromium
   ```

## Running Tests

You can run the tests using the npm scripts defined in `package.json`.

- **Run all tests (UI and API) headlessly:**
  ```bash
  npm run test
  ```

- **Run only UI tests:**
  ```bash
  npm run test:ui
  ```

- **Run only API tests:**
  ```bash
  npm run test:api
  ```

## Viewing the Report

After running the tests, Playwright automatically generates an HTML report. To view it, run:
```bash
npm run report
```

## Project Structure

- `pages/`: Contains the Page Object Model (POM) classes for UI tests.
- `tests/ui/`: Contains the UI test scenarios.
- `tests/api/`: Contains the API test scenarios.
- `playwright.config.ts`: Global Playwright configuration file.
- `.github/workflows/`: GitHub Actions CI workflow for running tests automatically.
