# QA Automation Assignment — Documentation

**Candidate:** Shruti Kumari Karna
**Tool:** Playwright (TypeScript)
**Website Tested:** https://www.saucedemo.com
**API Tested:** https://jsonplaceholder.typicode.com
**GitHub:** https://github.com/ShrutiKumariKarna/QA_Playwright_Automation

---

## 1. Objective

The goal of this assignment was to design and implement UI and API automation tests using
Playwright on a real public website. I chose saucedemo.com as it covers common e-commerce
flows like login, product browsing, cart management, and checkout — making it ideal for
demonstrating a variety of test scenarios.

---

## 2. Tools and Technologies Used

| Tool / Technology        | Purpose                                      |
|--------------------------|----------------------------------------------|
| Playwright v1.60+        | Test automation framework                    |
| TypeScript               | Programming language                         |
| Node.js 18+              | Runtime environment                          |
| saucedemo.com            | UI test website                              |
| jsonplaceholder.typicode.com | Public API for API test scenarios        |
| GitHub Actions           | CI/CD pipeline                               |
| dotenv                   | Environment variable management              |

---

## 3. Project Structure

```
Playwright-Automation-Project/
├── .github/
│   └── workflows/
│       └── playwright.yml                  CI/CD pipeline
├── fixtures/
│   └── testFixtures.ts                     Shared test setup (auto-login fixture)
├── pages/
│   ├── LoginPage.ts                        Page Object for login screen
│   ├── InventoryPage.ts                    Page Object for product inventory
│   ├── CartPage.ts                         Page Object for shopping cart
│   └── CheckoutPage.ts                     Page Object for checkout flow
├── utils/
│   └── helpers.ts                          Test data constants and helper functions
├── tests/
│   ├── ui/
│   │   ├── login.spec.ts                   Login test scenarios
│   │   ├── inventory.spec.ts               Inventory and sorting tests
│   │   ├── cart.spec.ts                    Cart add/remove tests
│   │   └── checkout.spec.ts                Checkout flow tests
│   └── api/
│       ├── users.spec.ts                   API CRUD tests
│       └── negative.spec.ts                API negative test cases
├── assets/
│   └── report-screenshot.png               HTML report screenshot
├── .env                                    Environment variables (not committed)
├── .env.example                            Template for environment variables
├── playwright.config.ts                    Playwright configuration
├── tsconfig.json                           TypeScript configuration
├── TEST_PLAN.md                            Full test plan document
├── QA Automation Assignment.md             Assignment documentation
└── README.md                              Setup and usage instructions
```

---

## 4. Architecture — Page Object Model (POM)

I used the Page Object Model pattern to keep the project maintainable and clean.
Each page of the website has its own class that contains all the selectors and
actions for that page. Test files only call methods from these classes — they never
interact with selectors directly.

**How it works:**

- `pages/LoginPage.ts` — handles going to the site, filling credentials, and reading error messages
- `pages/InventoryPage.ts` — handles sorting products, adding/removing from cart, navigating to cart, and logout
- `pages/CartPage.ts` — handles reading cart items, removing items, and proceeding to checkout
- `pages/CheckoutPage.ts` — handles filling the checkout form, continuing, finishing, and reading confirmation or error messages

**Fixtures** extend Playwright's built-in test object to provide page objects automatically.
The `authenticatedPage` fixture logs in before the test starts so tests that need
a logged-in user don't have to repeat login steps every time.

**Utils** contain shared test data like user credentials and checkout form data,
as well as helper functions for checking sort order.

---

## 5. Test Coverage

### UI Tests — 15 test cases

