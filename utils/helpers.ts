export const TEST_USERS = {
  standard: {
    username: process.env.STANDARD_USER ?? 'standard_user',
    password: process.env.PASSWORD ?? 'secret_sauce',
  },
  locked: {
    username: process.env.LOCKED_USER ?? 'locked_out_user',
    password: process.env.PASSWORD ?? 'secret_sauce',
  },
  invalid: {
    username: 'invalid_user',
    password: 'wrong_password',
  },
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
  empty: {
    firstName: '',
    lastName: '',
    zipCode: '',
  },
};

export function parsePriceText(priceText: string): number {
  return parseFloat(priceText.replace('$', ''));
}

export function isSortedAscending(values: number[]): boolean {
  return values.every((v, i) => i === 0 || values[i - 1] <= v);
}

export function isSortedDescending(values: number[]): boolean {
  return values.every((v, i) => i === 0 || values[i - 1] >= v);
}