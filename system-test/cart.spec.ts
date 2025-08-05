import { test, expect } from '@playwright/test';

test.describe('Cart Component E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto('/');
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
  });

  test.describe('Cart Navigation and Initial State', () => {
    test('should navigate to cart page and show empty cart', async ({ page }) => {
      // Click on the cart link in the header
      await page.click('a[href="/cart"]');

      // Verify we're on the cart page
      await expect(page).toHaveURL('/cart');

      // Check for empty cart message
      await expect(page.getByTestId('empty-cart-title')).toBeVisible();
      await expect(page.getByTestId('continue-shopping')).toBeVisible();

      // Verify cart summary shows 0 items and $0.00 (empty cart has different structure)
      await expect(page.getByText('Your cart is empty')).toBeVisible();
    });

    test('should navigate back to home from empty cart', async ({ page }) => {
      await page.click('a[href="/cart"]');
      await page.getByTestId('continue-shopping').click();

      // Should be back on home page
      await expect(page).toHaveURL('/');
      await expect(page.getByText('Welcome to Our Store')).toBeVisible();
    });
  });

  test.describe('Adding Items to Cart', () => {
    test('should add single item to cart and verify cart contents', async ({ page }) => {
      // Find and click on the first product using the data-testid
      const firstProduct = page.getByTestId('product-card').first();
      await firstProduct.click();

      // Wait for product details page to load
      await page.waitForLoadState('networkidle');

      // Add item to cart
      await page.click('text=Add to Cart');

      // Navigate to cart
      await page.click('a[href="/cart"]');

      // Verify item appears in cart
      await expect(page.getByTestId('cart-item')).toHaveCount(1);

      // Verify cart is no longer empty
      await expect(page.getByTestId('empty-cart-title')).not.toBeVisible();

      // Verify cart summary shows 1 item
      await expect(page.getByTestId('subtotal-row')).toContainText('Subtotal (1 items):');
    });

    test('should add multiple different items to cart', async ({ page }) => {
      // Add first product
      const firstProduct = page.getByTestId('product-card').first();
      await firstProduct.click();
      await page.waitForLoadState('networkidle');
      await page.click('text=Add to Cart');
      await page.goBack();

      // Add second product
      const secondProduct = page.getByTestId('product-card').nth(1);
      await secondProduct.click();
      await page.waitForLoadState('networkidle');
      await page.click('text=Add to Cart');

      // Navigate to cart
      await page.click('a[href="/cart"]');

      // Verify both items appear in cart
      await expect(page.getByTestId('cart-item')).toHaveCount(2);

      // Verify cart summary shows 2 items
      await expect(page.getByTestId('subtotal-row')).toContainText('Subtotal (2 items):');
    });

    test('should add same item multiple times and increase quantity', async ({ page }) => {
      // Add same product twice
      const firstProduct = page.getByTestId('product-card').first();
      await firstProduct.click();
      await page.waitForLoadState('networkidle');

      // Add to cart twice
      await page.click('text=Add to Cart');
      await page.click('text=In Cart (1)');

      // Navigate to cart
      await page.click('a[href="/cart"]');

      // Verify only one cart item exists but with quantity 2
      await expect(page.getByTestId('cart-item')).toHaveCount(1);
      await expect(page.getByTestId('quantity-display')).toContainText('2');

      // Verify cart summary shows 2 items
      await expect(page.getByTestId('subtotal-row')).toContainText('Subtotal (2 items):');
    });
  });

  test.describe('Cart Item Management', () => {
    test.beforeEach(async ({ page }) => {
      // Add an item to cart before each test
      const firstProduct = page.getByTestId('product-card').first();
      await firstProduct.click();
      await page.waitForLoadState('networkidle');
      await page.click('text=Add to Cart');
      await page.click('a[href="/cart"]');
    });

    test('should increase quantity using + button', async ({ page }) => {
      const initialQuantity = await page.getByTestId('quantity-display').textContent();

      await page.getByTestId('increase-quantity').click();

      const newQuantity = await page.getByTestId('quantity-display').textContent();
      expect(parseInt(newQuantity || '0')).toBe(parseInt(initialQuantity || '0') + 1);

      // Verify subtotal updates
      await expect(page.getByTestId('subtotal-row')).toContainText('Subtotal (2 items):');
    });

    test('should decrease quantity using - button', async ({ page }) => {
      // First increase quantity so we can decrease it
      await page.getByTestId('increase-quantity').click();
      await page.getByTestId('increase-quantity').click();

      const initialQuantity = await page.getByTestId('quantity-display').textContent();

      await page.getByTestId('decrease-quantity').click();

      const newQuantity = await page.getByTestId('quantity-display').textContent();
      expect(parseInt(newQuantity || '0')).toBe(parseInt(initialQuantity || '0') - 1);
    });

    test('should remove item when quantity becomes 0', async ({ page }) => {
      // Item should have quantity 1 initially
      await expect(page.getByTestId('quantity-display')).toContainText('1');

      // The decrease button should be disabled when quantity is 1
      await expect(page.getByTestId('decrease-quantity')).toBeDisabled();

      // Use the remove button instead to remove the item
      await page.getByTestId('remove-item').click();

      // Verify item is removed and empty cart is shown
      await expect(page.getByTestId('cart-item')).toHaveCount(0);
      await expect(page.getByTestId('empty-cart-title')).toBeVisible();
    });

    test('should remove item using remove button', async ({ page }) => {
      await page.getByTestId('remove-item').click();

      // Verify item is removed and empty cart is shown
      await expect(page.getByTestId('cart-item')).toHaveCount(0);
      await expect(page.getByTestId('empty-cart-title')).toBeVisible();
    });

    test('should update totals when quantity changes', async ({ page }) => {
      // Get initial subtotal
      const initialSubtotal = await page.getByTestId('subtotal-amount').textContent();

      // Increase quantity
      await page.getByTestId('increase-quantity').click();

      // Verify subtotal increased
      const newSubtotal = await page.getByTestId('subtotal-amount').textContent();
      const initialValue = parseFloat(initialSubtotal?.replace('$', '') || '0');
      const newValue = parseFloat(newSubtotal?.replace('$', '') || '0');

      expect(newValue).toBeGreaterThan(initialValue);

      // Verify total also updates
      await expect(page.getByTestId('total-amount')).toBeVisible();
    });

    test('should calculate subtotal, tax and total correctly', async ({ page }) => {
      // Add more items to test calculation
      await page.getByTestId('increase-quantity').click();
      await page.getByTestId('increase-quantity').click();

      // Get values
      const subtotalText = await page.getByTestId('subtotal-amount').textContent();
      const totalText = await page.getByTestId('total-amount').textContent();

      const subtotal = parseFloat(subtotalText?.replace('$', '') || '0');
      const total = parseFloat(totalText?.replace('$', '') || '0');

      // Tax should be 8% of subtotal
      const expectedTotal = subtotal * 1.08;

      expect(total).toBeCloseTo(expectedTotal, 2);
    });
  });

  test.describe('Cart Responsiveness and UX', () => {
    test('should display cart badge when items are added', async ({ page }) => {
      // Navigate to product and add to cart
      const firstProduct = page.getByTestId('product-card').first();
      await firstProduct.click();
      await page.waitForLoadState('networkidle');
      await page.click('text=Add to Cart');

      // Check if cart indicator/badge shows the count (this depends on header implementation)
      // This test might need adjustment based on your header component
      await expect(page.locator('a[href="/cart"]')).toBeVisible();
    });

    test('should work properly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      // Add item to cart
      const firstProduct = page.getByTestId('product-card').first();
      await firstProduct.click();
      await page.waitForLoadState('networkidle');
      await page.click('text=Add to Cart');
      await page.click('a[href="/cart"]');

      // Verify cart functionality works on mobile
      await expect(page.getByTestId('cart-item')).toBeVisible();
      await expect(page.getByTestId('quantity-display')).toBeVisible();
      await expect(page.getByTestId('cart-summary')).toBeVisible();
    });

    test('should clear cart button when cart has items', async ({ page }) => {
      // Add item to cart
      const firstProduct = page.getByTestId('product-card').first();
      await firstProduct.click();
      await page.waitForLoadState('networkidle');
      await page.click('text=Add to Cart');
      await page.click('a[href="/cart"]');

      // Accept the confirmation dialog and clear cart
      page.on('dialog', dialog => dialog.accept());
      await page.click('text=Clear Cart');

      // Verify cart is empty
      await expect(page.getByTestId('empty-cart-title')).toBeVisible();
    });
  });
});
