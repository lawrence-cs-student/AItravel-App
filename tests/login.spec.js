// Import the Playwright testing tools
// test: defines our test cases
// expect: makes assertions/checks about what should happen
import { test, expect } from '@playwright/test';

// test() creates a new test case
// First argument: name of your test (descriptive)
// Second argument: async function that contains your test steps
test('user can login successfully', async ({ page }) => {
  
  // STEP 1: Navigate to the login page
  // page.goto() tells the browser to visit a URL
  // The '/' means relative to your baseURL (if configured in playwright.config.js)
  // If no baseURL, you'd write 'https://example.com/login'
  await page.goto('/login');

  // STEP 2: Fill in the email input field
  // page.fill() types text into an input field
  // First argument: CSS selector to find the element (input with name="email")
  // Second argument: text to type into that field
  await page.fill('input[name="username"]', 'yoimiya');
  
  // STEP 3: Fill in the password input field
  // Same as above, but for the password field
  await page.fill('input[name="password"]', '12345678');

  // STEP 4: Click the submit button
  // page.click() clicks on an element
  // Finds the button element with type="submit" and clicks it
  await page.getByRole('button', { name: 'Login' }).click();

  // STEP 5: Verify login was successful
  // expect() makes an assertion (a check that passes or fails)
  // .toHaveURL() checks that the current page URL matches the pattern
  // /dashboard/ is a regular expression (regex) that looks for "dashboard" in the URL
  // If the URL doesn't contain "dashboard", the test will fail
  await expect(page).toHaveURL(/dashboard/);
  
  // NOTE: The test automatically passes if all steps complete without errors
  // The test automatically fails if any assertion fails or any step throws an error
});