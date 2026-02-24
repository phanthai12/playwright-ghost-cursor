import { test } from '@playwright/test'
import { GhostCursor } from '../spoof'

test('ghost cursor visible test', async ({ page }) => {
  const cursor = new GhostCursor(page, { visible: true })

  await page.goto('https://example.com')
  await page.waitForTimeout(1000)

  await cursor.moveTo({ x: 100, y: 100 })
  await page.waitForTimeout(1000)

  await cursor.moveTo({ x: 200, y: 200 })
  await page.waitForTimeout(1000)

  await cursor.click()
  await page.waitForTimeout(1000)
})
