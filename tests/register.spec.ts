import { test } from '../fixtures/pages.fixture';
import { freshUser } from '../data/user.factory';
test('TC01 register unique customer', async ({ registerPage }) => {
  await registerPage.open();
  await registerPage.register(freshUser());
  await registerPage.expectRegistered();
});
