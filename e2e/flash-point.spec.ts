import { test, expect } from '@playwright/test'

test.describe('Flash point', () => {
  /** Открывает протокол CalcX и проверяет, что таблица данных температуры вспышки видна. */
  test('shows flash point data table', async ({ page }) => {
    await page.goto('/#/calcX')

    await expect(
      page.getByRole('table', { name: 'Данные температуры вспышки' }),
    ).toBeVisible()
  })

  /** Задаёт давление 99.5, вводит две температуры и проверяет среднее 122. */
  test('calculates average after entering two temperatures', async ({ page }) => {
    await page.goto('/#/calcX')

    // Поправка 0 при p=99.5 → среднее от 120 и 124 = 122
    await page.locator('input:not([readonly])[value="98,6"]').fill('99.5')

    const table = page.getByRole('table', { name: 'Данные температуры вспышки' })
    await table.scrollIntoViewIfNeeded()

    const inputs = table.getByRole('textbox')
    await inputs.nth(0).fill('120')
    await inputs.nth(4).fill('124')

    await expect(inputs.nth(9)).toHaveValue('122')
  })
})
