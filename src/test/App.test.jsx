import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from '../App'
import { vi } from 'vitest'

vi.mock('../utils/progressTracker', () => ({
  getOverallProgress: vi.fn(() => 50),
  getGameCompletionPercentage: vi.fn((gameId) => ({ 1: 25, 2: 50, 3: 75 }[gameId] ?? 0))
}))

describe('App', () => {
  it('renders the game selection overview with progress data', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: '游戏选择' })).toBeInTheDocument()
    expect(screen.getByText('八十分')).toBeInTheDocument()
    expect(screen.getByText('麻将-川麻')).toBeInTheDocument()
    expect(screen.getByText('斗地主')).toBeInTheDocument()
    expect(screen.getByText('总体进度')).toBeInTheDocument()
    expect(screen.getAllByText(/学习进度/)).toHaveLength(4)
    expect(screen.getAllByText('50%')).toHaveLength(2)
  })

  it('navigates into a learning page and back to the selection screen', async () => {
    render(<App />)

    fireEvent.click(screen.getByText('八十分'))

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: '八十分游戏学习指南' })).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: '← 返回游戏选择' }))

    expect(screen.getByRole('heading', { name: '游戏选择' })).toBeInTheDocument()
  })
})
