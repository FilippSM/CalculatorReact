import { test, expect } from '@playwright/test'

test('e2e setup smoke stub', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL(/CalculatorReact/)
})
