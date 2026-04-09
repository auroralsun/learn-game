import React, { useState, useEffect } from 'react';
import './SichuanMahjongLearning.css';
import LazyImage from './LazyImage';
import { markSectionComplete, markPracticeComplete } from '../utils/progressTracker';

const SichuanMahjongLearning = () => {
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
    markSectionComplete(2, section);
  };

  const startPractice = (practiceType) => {
    setSelectedPractice(practiceType);
    setPracticeStep(0);
    setShowPractice(true);
    // 标记练习为已完成
    markPracticeComplete(2, practiceType);
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
          description: '川麻的目标是通过组合手中的牌形成特定牌型，先胡牌者获胜',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Sichuan%20mahjong%20game%20with%20players%20competing%2C%20traditional%20Chinese%20style%2C%20vibrant%20colors&image_size=landscape_16_9',
          interactive: (
            <div className="interactive-element">
              <p>川麻最常见的玩法是：</p>
              <div className="option-buttons">
                <button className="option-btn">推倒胡</button>
                <button className="option-btn correct">血战到底</button>
                <button className="option-btn">广东麻将</button>
              </div>
            </div>
          )
        },
        {
          title: '牌的组成实践',
          description: '川麻使用标准麻将牌，共108张',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Mahjong%20tiles%20for%20Sichuan%20mahjong%2C%20108%20tiles%20including%20dots%2C%20bamboos%2C%20characters%2C%20neatly%20arranged&image_size=landscape_16_9',
          interactive: (
            <div className="interactive-element">
              <p>川麻使用的牌包括哪些花色：</p>
              <div className="option-buttons">
                <button className="option-btn correct">条、饼、万</button>
                <button className="option-btn">条、饼、万、风、箭牌</button>
                <button className="option-btn">条、饼、万、花牌</button>
              </div>
            </div>
          )
        }
      ],
      cardDistribution: [
        {
          title: '发牌实践',
          description: '庄家拿14张牌，其他玩家拿13张牌',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Mahjong%20players%20drawing%20tiles%2C%20dealer%20getting%2014%20tiles%2C%20others%2013%20tiles%2C%20traditional%20setup&image_size=landscape_16_9',
          interactive: (
            <div className="interactive-element">
              <p>庄家应该拿多少张牌：</p>
              <div className="option-buttons">
                <button className="option-btn">13张</button>
                <button className="option-btn correct">14张</button>
                <button className="option-btn">15张</button>
              </div>
            </div>
          )
        },
        {
          title: '开牌实践',
          description: '通过掷骰子决定从哪一方开始拿牌',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Mahjong%20players%20rolling%20dice%20to%20determine%20starting%20position%2C%20traditional%20ritual&image_size=landscape_16_9',
          interactive: (
            <div className="interactive-element">
              <p>开牌后，拿牌的顺序是：</p>
              <div className="option-buttons">
                <button className="option-btn correct">逆时针</button>
                <button className="option-btn">顺时针</button>
                <button className="option-btn">随机</button>
              </div>
            </div>
          )
        }
      ],
      gameplay: [
        {
          title: '吃碰杠实践',
          description: '了解川麻中的吃碰杠规则',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Mahjong%20player%20declaring%20chi%2C%20peng%2C%20or%20gang%2C%20traditional%20gestures&image_size=landscape_16_9',
          interactive: (
            <div className="interactive-element">
              <p>当你有两张相同的牌，其他玩家出了第三张相同的牌，你可以：</p>
              <div className="option-buttons">
                <button className="option-btn">吃</button>
                <button className="option-btn correct">碰</button>
                <button className="option-btn">杠</button>
              </div>
            </div>
          )
        },
        {
          title: '胡牌规则实践',
          description: '川麻的基本胡牌牌型是四组刻子或顺子加一对将牌',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Mahjong%20winning%20hand%20with%20four%20sets%20and%20a%20pair%2C%20traditional%20Chinese%20style&image_size=landscape_16_9',
          interactive: (
            <div className="interactive-element">
              <p>川麻的基本胡牌牌型需要：</p>
              <div className="option-buttons">
                <button className="option-btn">三组刻子或顺子加一对将牌</button>
                <button className="option-btn correct">四组刻子或顺子加一对将牌</button>
                <button className="option-btn">五组刻子或顺子</button>
              </div>
            </div>
          )
        }
      ],
      scoring: [
        {
          title: '计分规则实践',
          description: '了解川麻的番数计算',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Mahjong%20scoring%20system%20with%20fan%20counting%2C%20traditional%20Chinese%20style&image_size=landscape_16_9',
          interactive: (
            <div className="interactive-element">
              <p>平胡的番数是：</p>
              <div className="option-buttons">
                <button className="option-btn correct">1番</button>
                <button className="option-btn">2番</button>
                <button className="option-btn">4番</button>
              </div>
            </div>
          )
        },
        {
          title: '常见番型实践',
          description: '了解川麻中常见的番型',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Mahjong%20special%20patterns%20with%20different%20fan%20values%2C%20colorful%20tiles&image_size=landscape_16_9',
          interactive: (
            <div className="interactive-element">
              <p>清一色的番数是：</p>
              <div className="option-buttons">
                <button className="option-btn">2番</button>
                <button className="option-btn correct">4番</button>
                <button className="option-btn">8番</button>
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
    <div className="sichuan-mahjong-learning">
      <div className="learning-header">
        <h1>川麻游戏学习指南</h1>
        <p>从入门到精通，全面掌握川麻游戏技巧</p>
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
                  <p>川麻是一种基于麻将牌的游戏，目标是通过组合手中的牌形成特定的牌型，先胡牌者获胜。川麻最常见的玩法是血战到底，即一家胡牌后，其余玩家继续游戏，直到只剩一家未胡牌。</p>
                  
                  <h3>牌的组成</h3>
                  <p>使用标准麻将牌，共108张，包括条（索）、饼（筒）、万三种花色，每种花色有9个数字，每个数字有4张牌。</p>
                  
                  <h3>玩家人数</h3>
                  <p>4人游戏，各自为战，没有队友。</p>
                  
                  <h3>牌的大小</h3>
                  <p>在川麻中，牌的大小主要体现在组合牌型时，单张牌本身没有大小之分，只有花色和数字的区别。</p>
                  
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
                <h2>洗牌与发牌</h2>
                <span className={`toggle-icon ${expandedSections.cardDistribution ? 'expanded' : ''}`}>
                  {expandedSections.cardDistribution ? '▼' : '▶'}
                </span>
              </div>
              {expandedSections.cardDistribution && (
                <div className="section-content">
                  <h3>洗牌</h3>
                  <p>玩家一起将牌打乱，然后砌成四方形的牌墙。</p>
                  
                  <h3>开牌</h3>
                  <p>通过掷骰子决定从哪一方开始拿牌，庄家先拿牌，然后按逆时针方向依次拿牌。</p>
                  
                  <h3>拿牌</h3>
                  <p>每位玩家先拿13张牌，庄家多拿一张，共14张牌。</p>
                  
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
                  <h3>摸牌与出牌</h3>
                  <p>庄家先出牌，然后按逆时针方向，每位玩家依次摸一张牌，再出一张牌。</p>
                  
                  <h3>吃碰杠</h3>
                  <p>吃：当其他玩家出的牌可以和自己手中的两张牌组成顺子时，可以吃牌。</p>
                  <p>碰：当其他玩家出的牌和自己手中的两张相同牌组成刻子时，可以碰牌。</p>
                  <p>杠：当自己手中有四张相同的牌，或者摸到第四张相同的牌时，可以杠牌。</p>
                  
                  <h3>胡牌规则</h3>
                  <p>当手中的牌符合特定牌型时，可以胡牌。川麻的基本胡牌牌型是四组刻子或顺子加一对将牌。</p>
                  
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
                onClick={() => toggleSection('scoring')}
              >
                <h2>计分规则</h2>
                <span className={`toggle-icon ${expandedSections.scoring ? 'expanded' : ''}`}>
                  {expandedSections.scoring ? '▼' : '▶'}
                </span>
              </div>
              {expandedSections.scoring && (
                <div className="section-content">
                  <h3>基本分值</h3>
                  <p>川麻的计分通常以番为单位，不同的牌型有不同的番数。</p>
                  
                  <h3>常见番型</h3>
                  <p>平胡：基础番型，1番。</p>
                  <p>对子胡：由四对刻子加一对将牌组成，2番。</p>
                  <p>清一色：由同一种花色的牌组成，4番。</p>
                  <p>小七对：由七对牌组成，4番。</p>
                  <p>龙七对：由七对牌组成，其中有两对是相同的，8番。</p>
                  
                  <h3>结算方式</h3>
                  <p>在血战到底玩法中，胡牌者按番数从其他未胡牌玩家处获得相应的分数。</p>
                  
                  <div className="practice-section">
                    <button 
                      className="practice-button"
                      onClick={() => startPractice('scoring')}
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
                  <h3>牌型规划</h3>
                  <p>根据初始手牌，制定合理的牌型规划，确定要做的牌型。</p>
                  
                  <h3>舍牌技巧</h3>
                  <p>根据牌局的发展，合理舍牌，避免给对手提供有用的牌。</p>
                  
                  <h3>听牌策略</h3>
                  <p>选择听牌的张数和类型，提高胡牌的概率。</p>
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
                  <h3>观察对手</h3>
                  <p>观察对手的出牌习惯和表情，判断他们的牌型和需求。</p>
                  
                  <h3>控制牌局</h3>
                  <p>通过出牌控制牌局的节奏，限制对手的发展。</p>
                  
                  <h3>避免点炮</h3>
                  <p>分析对手可能的听牌，避免出他们需要的牌。</p>
                </div>
              )}
            </div>

            <div className="section-card">
              <div 
                className="section-header"
                onClick={() => toggleSection('specialPatterns')}
              >
                <h2>特殊牌型</h2>
                <span className={`toggle-icon ${expandedSections.specialPatterns ? 'expanded' : ''}`}>
                  {expandedSections.specialPatterns ? '▼' : '▶'}
                </span>
              </div>
              {expandedSections.specialPatterns && (
                <div className="section-content">
                  <h3>大对子</h3>
                  <p>由五对刻子组成，4番。</p>
                  
                  <h3>清对</h3>
                  <p>由同一种花色的刻子组成，8番。</p>
                  
                  <h3>将对</h3>
                  <p>由2、5、8的刻子组成，8番。</p>
                  
                  <h3>天胡</h3>
                  <p>庄家起手14张牌直接胡牌，16番。</p>
                  
                  <h3>地胡</h3>
                  <p>非庄家第一手牌就胡牌，16番。</p>
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
                  <h3>算牌能力</h3>
                  <p>通过记住已经出过的牌，计算剩余牌的分布，做出最优决策。</p>
                  
                  <h3>心理战</h3>
                  <p>通过出牌方式和表情，误导对手，掩盖自己的真实牌型。</p>
                  
                  <h3>灵活应变</h3>
                  <p>根据牌局的变化，及时调整策略，适应不同的情况。</p>
                  
                  <h3>风险控制</h3>
                  <p>评估胡牌的概率和风险，做出明智的决策，避免不必要的损失。</p>
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

export default SichuanMahjongLearning;