// test data and helper functions used across test files

export const TEST_USERS = {
  standard: {
    username: process.env.STANDARD_USER ?? 'standard_user',
    password: process.env.PASSWORD ?? 'secret_sauce',
  },
  locked: {
    username: process.env.LOCKED_USER ?? 'locked_out_user',
    password: process.env.PASSWORD ?? 'secret_sauce',
  },
  // intentionally wrong credentials for negative tests
  invalid: {
    username: 'invalid_user',
    password: 'wrong_password',
  },
  // both fields empty to test validation
  empty: {
    username: '',
    password: '',
  },
};

export const CHECKOUT_DATA = {
  valid: {
    firstName: 'John',
    lastName: 'Doe',
    zipCode: '10001',
  },
  // used to test empty form validation
  empty: {
    firstName: '',
    lastName: '',
    zipCode: '',
  },
};

// strips dollar sign and returns a number
// e.g. "$9.99" becomes 9.99
export function parsePriceText(price: string): number {
  return parseFloat(price.replace('$', ''));
}

// checks if an array of numbers goes from low to high
export function isSortedAscending(values: number[]): boolean {
  return values.every((val, i) => i === 0 || values[i - 1] <= val);
}

// checks if an array of numbers goes from high to low
export function isSortedDescending(values: number[]): boolean {
  return values.every((val, i) => i === 0 || values[i - 1] >= val);
}