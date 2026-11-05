import { test, expect } from '@playwright/test';

test.describe('Electrical Lab Phase 1 E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Homepage loads and displays correctly', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Electrical Lab');
    await expect(page.locator('text=Virtual Workshop')).toBeVisible();
    await expect(page.locator('text=Scenarios')).toBeVisible();
    await expect(page.locator('text=Progress')).toBeVisible();
  });

  test('Navigate to workshop page', async ({ page }) => {
    await page.click('button:has-text("Enter Workshop")');
    await expect(page).toHaveURL('/workshop');
    await expect(page.locator('text=ELECTRICAL WORKSHOP')).toBeVisible();
  });

  test('Workshop page displays all panels', async ({ page }) => {
    await page.goto('/workshop');
    
    // Header
    await expect(page.locator('text=ELECTRICAL WORKSHOP')).toBeVisible();
    await expect(page.locator('text=LIVE SIMULATION')).toBeVisible();
    
    // Component palette
    await expect(page.locator('text=Component Palette')).toBeVisible();
    
    // Installation panel
    await expect(page.locator('text=Installation Panel')).toBeVisible();
    
    // Safety panel
    await expect(page.locator('text=Safety Isolation')).toBeVisible();
    
    // Multimeter
    await expect(page.locator('text=Multimeter')).toBeVisible();
    
    // Circuit analysis
    await expect(page.locator('text=Circuit Analysis')).toBeVisible();
  });

  test('Safety sequence steps are displayed', async ({ page }) => {
    await page.goto('/workshop');
    
    await expect(page.locator('text=Identify circuit')).toBeVisible();
    await expect(page.locator('text=Isolate supply')).toBeVisible();
    await expect(page.locator('text=Apply lockout')).toBeVisible();
    await expect(page.locator('text=Apply danger tag')).toBeVisible();
    await expect(page.locator('text=Verify tester')).toBeVisible();
    await expect(page.locator('text=Test conductors')).toBeVisible();
    await expect(page.locator('text=Re-verify tester')).toBeVisible();
  });

  test('Multimeter modes are available', async ({ page }) => {
    await page.goto('/workshop');
    
    await expect(page.locator('text=V~ AC')).toBeVisible();
    await expect(page.locator('text=V= DC')).toBeVisible();
    await expect(page.locator('text=Ω Cont')).toBeVisible();
    await expect(page.locator('text=Ω Res')).toBeVisible();
  });

  test('Assessment button is displayed', async ({ page }) => {
    await page.goto('/workshop');
    
    await expect(page.locator('button:has-text("Complete Assessment")')).toBeVisible();
  });

  test('Component palette shows electrical components', async ({ page }) => {
    await page.goto('/workshop');
    
    await expect(page.locator('text=Switch')).toBeVisible();
    await expect(page.locator('text=Lamp')).toBeVisible();
    await expect(page.locator('text=Resistor')).toBeVisible();
    await expect(page.locator('text=Breaker')).toBeVisible();
  });

  test('Complete assessment button works', async ({ page }) => {
    await page.goto('/workshop');
    
    await page.click('button:has-text("Complete Assessment")');
    
    // Wait for assessment results to appear
    await expect(page.locator('text=Assessment Complete')).toBeVisible({ timeout: 5000 });
  });
});
