
import { GhostCursor, getElementBox } from './src/spoof';

async function test() {
  const mockPage: any = {
    mouse: {
      move: async () => {},
      down: async () => {},
      up: async () => {},
      wheel: async () => {},
    },
    viewportSize: () => ({ width: 1920, height: 1080 }),
    evaluate: async (fn: any) => fn(),
    locator: (selector: string) => ({
      first: () => ({
        boundingBox: async () => null, // Trigger fallback
        evaluate: async (fn: any) => {
            // This is where we can check if it fails
            return { x: 0, y: 0, width: 100, height: 100 };
        },
        scrollIntoViewIfNeeded: async () => {},
      })
    })
  };

  const cursor = new GhostCursor(mockPage);
  console.log("Cursor created");

  try {
    await cursor.click("#box1");
    console.log("Click successful");
  } catch (e) {
    console.error("Click failed", e);
  }
}

test();
