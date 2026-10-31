import { useEffect, useState } from "react"

const DEFAULT_THRESHOLD_PX = 300

/**
 * Показывает кнопку после прокрутки ниже порога и даёт плавный scroll наверх.
 * Shows the button after scrolling past the threshold and provides a smooth scroll to top.
 *
 * @param threshold - Scroll offset in pixels after which the button becomes visible.
 * @returns Object with visibility flag and a scroll-to-top handler.
 * 
 * requestAnimationFrame throttles scroll updates to one per frame.
 * Ограничивает обновления при скролле до одного раза за кадр.
 */
export const useScrollToTop = (threshold = DEFAULT_THRESHOLD_PX) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let frameId = 0

    const updateVisibility = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(() => {
        setIsVisible(window.scrollY > threshold)
      })
    }

    updateVisibility()
    window.addEventListener("scroll", updateVisibility, { passive: true })

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener("scroll", updateVisibility)
    }
  }, [threshold])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return { isVisible, scrollToTop }
}
