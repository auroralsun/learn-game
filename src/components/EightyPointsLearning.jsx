import React, { useState, useEffect } from 'react';
import './EightyPointsLearning.css';
import LazyImage from './LazyImage';
import { markSectionComplete, markPracticeComplete } from '../utils/progressTracker';

const EightyPointsLearning = () => {
  const [activeTab, setActiveTab] = useState('intro');
  const [expandedSections, setExpandedSections] = useState({});
  const [practiceStep, setPracticeStep] = useState(0);
  const [showPractice, setShowPractice] = useState(false);
  const [selectedPractice, setSelectedPractice] = useState(null);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
    // 标记学习部分为已完成
    markSectionComplete(1, section);
  };

  const startPractice = (practiceType) => {
    setSelectedPractice(practiceType);
    setPracticeStep(0);
    setShowPractice(true);
    // 标记练习为已完成
    markPracticeComplete(1, practiceType);
  };

  const nextPracticeStep = () => {
    setPracticeStep(prev => prev + 1);
  };

  const prevPracticeStep = () => {
    setPracticeStep(prev => prev - 1);
  };

  const closePractice = () => {
    setShowPractice(false);
    setSelectedPractice(null);
    setPracticeStep(0);
  };

  useEffect(() => {
    // 添加动画效果
    const cards = document.querySelectorAll('.practice-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate-in');
      }, index * 100);
    });
  }, [practiceStep, selectedPractice]);

  const renderPracticeScene = () => {
    if (!showPractice) return null;

    const practiceScenes = {
      basicRules: [
        {
          title: '游戏目标实践',
          description: '八十分是团队游戏，需要与队友配合赢得分数',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20card%20game%20Eighty%20Points%20team%20play%20with%20players%20cooperating%2C%20vibrant%20colors%2C%20clean%20design&image_size=landscape_16_9',
          interactive: (
            <div className="interactive-element">
              <p>请选择你认为正确的游戏目标：</p>
              <div className="option-buttons">
                <button className="option-btn correct">先达到80分的团队获胜</button>
                <button className="option-btn">先出完牌的人获胜</button>
                <button className="option-btn">获得最多单张牌的人获胜</button>
              </div>
            </div>
          )
        },
        {
          title: '牌的组成实践',
          description: '八十分使用两副标准扑克牌，共108张',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Two%20decks%20of%20playing%20cards%20for%20Eighty%20Points%20game%2C%20108%20cards%20including%20jokers%2C%20neatly%20arranged&image_size=landscape_16_9',
          interactive: (
            <div className="interactive-element">
              <p>请计算八十分游戏使用的牌数：</p>
              <div className="option-buttons">
                <button className="option-btn">54张</button>
                <button className="option-btn correct">108张</button>
                <button className="option-btn">162张</button>
              </div>
            </div>
          )
        },
        {
          title: '牌的大小实践',
          description: '了解八十分中牌的大小顺序',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Playing%20cards%20ranking%20order%20for%20Eighty%20Points%20game%2C%20with%20jokers%20on%20top%2C%20visual%20hierarchy&image_size=landscape_16_9',
          interactive: (
            <div className="interactive-element">
              <p>请按从大到小的顺序排列以下牌：</p>
              <div className="drag-drop-container">
                <div className="draggable-card" draggable="true">大王</div>
                <div className="draggable-card" draggable="true">小王</div>
                <div className="draggable-card" draggable="true">A</div>
                <div className="draggable-card" draggable="true">2</div>
              </div>
            </div>
          )
        }
      ],
      cardDistribution: [
        {
          title: '发牌实践',
          description: '每位玩家发12张牌，剩余8张作为底牌',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Dealing%20cards%20in%20Eighty%20Points%20game%2C%204%20players%20receiving%2012%20cards%20each%2C%208%20cards%20as%20bottom%20cards&image_size=landscape_16_9',
          interactive: (
            <div className="interactive-element">
              <p>请选择正确的发牌数量：</p>
              <div className="option-buttons">
                <button className="option-btn">每位玩家10张，底牌10张</button>
                <button className="option-btn correct">每位玩家12张，底牌8张</button>
                <button className="option-btn">每位玩家13张，底牌6张</button>
              </div>
            </div>
          )
        },
        {
          title: '叫牌实践',
          description: '从庄家开始顺时针叫牌，选择主牌花色和级别',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Players%20bidding%20in%20Eighty%20Points%20game%2C%20selecting%20trump%20suit%20and%20rank%2C%20competitive%20atmosphere&image_size=landscape_16_9',
          interactive: (
            <div className="interactive-element">
              <p>请选择叫牌的正确顺序：</p>
              <div className="option-buttons">
                <button className="option-btn correct">从庄家开始顺时针</button>
                <button className="option-btn">从庄家开始逆时针</button>
                <button className="option-btn">随机顺序</button>
              </div>
            </div>
          )
        }
      ],
      gameplay: [
        {
          title: '出牌规则实践',
          description: '庄家先出牌，玩家必须出同花色的牌',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Players%20playing%20Eighty%20Points%20game%2C%20following%20suit%20rules%2C%20clockwise%20play%20order&image_size=landscape_16_9',
          interactive: (
            <div className="interactive-element">
              <p>当对手出红桃A时，你应该：</p>
              <div className="option-buttons">
                <button className="option-btn correct">出红桃牌</button>
                <button className="option-btn">出任意花色</button>
                <button className="option-btn">不出牌</button>
              </div>
            </div>
          )
        },
        {
          title: '计分规则实践',
          description: 'J、Q、K、10各算10分，5算5分',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Scoring%20points%20in%20Eighty%20Points%20game%2C%20showing%20point%20cards%20JQK10%20and%205%2C%20visual%20representation&image_size=landscape_16_9',
          interactive: (
            <div className="interactive-element">
              <p>请计算以下牌的总分数：J、Q、5、10</p>
              <div className="option-buttons">
                <button className="option-btn">25分</button>
                <button className="option-btn correct">35分</button>
                <button className="option-btn">40分</button>
              </div>
            </div>
          )
        }
      ],
      basicStrategy: [
        {
          title: '叫牌策略实践',
          description: '根据牌力和主牌数量决定是否叫牌',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Player%20considering%20whether%20to%20bid%20in%20Eighty%20Points%20game%2C%20analyzing%20hand%20strength%2C%20thoughtful%20expression&image_size=landscape_16_9',
          interactive: (
            <div className="interactive-element">
              <p>当你有7张主牌和3张A时，你应该：</p>
              <div className="option-buttons">
                <button className="option-btn correct">叫牌</button>
                <button className="option-btn">不叫牌</button>
                <button className="option-btn">看情况</button>
              </div>
            </div>
          )
        },
        {
          title: '团队合作实践',
          description: '与队友配合，通过出牌传递信息',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Team%20cooperation%20in%20Eighty%20Points%20game%2C%20players%20communicating%20through%20card%20play%2C%20strategic%20partnership&image_size=landscape_16_9',
          interactive: (
            <div className="interactive-element">
              <p>当队友出小牌时，这通常表示：</p>
              <div className="option-buttons">
                <button className="option-btn correct">他在该花色有大牌</button>
                <button className="option-btn">他没有该花色的牌</button>
                <button className="option-btn">他随便出的</button>
              </div>
            </div>
          )
        }
      ]
    };

    const scenes = practiceScenes[selectedPractice] || [];
    const currentScene = scenes[practiceStep];

    if (!currentScene) return null;

    return (
      <div className="practice-modal">
        <div className="practice-content">
          <button className="close-button" onClick={closePractice}>×</button>
          <h2>{currentScene.title}</h2>
          <div className="practice-image">
            <LazyImage src={currentScene.image} alt={currentScene.title} />
          </div>
          <p className="practice-description">{currentScene.description}</p>
          {currentScene.interactive}
          <div className="practice-controls">
            <button 
              className="control-btn" 
              onClick={prevPracticeStep}
              disabled={practiceStep === 0}
            >
              上一步
            </button>
            <span className="step-indicator">
              {practiceStep + 1} / {scenes.length}
            </span>
            <button 
              className="control-btn" 
              onClick={nextPracticeStep}
              disabled={practiceStep === scenes.length - 1}
            >
              下一步
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="eighty-points-learning">
      <div className="learning-header">
        <h1>八十分游戏学习指南</h1>
        <p>从入门到精通，全面掌握八十分游戏技巧</p>
      </div>

      <div className="learning-tabs">
        <button 
          className={`tab-button ${activeTab === 'intro' ? 'active' : ''}`}
          onClick={() => setActiveTab('intro')}
        >
          入门阶段
        </button>
        <button 
          className={`tab-button ${activeTab === 'advanced' ? 'active' : ''}`}
          onClick={() => setActiveTab('advanced')}
        >
          进阶阶段
        </button>
      </div>

      <div className="learning-content">
        {activeTab === 'intro' && (
          <div className="intro-section">
            <div className="section-card">
              <div 
                className="section-header"
                onClick={() => toggleSection('basicRules')}
              >
                <h2>基本规则</h2>
                <span className={`toggle-icon ${expandedSections.basicRules ? 'expanded' : ''}`}>
                  {expandedSections.basicRules ? '▼' : '▶'}
                </span>
              </div>
              {expandedSections.basicRules && (
                <div className="section-content">
                  <h3>游戏目标</h3>
                  <p>八十分是一种基于扑克牌的团队游戏，目标是通过合作赢得尽可能多的分数，先达到指定分数（通常是80分）的团队获胜。</p>
                  
                  <h3>牌的组成</h3>
                  <p>使用两副标准扑克牌，共108张牌，包括大小王。</p>
                  
                  <h3>玩家人数</h3>
                  <p>4人游戏，分为两组，面对面的两位玩家为一组。</p>
                  
                  <h3>牌的大小</h3>
                  <p>主牌：大小王 > 主牌级别的牌 > 其他花色的主牌 > 副牌</p>
                  <p>副牌：A > K > Q > J > 10 > 9 > 8 > 7 > 6 > 5 > 4 > 3 > 2</p>
                  
                  <div className="practice-section">
                    <button 
                      className="practice-button"
                      onClick={() => startPractice('basicRules')}
                    >
                      开始实践练习
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="section-card">
              <div 
                className="section-header"
                onClick={() => toggleSection('cardDistribution')}
              >
                <h2>发牌与叫牌</h2>
                <span className={`toggle-icon ${expandedSections.cardDistribution ? 'expanded' : ''}`}>
                  {expandedSections.cardDistribution ? '▼' : '▶'}
                </span>
              </div>
              {expandedSections.cardDistribution && (
                <div className="section-content">
                  <h3>发牌</h3>
                  <p>每轮发牌时，每位玩家发12张牌，剩余8张牌作为底牌。</p>
                  
                  <h3>叫牌</h3>
                  <p>从庄家开始，按顺时针方向依次叫牌，玩家可以选择叫主牌花色和级别，或者不叫。叫牌的级别从2开始，最高到A。</p>
                  
                  <h3>底牌</h3>
                  <p>叫牌结束后，获胜的玩家（庄家）可以查看底牌，并将其与自己的牌组合，然后选择8张牌作为新的底牌。</p>
                  
                  <div className="practice-section">
                    <button 
                      className="practice-button"
                      onClick={() => startPractice('cardDistribution')}
                    >
                      开始实践练习
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="section-card">
              <div 
                className="section-header"
                onClick={() => toggleSection('gameplay')}
              >
                <h2>游戏流程</h2>
                <span className={`toggle-icon ${expandedSections.gameplay ? 'expanded' : ''}`}>
                  {expandedSections.gameplay ? '▼' : '▶'}
                </span>
              </div>
              {expandedSections.gameplay && (
                <div className="section-content">
                  <h3>出牌规则</h3>
                  <p>庄家先出牌，其他玩家按顺时针方向依次出牌。玩家必须出与首牌同花色的牌，如果没有该花色的牌，可以出其他花色的牌或主牌。</p>
                  
                  <h3>赢牌规则</h3>
                  <p>每轮出牌中，最大的牌获胜，获胜者获得本轮的牌，并在下一轮先出牌。</p>
                  
                  <h3>计分规则</h3>
                  <p>J、Q、K、10各算10分，5算5分，其他牌不算分。获胜的团队将获得本轮中所有的分数。</p>
                  
                  <div className="practice-section">
                    <button 
                      className="practice-button"
                      onClick={() => startPractice('gameplay')}
                    >
                      开始实践练习
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="section-card">
              <div 
                className="section-header"
                onClick={() => toggleSection('basicStrategy')}
              >
                <h2>基本策略</h2>
                <span className={`toggle-icon ${expandedSections.basicStrategy ? 'expanded' : ''}`}>
                  {expandedSections.basicStrategy ? '▼' : '▶'}
                </span>
              </div>
              {expandedSections.basicStrategy && (
                <div className="section-content">
                  <h3>叫牌策略</h3>
                  <p>根据自己手中的牌力和主牌数量决定是否叫牌，一般来说，有较多主牌和大牌时适合叫牌。</p>
                  
                  <h3>出牌策略</h3>
                  <p>尽量先出小牌，保留大牌在关键时刻使用；注意观察其他玩家的出牌，了解他们的牌型。</p>
                  
                  <h3>团队合作</h3>
                  <p>与队友配合，通过出牌传递信息，例如出一张小牌表示自己在该花色有大牌。</p>
                  
                  <div className="practice-section">
                    <button 
                      className="practice-button"
                      onClick={() => startPractice('basicStrategy')}
                    >
                      开始实践练习
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="advanced-section">
            <div className="section-card">
              <div 
                className="section-header"
                onClick={() => toggleSection('advancedStrategy')}
              >
                <h2>高级策略</h2>
                <span className={`toggle-icon ${expandedSections.advancedStrategy ? 'expanded' : ''}`}>
                  {expandedSections.advancedStrategy ? '▼' : '▶'}
                </span>
              </div>
              {expandedSections.advancedStrategy && (
                <div className="section-content">
                  <h3>记牌技巧</h3>
                  <p>记住已经出过的牌，特别是大牌和分数牌，以便判断剩余牌的分布。</p>
                  
                  <h3>信号传递</h3>
                  <p>通过特定的出牌顺序和牌型向队友传递信息，例如出A表示有K，出小牌表示无大牌等。</p>
                  
                  <h3>控制牌局</h3>
                  <p>通过出牌控制牌局的节奏，迫使对手出不利于他们的牌。</p>
                </div>
              )}
            </div>

            <div className="section-card">
              <div 
                className="section-header"
                onClick={() => toggleSection('defense')}
              >
                <h2>防守技巧</h2>
                <span className={`toggle-icon ${expandedSections.defense ? 'expanded' : ''}`}>
                  {expandedSections.defense ? '▼' : '▶'}
                </span>
              </div>
              {expandedSections.defense && (
                <div className="section-content">
                  <h3>阻挡对手</h3>
                  <p>当对手要得分时，尽量用大牌阻挡，不让他们轻易获得分数。</p>
                  
                  <h3>分散对手注意力</h3>
                  <p>通过出不同花色的牌，分散对手的注意力，打乱他们的计划。</p>
                  
                  <h3>保存实力</h3>
                  <p>在不必要的时候不要浪费大牌，保存实力用于关键时刻。</p>
                </div>
              )}
            </div>

            <div className="section-card">
              <div 
                className="section-header"
                onClick={() => toggleSection('teamwork')}
              >
                <h2>团队配合</h2>
                <span className={`toggle-icon ${expandedSections.teamwork ? 'expanded' : ''}`}>
                  {expandedSections.teamwork ? '▼' : '▶'}
                </span>
              </div>
              {expandedSections.teamwork && (
                <div className="section-content">
                  <h3>默契配合</h3>
                  <p>与队友建立默契，通过出牌传递准确的信息，例如花色选择、牌型大小等。</p>
                  
                  <h3>分工合作</h3>
                  <p>根据队友的牌力和风格，合理分工，例如一人负责进攻，一人负责防守。</p>
                  
                  <h3>调整策略</h3>
                  <p>根据牌局的发展和对手的表现，及时调整团队策略。</p>
                </div>
              )}
            </div>

            <div className="section-card">
              <div 
                className="section-header"
                onClick={() => toggleSection('advancedTechniques')}
              >
                <h2>高级技巧</h2>
                <span className={`toggle-icon ${expandedSections.advancedTechniques ? 'expanded' : ''}`}>
                  {expandedSections.advancedTechniques ? '▼' : '▶'}
                </span>
              </div>
              {expandedSections.advancedTechniques && (
                <div className="section-content">
                  <h3>跳级叫牌</h3>
                  <p>当手中牌力很强时，可以跳级叫牌，直接叫到较高的级别，给对手压力。</p>
                  
                  <h3>诈牌技巧</h3>
                  <p>通过出牌方式误导对手，让他们误以为你有或没有某些牌。</p>
                  
                  <h3>算牌能力</h3>
                  <p>通过计算剩余牌的数量和分布，做出最优的决策。</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {renderPracticeScene()}
    </div>
  );
};

export default EightyPointsLearning;