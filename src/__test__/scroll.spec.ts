import { test } from '@playwright/test'
import { GhostCursor } from '../spoof'

test('ghost cursor scroll test', async ({ page }) => {
  // Khởi tạo GhostCursor với tuỳ chọn visible: true để bạn có thể nhìn thấy con trỏ chuột
  const cursor = new GhostCursor(page, { visible: true })

  // Điều hướng đến trang Wikipedia
  await page.goto('https://en.wikipedia.org/wiki/Google')

  // Đợi trang load xong
  await page.waitForLoadState('domcontentloaded')

  // Sử dụng hàm scrollIntoView của GhostCursor để cuộn trang đến element
  // Thiết lập scrollSpeed thấp (ví dụ 50 thay vì 100) để thấy rõ hiệu ứng lăn chuột từng bước giống người thật
  await cursor.scrollIntoView('#Office_locations', {
    scrollSpeed: 50,
    inViewportMargin: 50 // Dư ra một chút lề để dễ theo dõi
  })

  // Đợi 10 giây (10000 ms) theo đúng yêu cầu
  await new Promise((resolve) => setTimeout(resolve, 10000))
})
