import { test, expect } from '@playwright/test'
import { perpendicular } from '../math'

test.describe('Math utilities', () => {
  test('perpendicular should return a vector perpendicular to the input', () => {
    const v1 = { x: 1, y: 0 }
    const p1 = perpendicular(v1)
    // Dot product of perpendicular vectors should be zero
    expect(p1.x * v1.x + p1.y * v1.y).toBe(0)
    expect(p1).toEqual({ x: 0, y: -1 })

    const v2 = { x: 0, y: 1 }
    const p2 = perpendicular(v2)
    expect(p2.x * v2.x + p2.y * v2.y).toBe(0)
    expect(p2).toEqual({ x: 1, y: 0 })

    const v3 = { x: 1, y: 1 }
    const p3 = perpendicular(v3)
    expect(p3.x * v3.x + p3.y * v3.y).toBe(0)
    expect(p3).toEqual({ x: 1, y: -1 })

    const v4 = { x: -5, y: 10 }
    const p4 = perpendicular(v4)
    expect(p4.x * v4.x + p4.y * v4.y).toBe(0)
    expect(p4).toEqual({ x: 10, y: 5 })

    const v5 = { x: -3, y: -4 }
    const p5 = perpendicular(v5)
    expect(p5.x * v5.x + p5.y * v5.y).toBe(0)
    expect(p5).toEqual({ x: -4, y: 3 })
  })

  test('perpendicular should handle zero vector', () => {
    const v = { x: 0, y: 0 }
    const p = perpendicular(v)
    expect(p).toEqual({ x: 0, y: 0 })
  })
})
