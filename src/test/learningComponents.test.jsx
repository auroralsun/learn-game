import { render, screen, fireEvent } from '@testing-library/react'
import EightyPointsLearning from '../components/EightyPointsLearning'
import SichuanMahjongLearning from '../components/SichuanMahjongLearning'
import DoudizhuLearning from '../components/DoudizhuLearning'
import { vi } from 'vitest'

const { markSectionComplete, markPracticeComplete } = vi.hoisted(() => ({
  markSectionComplete: vi.fn(),
  markPracticeComplete: vi.fn()
}))

vi.mock('../utils/progressTracker', () => ({
  markSectionComplete,
  markPracticeComplete
}))

const cases = [
  {
    name: '八十分',
    component: EightyPointsLearning,
    title: '八十分游戏学习指南',
    introSection: '基本规则',
    introContent: '规则声明',
    advancedSection: '高级策略',
    advancedContent: '技巧声明',
    gameId: 1
  },
  {
    name: '川麻',
    component: SichuanMahjongLearning,
    title: '川麻游戏学习指南',
    introSection: '基本规则',
    introContent: '规则声明',
    advancedSection: '特殊牌型',
    advancedContent: '技巧声明',
    gameId: 2
  },
  {
    name: '斗地主',
    component: DoudizhuLearning,
    title: '斗地主游戏学习指南',
    introSection: '基本规则',
    introContent: '规则声明',
    advancedSection: '地主技巧',
    advancedContent: '技巧声明',
    gameId: 3
  }
]

describe.each(cases)('$name学习页', ({ component: Component, title, introSection, introContent, advancedSection, advancedContent, gameId }) => {
  beforeEach(() => {
    markSectionComplete.mockClear()
    markPracticeComplete.mockClear()
  })

  it('supports switching tabs and expanding learning sections', () => {
    render(<Component />)

    expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()

    fireEvent.click(screen.getByText(introSection))
    expect(screen.getByText(introContent)).toBeInTheDocument()
    expect(markSectionComplete).toHaveBeenCalledWith(gameId, 'basicRules')

    fireEvent.click(screen.getByRole('button', { name: '进阶阶段' }))
    fireEvent.click(screen.getByText(advancedSection))
    expect(screen.getByText(advancedContent)).toBeInTheDocument()
  })

  it('opens, steps through, and closes a practice modal', () => {
    render(<Component />)

    fireEvent.click(screen.getByText(introSection))
    fireEvent.click(screen.getByRole('button', { name: '开始实践练习' }))

    expect(screen.getByRole('heading', { name: '游戏目标实践' })).toBeInTheDocument()
    expect(screen.getByText(/1 \/ /)).toBeInTheDocument()
    expect(markPracticeComplete).toHaveBeenCalledWith(gameId, 'basicRules')

    const options = screen.getAllByRole('button').filter((button) =>
      button.className.includes('option-btn')
    )
    expect(options.some((button) => button.className.includes('revealed-correct'))).toBe(false)

    fireEvent.click(options[0])
    fireEvent.click(screen.getByRole('button', { name: '下一步' }))

    const updatedOptions = screen.getAllByRole('button').filter((button) =>
      button.className.includes('option-btn')
    )
    expect(updatedOptions.some((button) => button.className.includes('revealed-correct'))).toBe(true)
    expect(screen.getByText(/回答正确|这题需要修正/)).toBeInTheDocument()
    expect(screen.getByText(/知识点：/)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: '下一步' }))
    expect(screen.getByText(/2 \/ /)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: '上一步' }))
    expect(screen.getByText(/1 \/ /)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: '×' }))
    expect(screen.queryByRole('heading', { name: '游戏目标实践' })).not.toBeInTheDocument()
  })
})

it('closes the practice modal after the final quiz step is completed', () => {
  render(<SichuanMahjongLearning />)

  fireEvent.click(screen.getByText('计分规则'))
  fireEvent.click(screen.getByRole('button', { name: '开始实践练习' }))

  const answerFirstQuestion = () => {
    const optionButtons = screen.getAllByRole('button').filter((button) =>
      button.className.includes('option-btn')
    )

    fireEvent.click(optionButtons[0])
    fireEvent.click(screen.getByRole('button', { name: '下一步' }))
    fireEvent.click(screen.getByRole('button', { name: '下一步' }))
  }

  answerFirstQuestion()
  expect(screen.getByText('2 / 2')).toBeInTheDocument()

  const finalStepOptions = screen.getAllByRole('button').filter((button) =>
    button.className.includes('option-btn')
  )
  fireEvent.click(finalStepOptions[1])
  fireEvent.click(screen.getByRole('button', { name: '下一步' }))
  fireEvent.click(screen.getByRole('button', { name: '下一步' }))

  expect(screen.queryByRole('heading', { name: '常见番型实践' })).not.toBeInTheDocument()
})