| Test File         | Test Case                                  | Type     |
|-------------------|--------------------------------------------|----------|
| login.spec.ts     | Valid login navigates to inventory         | Positive |
| login.spec.ts     | Invalid credentials shows error message    | Negative |
| login.spec.ts     | Locked out user cannot login               | Negative |
| login.spec.ts     | Empty fields shows username required error | Negative |
| inventory.spec.ts | Inventory page shows 6 products            | Positive |
| inventory.spec.ts | Sort by price low to high works correctly  | Positive |
| inventory.spec.ts | Sort by price high to low works correctly  | Positive |
| inventory.spec.ts | User can logout from burger menu           | Positive |
| cart.spec.ts      | Adding a product updates the cart badge    | Positive |
| cart.spec.ts      | Removing a product updates the cart badge  | Positive |
| cart.spec.ts      | Cart page shows the product I added        | Positive |
| cart.spec.ts      | Removing item from cart page empties cart  | Positive |
| checkout.spec.ts  | Can complete checkout successfully         | Positive |
| checkout.spec.ts  | Checkout form shows error when fields empty| Negative |
| checkout.spec.ts  | Continue shopping goes back to inventory   | Positive |

### API Tests — 7 test cases

| Test File          | Test Case                                  | Type     |
|--------------------|--------------------------------------------|----------|
| users.spec.ts      | GET users returns a list of users          | Positive |
| users.spec.ts      | GET single user returns correct data       | Positive |
| users.spec.ts      | POST request creates a new user            | Positive |
| users.spec.ts      | DELETE request removes a post              | Positive |
| negative.spec.ts   | GET post that does not exist returns 404   | Negative |
| negative.spec.ts   | GET user that does not exist returns 404   | Negative |
| negative.spec.ts   | POST with empty body still gets a response | Negative |

**Total: 22 test cases — all passing**

## Test Report

[View Test Report](assets/test-report.html)

---

## 6. Key Configuration Decisions

**playwright.config.ts:**
- `timeout: 60000` — increased to handle slower page loads
- `screenshot: only-on-failure` — screenshots captured automatically on failure
- `trace: retain-on-failure` — full trace file saved on failure for debugging
- `video: retain-on-failure` — video recording saved on failure
- `retries: 1` locally, `2` on CI — handles minor network flakiness
- Runs on Chromium, Firefox, and WebKit

**Environment variables (.env):**
- `BASE_URL` — base URL of the site under test
- `STANDARD_USER` / `LOCKED_USER` / `PASSWORD` — test credentials
- `API_BASE_URL` — base URL for API tests

---

## 7. Negative Test Cases

Three negative UI tests:
1. Invalid credentials — verifies the correct error message is shown
2. Locked out user — verifies locked accounts cannot log in
3. Empty checkout form — verifies form validation prevents proceeding

Three negative API tests:
1. GET non-existent post — expects 404 response
2. GET non-existent user — expects 404 response
3. POST with empty body — verifies API handles missing data gracefully

---

## 8. CI/CD — GitHub Actions

A GitHub Actions workflow runs the full test suite automatically on every push
and pull request to the main branch. It installs Node.js, installs dependencies,
installs Playwright browsers, runs all tests, and uploads the HTML report as
an artifact.

---

## 9. Test Results

All 22 tests pass successfully on Chromium.
The full test suite runs across Chromium, Firefox, and WebKit (66 tests total).

**To run locally:**
```
npm install
npx playwright install
npm test
npx playwright show-report
```

---

## 10. Challenges and Solutions

| Challenge | Solution |
|-----------|----------|
| reqres.in started returning 401 for all requests | Switched to jsonplaceholder.typicode.com which is free and stable |
| Some tests timing out due to slow site response | Increased timeout to 60 seconds and added actionTimeout/navigationTimeout |
| TypeScript strict mode causing errors in fixtures | Added explicit type annotations to fixture parameters |
| dotenv module not found on first run | Ran npm install to ensure all dependencies were installed |

---

## 11. What I Learned

- How to structure a real Playwright project using Page Object Model
- How to use Playwright fixtures to share setup logic across tests
- How to write both UI and API tests in the same framework
- How to configure HTML reporting with screenshots and trace viewer
- How to set up GitHub Actions for automated test runs
