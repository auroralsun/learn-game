import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

const storage = new Map()
const storageApi = {
  getItem: (key) => (storage.has(key) ? storage.get(key) : null),
  setItem: (key, value) => {
    storage.set(String(key), String(value))
  },
  removeItem: (key) => {
    storage.delete(String(key))
  },
  clear: () => {
    storage.clear()
  }
}

Object.defineProperty(globalThis, 'localStorage', {
  value: storageApi,
  writable: true,
  configurable: true
})

Object.defineProperty(window, 'localStorage', {
  value: storageApi,
  writable: true,
  configurable: true
})

afterEach(() => {
  cleanup()
  localStorage.clear()
})

class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback
  }

  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()

  trigger(entries) {
    this.callback(entries, this)
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver
})

Object.defineProperty(globalThis, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver
})
