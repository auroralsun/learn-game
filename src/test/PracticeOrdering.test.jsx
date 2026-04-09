import { render, screen, fireEvent } from '@testing-library/react'
import PracticeOrdering from '../components/PracticeOrdering'
import { vi } from 'vitest'

describe('PracticeOrdering', () => {
  it('reorders cards after drag and drop', () => {
    const onReorder = vi.fn()

    render(
      <PracticeOrdering
        prompt="请排序"
        items={['K', '2', 'A', '大王']}
        revealAnswer={false}
        onReorder={onReorder}
      />
    )

    const kingCard = screen.getByText('K').closest('.draggable-card')
    const jokerCard = screen.getByText('大王').closest('.draggable-card')

    fireEvent.dragStart(jokerCard)
    fireEvent.dragOver(kingCard)
    fireEvent.drop(kingCard)

    expect(onReorder).toHaveBeenCalledWith(['大王', 'K', '2', 'A'])
  })
})
