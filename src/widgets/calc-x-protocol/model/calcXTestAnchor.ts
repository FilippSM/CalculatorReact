import { SCROLL_BEHAVIOR } from "@/shared/lib/scroll"
import type { TestVisibilityKey } from "./calcXTestVisibilityConfig"

export const getCalcXTestElementId = (id: TestVisibilityKey) => `calc-x-test-${id}`

/** Smooth scroll to a visible test section, same behavior as scroll-to-top. */
export const scrollToCalcXTest = (id: TestVisibilityKey) => {
  document.getElementById(getCalcXTestElementId(id))?.scrollIntoView({
    behavior: SCROLL_BEHAVIOR,
    block: "start",
  })
}
