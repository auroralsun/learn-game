import {
  getProgressData,
  markSectionComplete,
  markPracticeComplete,
  getGameProgress,
  getGameCompletionPercentage,
  getOverallProgress,
  resetAllProgress
} from '../utils/progressTracker'

describe('progressTracker', () => {
  it('initializes default progress data', () => {
    const data = getProgressData()

    expect(data.games.eightyPoints.completedSections).toEqual([])
    expect(data.games.sichuanMahjong.completedPractices).toEqual([])
    expect(data.games.doudizhu.lastAccessed).toBeNull()
  })

  it('marks sections and practices without duplicating entries', () => {
    markSectionComplete(1, 'basicRules')
    markSectionComplete(1, 'basicRules')
    markPracticeComplete(1, 'basicRules')
    markPracticeComplete(1, 'basicRules')

    const gameProgress = getGameProgress(1)
    expect(gameProgress.completedSections).toEqual(['basicRules'])
    expect(gameProgress.completedPractices).toEqual(['basicRules'])
    expect(gameProgress.lastAccessed).not.toBeNull()
  })

  it('calculates per-game and overall completion percentages', () => {
    markSectionComplete(1, 'basicRules')
    markPracticeComplete(1, 'basicRules')
    markSectionComplete(2, 'basicRules')
    markPracticeComplete(3, 'basicRules')

    expect(getGameCompletionPercentage(1)).toBe(13)
    expect(getGameCompletionPercentage(99)).toBe(0)
    expect(getOverallProgress()).toBe(8)
  })

  it('resets all persisted progress', () => {
    markSectionComplete(3, 'basicRules')

    resetAllProgress()

    expect(getGameProgress(3).completedSections).toEqual([])
    expect(getOverallProgress()).toBe(0)
  })
})
