import { useState, useEffect, lazy, Suspense } from 'react'
import './App.css'
import ProgressBar from './components/ProgressBar'
import LazyImage from './components/LazyImage'
import { getGameCompletionPercentage, getOverallProgress } from './utils/progressTracker'

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

  const games = [
    {
      id: 1,
      name: '八十分',
      description: '经典的纸牌游戏，需要团队合作',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20card%20game%20Eighty%20Points%20with%20playing%20cards%20on%20table%2C%20vibrant%20colors%2C%20clean%20design&image_size=square'
    },
    {
      id: 2,
      name: '麻将-川麻',
      description: '四川麻将，血战到底规则',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Sichuan%20mahjong%20game%20with%20tiles%20on%20table%2C%20traditional%20Chinese%20style%2C%20vibrant%20colors&image_size=square'
    },
    {
      id: 3,
      name: '斗地主',
      description: '三人纸牌游戏，斗智斗勇',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20card%20game%20Landlord%20with%20playing%20cards%2C%20competitive%20atmosphere%2C%20modern%20design&image_size=square'
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
        <EightyPointsLearning />
      </div>
    )
  }

  if (currentPage === 'sichuanMahjongLearning') {
    return (
      <div>
        <button className="back-button" onClick={handleBack}>
          ← 返回游戏选择
        </button>
        <SichuanMahjongLearning />
      </div>
    )
  }

  if (currentPage === 'doudizhuLearning') {
    return (
      <div>
        <button className="back-button" onClick={handleBack}>
          ← 返回游戏选择
        </button>
        <DoudizhuLearning />
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