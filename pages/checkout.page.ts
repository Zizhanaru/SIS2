
import { type Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async finish() {
    // Step 1: Open address section
    await this.page.getByTestId('proceed-2').click();

    // Step 2: Complete shipping address
    await this.page.getByTestId('country').selectOption('US');
    await this.page.getByTestId('postal_code').fill('10001');
    await this.page.getByTestId('house_number').fill('12');
    await this.page.getByTestId('street').fill('Test Street');
    await this.page.getByTestId('city').fill('Test City');
    await this.page.getByTestId('state').fill('Test State');

    // Step 3: Continue to payment
    const proceedButton = this.page.getByTestId('proceed-3');

    await expect(proceedButton).toBeEnabled({
      timeout: 15000
    });

    await proceedButton.click();

    // Step 4: Select payment method
    await this.page
      .getByTestId('payment-method')
      .selectOption({ label: 'Cash on Delivery' });

    // Step 5: Complete order
    await this.page.getByTestId('finish').click();
  }

  async expectConfirmation() {
    await expect(
      this.page
        .getByText(/payment was successful|order.*confirmed|thank you/i)
        .first()
    ).toBeVisible();
  }
}
