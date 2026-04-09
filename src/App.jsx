import { useState, useEffect, lazy, Suspense } from 'react'
import './App.css'
import ProgressBar from './components/ProgressBar'
import LazyImage from './components/LazyImage'
import { getGameCompletionPercentage, getOverallProgress } from './utils/progressTracker'
import { gameImages, startImageGenerationMonitor } from './utils/images'

// 实现组件懒加载
const EightyPointsLearning = lazy(() => import('./components/EightyPointsLearning'))
const SichuanMahjongLearning = lazy(() => import('./components/SichuanMahjongLearning'))
const DoudizhuLearning = lazy(() => import('./components/DoudizhuLearning'))

function App() {
  const [selectedGame, setSelectedGame] = useState(null)
  const [currentPage, setCurrentPage] = useState('gameSelection')
  const [progress, setProgress] = useState({
    overall: 0,
    games: {
      1: 0,
      2: 0,
      3: 0
    }
  })

  useEffect(() => {
    // 加载进度数据
    const overall = getOverallProgress();
    const game1Progress = getGameCompletionPercentage(1);
    const game2Progress = getGameCompletionPercentage(2);
    const game3Progress = getGameCompletionPercentage(3);
    
    setProgress({
      overall,
      games: {
        1: game1Progress,
        2: game2Progress,
        3: game3Progress
      }
    });
  }, [currentPage])

  useEffect(() => {
    startImageGenerationMonitor()
  }, [])

  const games = [
    {
      id: 1,
      name: '八十分',
      description: '经典的纸牌游戏，需要团队合作',
      image: gameImages['eighty-points']
    },
    {
      id: 2,
      name: '麻将-川麻',
      description: '四川麻将，血战到底规则',
      image: gameImages['sichuan-mahjong']
    },
    {
      id: 3,
      name: '斗地主',
      description: '三人纸牌游戏，斗智斗勇',
      image: gameImages.doudizhu
    }
  ]

  const handleGameSelect = (game) => {
    setSelectedGame(game)
    if (game.id === 1) {
      setCurrentPage('eightyPointsLearning')
    } else if (game.id === 2) {
      setCurrentPage('sichuanMahjongLearning')
    } else if (game.id === 3) {
      setCurrentPage('doudizhuLearning')
    }
  }

  const handleBack = () => {
    setCurrentPage('gameSelection')
    setSelectedGame(null)
  }

  if (currentPage === 'eightyPointsLearning') {
    return (
      <div>
        <button className="back-button" onClick={handleBack}>
          ← 返回游戏选择
        </button>
        <Suspense fallback={<div className="page-loading">加载中...</div>}>
          <EightyPointsLearning />
        </Suspense>
      </div>
    )
  }

  if (currentPage === 'sichuanMahjongLearning') {
    return (
      <div>
        <button className="back-button" onClick={handleBack}>
          ← 返回游戏选择
        </button>
        <Suspense fallback={<div className="page-loading">加载中...</div>}>
          <SichuanMahjongLearning />
        </Suspense>
      </div>
    )
  }

  if (currentPage === 'doudizhuLearning') {
    return (
      <div>
        <button className="back-button" onClick={handleBack}>
          ← 返回游戏选择
        </button>
        <Suspense fallback={<div className="page-loading">加载中...</div>}>
          <DoudizhuLearning />
        </Suspense>
      </div>
    )
  }

  return (
    <div className="game-selection-page">
      <h1>游戏选择</h1>
      <div className="overall-progress">
        <h2>整体学习进度</h2>
        <ProgressBar percentage={progress.overall} label="总体进度" />
      </div>
      <div className="game-cards-container">
        {games.map((game) => (
          <div 
            key={game.id} 
            className={`game-card ${selectedGame?.id === game.id ? 'selected' : ''}`}
            onClick={() => handleGameSelect(game)}
          >
            <div className="game-image">
              <LazyImage src={game.image} alt={game.name} />
            </div>
            <div className="game-info">
              <h2>{game.name}</h2>
              <p>{game.description}</p>
              <ProgressBar 
                percentage={progress.games[game.id]} 
                label="学习进度"
              />
            </div>
            <div className="game-action">
              <button className="select-button">选择游戏</button>
            </div>
          </div>
        ))}
      </div>
      {selectedGame && (
        <div className="selected-game-info">
          <h2>已选择: {selectedGame.name}</h2>
          <p>{selectedGame.description}</p>
        </div>
      )}
    </div>
  )
}

export default App
