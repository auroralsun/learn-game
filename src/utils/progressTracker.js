// 学习进度跟踪服务

// 存储键名
const STORAGE_KEY = 'game_learning_progress';

// 初始化进度数据
const initProgressData = () => {
  const initialData = {
    games: {
      eightyPoints: {
        completedSections: [],
        completedPractices: [],
        lastAccessed: null
      },
      sichuanMahjong: {
        completedSections: [],
        completedPractices: [],
        lastAccessed: null
      },
      doudizhu: {
        completedSections: [],
        completedPractices: [],
        lastAccessed: null
      }
    }
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  return initialData;
};

// 获取进度数据
export const getProgressData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : initProgressData();
};

// 保存进度数据
const saveProgressData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// 标记学习部分为已完成
export const markSectionComplete = (gameId, sectionId) => {
  const data = getProgressData();
  const gameKey = getGameKey(gameId);
  
  if (gameKey && !data.games[gameKey].completedSections.includes(sectionId)) {
    data.games[gameKey].completedSections.push(sectionId);
    data.games[gameKey].lastAccessed = new Date().toISOString();
    saveProgressData(data);
  }
};

// 标记练习为已完成
export const markPracticeComplete = (gameId, practiceId) => {
  const data = getProgressData();
  const gameKey = getGameKey(gameId);
  
  if (gameKey && !data.games[gameKey].completedPractices.includes(practiceId)) {
    data.games[gameKey].completedPractices.push(practiceId);
    data.games[gameKey].lastAccessed = new Date().toISOString();
    saveProgressData(data);
  }
};

// 获取游戏的进度
export const getGameProgress = (gameId) => {
  const data = getProgressData();
  const gameKey = getGameKey(gameId);
  
  if (!gameKey) return null;
  
  const gameData = data.games[gameKey];
  return gameData;
};

// 获取游戏的完成百分比
export const getGameCompletionPercentage = (gameId) => {
  const progress = getGameProgress(gameId);
  if (!progress) return 0;
  
  // 根据游戏类型定义总部分数
  const totalSections = {
    1: 8, // 八十分
    2: 8, // 麻将
    3: 8  // 斗地主
  }[gameId] || 8;
  
  const completedCount = progress.completedSections.length + progress.completedPractices.length;
  return Math.round((completedCount / (totalSections * 2)) * 100);
};

// 获取所有游戏的总体进度
export const getOverallProgress = () => {
  const data = getProgressData();
  const games = Object.values(data.games);
  
  let totalCompleted = 0;
  let totalSections = 0;
  
  games.forEach(game => {
    totalCompleted += game.completedSections.length + game.completedPractices.length;
    totalSections += 16; // 每个游戏8个部分，每个部分有内容和练习
  });
  
  return Math.round((totalCompleted / totalSections) * 100);
};

// 辅助函数：获取游戏对应的键名
const getGameKey = (gameId) => {
  const gameKeyMap = {
    1: 'eightyPoints',
    2: 'sichuanMahjong',
    3: 'doudizhu'
  };
  return gameKeyMap[gameId];
};

// 重置所有进度
export const resetAllProgress = () => {
  initProgressData();
};
