import { test, expect, Locator } from '@playwright/test'
import { type ClickOptions, GhostCursor } from '../spoof'
import { join } from 'path'
import { readFileSync } from 'fs'
import { installMouseHelper } from '../mouse-helper'

let cursor: GhostCursor

const cursorDefaultOptions = {
  moveDelay: 0,
  moveSpeed: 99,
  hesitate: 0,
  waitForClick: 0,
  scrollDelay: 0,
  scrollSpeed: 99,
  inViewportMargin: 50
} as const satisfies ClickOptions

declare global {
  // eslint-disable-next-line no-var
  var boxWasClicked: boolean
}

test.describe('Mouse movements', () => {
  const html = readFileSync(join(__dirname, 'custom-page.html'), 'utf8')

  test.beforeAll(async () => {
    // Tests are isolated, so installing it per test context makes more sense or directly inside beforeEach
  })

  test.beforeEach(async ({ page }) => {
    await installMouseHelper(page)
    await page.goto('data:text/html,' + encodeURIComponent(html), {
      waitUntil: 'networkidle'
    })

    cursor = new GhostCursor(page, {
      defaultOptions: {
        move: cursorDefaultOptions,
        click: cursorDefaultOptions,
        moveTo: cursorDefaultOptions
      }
    })
  })

  test('Should click on the element without throwing an error (CSS selector)', async ({ page }) => {
    expect(await page.evaluate(() => window.boxWasClicked)).toBeFalsy()
    await cursor.click('#box1')
    expect(await page.evaluate(() => window.boxWasClicked)).toBeTruthy()
  })

  test('Should click on the element without throwing an error (XPath selector)', async ({ page }) => {
    expect(await page.evaluate(() => window.boxWasClicked)).toBeFalsy()
    await cursor.click('//*[@id="box1"]')
    expect(await page.evaluate(() => window.boxWasClicked)).toBeTruthy()
  })

  test('Should scroll to elements correctly', async ({ page }) => {
    const getScrollPosition = async (): Promise<{ top: number, left: number }> => await page.evaluate(() => (
      { top: window.scrollY, left: window.scrollX }
    ))

    const boxes = await Promise.all([1, 2, 3].map(async (number: number): Promise<Locator> => {
      const selector = `#box${number}`
      const locator = page.locator(selector)
      await locator.waitFor()
      return locator
    }))

    expect(await getScrollPosition()).toEqual({ top: 0, left: 0 })

    await cursor.click(boxes[0])
    expect(await getScrollPosition()).toEqual({ top: 0, left: 0 })

    await cursor.move(boxes[1])
    expect(await getScrollPosition()).toEqual({ top: 2380, left: 0 })

    await cursor.move(boxes[2])
    expect(await getScrollPosition()).toEqual({ top: 4330, left: 1770 })

    await cursor.click(boxes[0])
  })

  test('Should scroll to position correctly', async ({ page }) => {
    const getScrollPosition = async (): Promise<{ top: number, left: number }> => await page.evaluate(() => (
      { top: window.scrollY, left: window.scrollX }
    ))

    expect(await getScrollPosition()).toEqual({ top: 0, left: 0 })

    await cursor.scrollTo('bottom')
    expect(await getScrollPosition()).toEqual({ top: 4330, left: 0 })

    await cursor.scrollTo('right')
    expect(await getScrollPosition()).toEqual({ top: 4330, left: 1770 })

    await cursor.scrollTo('top')
    expect(await getScrollPosition()).toEqual({ top: 0, left: 1770 })

    await cursor.scrollTo('left')
    expect(await getScrollPosition()).toEqual({ top: 0, left: 0 })

    await cursor.scrollTo({ y: 200, x: 400 })
    expect(await getScrollPosition()).toEqual({ top: 200, left: 400 })
  })
})
