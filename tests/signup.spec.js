import { test, expect } from '@playwright/test';

test.use({
  launchOptions: {
    slowMo: 1000  // Slows down each action by 1 second (great for learning)
  }
});

test.describe('Signup functionality', () => {

  
  test('user can sign up successfully', async ({ page }) => {
    // Generate unique test data to avoid conflicts
    const timestamp = Date.now();
    const testUser = {
      fullname: `Test User ${timestamp}`,
      username: `testuser_${timestamp}`,
      password: 'TestPassword123!'
    };
    
    console.log(`Testing signup with username: ${testUser.username}`);
    
    // STEP 1: Go to signup page
    await page.goto('/signup');
    
    // STEP 2: Fill in the signup form
    await page.fill('input[name="fullname"]', testUser.fullname);
    await page.fill('input[name="username"]', testUser.username);
    await page.fill('input[name="password"]', testUser.password);
    
    // STEP 3: Click signup button
    await page.click('button:has-text("Signup")');
    
    // STEP 4: Wait for navigation to login page (from your navigate("/login"))
    await page.waitForURL('/login', { timeout: 10000 });
    
    // STEP 5: Verify we're on the login page
    await expect(page).toHaveURL('/login');
    
    // STEP 6: Check for success message (if your login page shows it)
    // Note: Your signup shows success message, but it disappears after navigation
    // You might want to check localStorage or sessionStorage instead
  });
  
  test('shows validation errors for empty fields', async ({ page }) => {
    await page.goto('/signup');
    
    // Click signup without filling any fields
    await page.click('button:has-text("Signup")');
    
    // Check for validation error messages
    await expect(page.getByText('Name is required!')).toBeVisible();
    await expect(page.getByText('Username is required!')).toBeVisible();
    await expect(page.getByText('Password is required!')).toBeVisible();
    
    // Should still be on signup page
    await expect(page).toHaveURL('/signup');
  });
  
  test('shows error when username already exists', async ({ page }) => {
    // First, create a user
    const timestamp = Date.now();
    const existingUsername = `existing_${timestamp}`;
    
    // Sign up once
    await page.goto('/signup');
    await page.fill('input[name="fullname"]', 'Existing User');
    await page.fill('input[name="username"]', existingUsername);
    await page.fill('input[name="password"]', 'Password123!');
    await page.click('button:has-text("Signup")');
    await page.waitForURL('/login');
    
    // Go back to signup and try same username
    await page.goto('/signup');
    await page.fill('input[name="fullname"]', 'Different User');
    await page.fill('input[name="username"]', existingUsername); // Same username
    await page.fill('input[name="password"]', 'DifferentPass123!');
    await page.click('button:has-text("Signup")');
    
    // Check for duplicate username error (status 409 in your code)
    await expect(page.getByText(/username already existing/i)).toBeVisible();
    
    // Should still be on signup page
    await expect(page).toHaveURL('/signup');
  });
  
  test('shows error for weak password (status 400)', async ({ page }) => {
    await page.goto('/signup');
    
    await page.fill('input[name="fullname"]', 'Test User');
    await page.fill('input[name="username"]', `weakpass_${Date.now()}`);
    await page.fill('input[name="password"]', 'weak'); // Weak password
    
    await page.click('button:has-text("Signup")');
    
    // Check for password weakness error
    await expect(page.getByText(/password is weak/i)).toBeVisible();
    
    // Should still be on signup page
    await expect(page).toHaveURL('/signup');
  });
  
  test('shows loading state during signup', async ({ page }) => {
    // Setup a slow response to see loading state
    await page.route('**/auth/signup', async route => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await route.continue();
    });
    
    await page.goto('/signup');
    
    await page.fill('input[name="fullname"]', 'Loading Test');
    await page.fill('input[name="username"]', `loading_${Date.now()}`);
    await page.fill('input[name="password"]', 'TestPass123!');
    
    // Click signup
    await page.click('button:has-text("Signup")');
    
    // Check button shows loading state
    await expect(page.getByText('Signing up...')).toBeVisible();
    await expect(page.locator('button:has-text("Signing up...")')).toBeDisabled();
    
    // Wait for completion
    await page.waitForURL('/login', { timeout: 10000 });
  });
  
  test('shows success message before redirect', async ({ page }) => {
    const timestamp = Date.now();
    
    await page.goto('/signup');
    
    await page.fill('input[name="fullname"]', `Success Test ${timestamp}`);
    await page.fill('input[name="username"]', `success_${timestamp}`);
    await page.fill('input[name="password"]', 'TestPass123!');
    
    // Click signup and wait for BOTH the success message AND navigation
    await Promise.all([
        page.waitForURL('/login', { timeout: 10000 }),  // Wait for redirect
        expect(page.getByText(/success/i)).toBeVisible({ timeout: 3000 }),  // Check message before it disappears
        page.click('button:has-text("Signup")')
    ]);
    
    // Success message might be gone now, but at least we checked it
    console.log('Test passed - success message was visible briefly');
    });
});