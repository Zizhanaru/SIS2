
import { test } from '../fixtures/pages.fixture';
import { freshUser } from '../data/user.factory';
import { RegisterPage } from '../pages/register.page';

test('TC02 positive: valid credentials open account', async ({
  page,
  loginPage
}) => {
  const user = freshUser();

  const registerPage = new RegisterPage(page);

  await registerPage.open();
  await registerPage.register(user);
  await registerPage.expectRegistered();

  await loginPage.open();
  await loginPage.signIn(user.email, user.password);
  await loginPage.expectAccount();
});

test('TC02 negative: invalid credentials rejected', async ({
  loginPage
}) => {
  await loginPage.open();

  await loginPage.signIn(
    'invalid-user@example.com',
    'WrongPassword123!'
  );

  await loginPage.expectLoginError();
});
