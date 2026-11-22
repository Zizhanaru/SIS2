
import { type Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto('/auth/login');

    // After registration the site may already treat the browser as signed in
    // and redirect away from the login form. Start every login from a clean,
    // signed-out state: clear the stored session and open the page again.
    await this.page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await this.page.context().clearCookies();
    await this.page.goto('/auth/login');

    await expect(this.page.getByTestId('email')).toBeVisible({ timeout: 30000 });
  }

  async signIn(email: string, password: string) {
    await this.page.getByTestId('email').fill(email);
    await this.page.getByTestId('password').fill(password);
    await this.page.getByTestId('login-submit').click();
  }

  async expectAccount() {
    await expect(this.page).toHaveURL(/\/account(?:\/|$)/);
  }

  async expectLoginError() {
    await expect(
      this.page.getByRole('alert')
        .or(this.page.getByText(/invalid|incorrect|failed|locked/i))
        .first()
    ).toBeVisible();

    await expect(this.page).not.toHaveURL(/\/account/);
  }

  async forgotPassword() {
    await this.page.getByRole('link', {
      name: /forgot.*password/i
    }).click();
  }

  async requestReset(email: string) {
    await this.page.getByTestId('email').fill(email);
    await this.page.getByTestId('forgot-password-submit').click();
  }
}
