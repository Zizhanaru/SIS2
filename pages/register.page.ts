
import { type Page, expect } from '@playwright/test';
import { freshUser } from '../data/user.factory';

type User = ReturnType<typeof freshUser>;

export class RegisterPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto('/auth/register');
  }

  async register(user: User) {
    const values: Record<string, string> = {
      'first-name': user.firstName,
      'last-name': user.lastName,
      'dob': user.dob,
      'street': user.street,
      'postal_code': user.postalCode,
      'city': user.city,
      'state': user.state,
      'phone': user.phone,
      'email': user.email,
      'password': user.password
    };

    for (const [id, value] of Object.entries(values)) {
      await this.page.getByTestId(id).fill(value);
    }

    // Fill the required house number field
    await this.page.getByTestId('house_number').fill('42');

    // Select country
    await this.page.getByTestId('country')
      .selectOption(user.country);

    // Submit registration form
    await this.page.getByTestId('register-submit').click();
  }

  async expectRegistered() {
    await expect(this.page).toHaveURL(
      /\/auth\/login|\/account/
    );
  }
}
