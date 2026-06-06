# Test Plan — Sauce Demo QA Automation

**Website:** https://www.saucedemo.com  
**API:** https://jsonplaceholder.typicode.com  
**Tool:** Playwright (TypeScript)  
**Author:** Shruti Kumari Karna  

---

## 1. Scope

### In Scope
- User authentication (login / logout)
- Product inventory page (sorting, filtering)
- Shopping cart (add, remove)
- Checkout flow (form validation, order completion)
- API testing (GET, POST, DELETE, error handling)
- Negative scenarios (invalid credentials, empty forms, missing resources)

### Out of Scope
- Payment gateway integration
- Email/notification delivery
- Performance and load testing

---

## 2. Test Environment

| Setting   | Value                                    |
|-----------|------------------------------------------|
| Base URL  | https://www.saucedemo.com                |
| API URL   | https://jsonplaceholder.typicode.com     |
| Browsers  | Chromium, Firefox, WebKit                |
| Node      | 18+                                      |
| Playwright| v1.60+                                   |

### Test Users
| Username              | Expected Behaviour          |
|-----------------------|-----------------------------|
| standard_user         | Full access                 |
| locked_out_user       | Login blocked               |
| invalid_user          | Login rejected              |

---

## 3. Test Cases

### UI Tests

| ID     | Test Case                              | Type     | Priority |
|--------|----------------------------------------|----------|----------|
| TC-001 | Valid login navigates to inventory     | Positive | Critical |
| TC-002 | Invalid login shows error message      | Negative | Critical |
| TC-003 | Locked out user shows error message    | Negative | High     |
| TC-004 | Empty fields shows error message       | Negative | High     |
| TC-005 | Inventory page displays 6 products     | Positive | High     |
| TC-006 | Sort products by price low to high     | Positive | High     |
| TC-007 | Sort products by price high to low     | Positive | High     |
| TC-008 | User can logout successfully           | Positive | Medium   |
| TC-009 | Add product to cart updates badge      | Positive | Critical |
| TC-010 | Remove product from cart clears badge  | Positive | High     |
| TC-011 | Cart page shows added product          | Positive | High     |
| TC-012 | Remove item from cart page             | Positive | High     |
| TC-013 | Complete checkout successfully         | Positive | Critical |
| TC-014 | Checkout fails with empty form fields  | Negative | High     |
| TC-015 | Continue shopping goes back to inventory| Positive | Medium  |

### API Tests

| ID     | Test Case                              | Type     | Priority |
|--------|----------------------------------------|----------|----------|
| TC-016 | GET users returns 200 and list         | Positive | High     |
| TC-017 | GET single user returns 200            | Positive | High     |
| TC-018 | POST create user returns 201           | Positive | High     |
| TC-019 | DELETE user returns 200                | Positive | Medium   |
| TC-020 | GET non-existent post returns 404      | Negative | High     |
| TC-021 | GET non-existent user returns 404      | Negative | High     |
| TC-022 | POST with empty body returns 201       | Negative | Medium   |

---

## 4. Edge Cases

| Scenario                                      | Why It Matters                        |
|-----------------------------------------------|---------------------------------------|
| Login with empty username only                | Should ask for username first         |
| Add same product multiple times               | Cart should handle correctly          |
| Navigate directly to /inventory.html          | Should redirect to login if not logged in |
| Sort immediately after page load              | Products should reorder correctly     |
| Delete non-existent API resource              | Should not crash the server           |

---

## 5. Risks

| Risk                          | Likelihood | Impact | Mitigation                  |
|-------------------------------|-----------|--------|-----------------------------|
| Site downtime during test run | Low       | High   | Retry logic enabled         |
| Slow network causing timeouts | Medium    | Medium | Increased timeout to 60s    |
| Browser version differences   | Low       | Medium | Testing on 3 browsers       |
| API endpoint changes          | Low       | High   | Switch to stable public API |

---

## 6. Entry and Exit Criteria

**Entry — tests can start when:**
- Playwright installed and browsers downloaded
- `.env` file configured
- Site is accessible

**Exit — test run is complete when:**
- All critical test cases passed
- HTML report generated
- No unhandled errors in CI logs 