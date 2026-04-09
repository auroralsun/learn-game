import { render, screen } from '@testing-library/react'
import ProgressBar from '../components/ProgressBar'

describe('ProgressBar', () => {
  it('renders the label, percentage text, and width style', () => {
    const { container } = render(<ProgressBar percentage={68} label="测试进度" />)

    expect(screen.getByText('测试进度')).toBeInTheDocument()
    expect(screen.getByText('68%')).toBeInTheDocument()
    expect(container.querySelector('.progress-fill')).toHaveStyle({ width: '68%' })
  })
})
