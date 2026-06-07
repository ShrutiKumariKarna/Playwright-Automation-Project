# QA Playwright Automation

A comprehensive UI and API test automation framework built with Playwright and TypeScript. This project demonstrates end-to-end testing of the Sauce Demo application using the Page Object Model (POM) design pattern and API validation using JSONPlaceholder.

---

## Project Overview

This framework provides:

* UI automation testing for core e-commerce workflows
* API testing with positive and negative scenarios
* Page Object Model (POM) architecture
* Environment-based configuration management
* GitHub Actions CI/CD integration
* Multi-browser execution support
* HTML reporting and debugging capabilities

---

## Project Structure

```text
Playwright-Automation-Project/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── fixtures/
│   └── testFixtures.ts
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── utils/
│   └── helpers.ts
├── tests/
│   ├── ui/
│   │   ├── login.spec.ts
│   │   ├── inventory.spec.ts
│   │   ├── cart.spec.ts
│   │   └── checkout.spec.ts
│   └── api/
│       ├── users.spec.ts
│       └── negative.spec.ts
├── assets/
│   └── report-screenshot.png
├── .env.example
├── playwright.config.ts
├── TEST_PLAN.md
├── QA Automation Assignment.md
└── README.md
```

---

## Technology Stack

* Playwright v1.60+
* TypeScript
* Node.js 18+
* Page Object Model (POM)
* GitHub Actions
* JSONPlaceholder API

---

## Application Under Test

### UI Testing

* https://www.saucedemo.com

### API Testing

* https://jsonplaceholder.typicode.com

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ShrutiKumariKarna/QA_Playwright_Automation.git
cd QA_Playwright_Automation
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npx playwright install
```

### 4. Configure Environment Variables

Create a `.env` file from the provided template:

```bash
cp .env.example .env
```

Update the `.env` file with the following values:

```env
BASE_URL=https://www.saucedemo.com
STANDARD_USER=standard_user
LOCKED_USER=locked_out_user
PASSWORD=secret_sauce

API_BASE_URL=https://jsonplaceholder.typicode.com
```

---

## Running Tests

### Execute All Tests

```bash
npm test
```

### Execute UI Tests Only

```bash
npm run test:ui
```

### Execute API Tests Only

```bash
npm run test:api
```

### Run Tests on Specific Browsers

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run Tests in Headed Mode

```bash
npm run test:headed
```

### Run Tests in Debug Mode

```bash
npm run test:debug
```

---

## Test Reports

Generate and view the Playwright HTML report:

```bash
npm run report
```

The report will be available at:

```text
http://localhost:9323
```
The HTML report includes:

* Pass/fail status for all 22 test cases
* Screenshots captured automatically on failure
* Video recordings saved on failure
* Trace files for step by step debugging

---

## Test Coverage

| Module       | Test Count | Coverage Type  |
| ------------ | ---------- | -------------- |
| Login        | 4          | UI + Negative  |
| Inventory    | 4          | UI             |
| Cart         | 4          | UI             |
| Checkout     | 3          | UI + Negative  |
| Users API    | 4          | API            |
| Negative API | 3          | API + Negative |
| **Total**    | **22**     | **UI + API**   |

---

## Framework Design

### Page Object Model (POM)

The framework follows the Page Object Model design pattern to improve:

* Test maintainability
* Code reusability
* Readability
* Scalability

### Fixtures

Custom fixtures are used for:

* Shared test setup
* Reusable login flows
* Common test data management

### Utilities

Utility functions centralize common operations and helper methods used across the framework.

---

## CI/CD Integration

The project includes GitHub Actions workflow configuration located at:

```text
.github/workflows/playwright.yml
```

The pipeline automatically:

* Installs dependencies
* Installs Playwright browsers
* Executes UI and API test suites
* Generates test reports

---

## Author

**Shruti Kumari Karna**



