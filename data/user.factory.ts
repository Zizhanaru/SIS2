
import { randomUUID, randomBytes } from 'node:crypto';

// Existing customer for login tests
export const existingCustomer = {
  email: 'customer@practicesoftwaretesting.com',
  password: 'welcome01'
};

// Generate a unique user for registration
export function freshUser() {
  const id = randomUUID().slice(0, 12);

  const uniquePassword =
    `Qa!7${randomBytes(12).toString('hex')}Zz`;

  return {
    firstName: 'SIS',
    lastName: 'Student',
    dob: '1998-05-12',
    street: 'Test Street 12',
    postalCode: '10001',
    city: 'Test City',
    state: 'Test State',
    country: 'US',
    phone: '1234567890',
    email: `sis2-${id}@example.com`,
    password: uniquePassword
  };
}
