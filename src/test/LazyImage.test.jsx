import { render, screen, waitFor } from '@testing-library/react'
import LazyImage from '../components/LazyImage'
import { vi } from 'vitest'

describe('LazyImage', () => {
  it('loads immediately when IntersectionObserver is unavailable', () => {
    const originalObserver = window.IntersectionObserver
    delete window.IntersectionObserver

    render(<LazyImage src="real-image.png" alt="示例图片" />)

    const image = screen.getByAltText('示例图片')
    expect(image).toHaveAttribute('src', 'real-image.png')
    expect(image).toHaveClass('lazy-loaded')

    window.IntersectionObserver = originalObserver
  })

  it('keeps the placeholder until the image intersects and finishes loading', async () => {
    const observerInstances = []
    class TestIntersectionObserver {
      constructor(callback) {
        this.callback = callback
        observerInstances.push(this)
      }

      observe = vi.fn()
      unobserve = vi.fn()
      disconnect = vi.fn()
    }

    window.IntersectionObserver = TestIntersectionObserver

    class MockImage {
      set src(value) {
        this._src = value
        setTimeout(() => this.onload?.(), 0)
      }
    }

    const originalImage = global.Image
    global.Image = MockImage

    render(<LazyImage src="loaded-image.png" alt="延迟图片" />)

    const image = screen.getByAltText('延迟图片')
    expect(image).toHaveClass('lazy-loading')

    observerInstances[0].callback([{ isIntersecting: true }])

    await waitFor(() => {
      expect(image).toHaveAttribute('src', 'loaded-image.png')
      expect(image).toHaveClass('lazy-loaded')
    })

    global.Image = originalImage
  })
})
