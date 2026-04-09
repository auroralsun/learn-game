import React, { useState, useEffect } from 'react';
import './DoudizhuLearning.css';
import LazyImage from './LazyImage';
import { markSectionComplete, markPracticeComplete } from '../utils/progressTracker';

const DoudizhuLearning = () => {
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
    markSectionComplete(3, section);
  };

  const startPractice = (practiceType) => {
    setSelectedPractice(practiceType);
    setPracticeStep(0);
    setShowPractice(true);
    // 标记练习为已完成
    markPracticeComplete(3, practiceType);
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
          description: '斗地主的目标是先将自己手中的牌全部出完',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20card%20game%20Landlord%20with%20players%20competing%2C%20modern%20design%2C%20vibrant%20colors&image_size=landscape_16_9',
          interactive: (
            <div className="interactive-element">
              <p>斗地主游戏的玩家人数是：</p>
              <div className="option-buttons">
                <button className="option-btn">2人</button>
                <button className="option-btn correct">3人</button>
                <button className="option-btn">4人</button>
              </div>
            </div>
          )
        },
        {
          title: '牌的大小实践',
          description: '了解斗地主中牌的大小顺序',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Playing%20cards%20ranking%20order%20for%20Landlord%20game%2C%20with%20jokers%20and%202s%20on%20top%2C%20visual%20hierarchy&image_size=landscape_16_9',
          interactive: (
            <div className="interactive-element">
              <p>请按从大到小的顺序排列以下牌：</p>
              <div className="drag-drop-container">
                <div className="draggable-card" draggable="true">大王</div>
                <div className="draggable-card" draggable="true">2</div>
                <div className="draggable-card" draggable="true">A</div>
                <div className="draggable-card" draggable="true">K</div>
              </div>
            </div>
          )
        }
      ],
      cardDistribution: [
        {
          title: '发牌实践',
          description: '每位玩家发17张牌，剩余3张作为底牌',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Dealing%20cards%20in%20Landlord%20game%2C%203%20players%20receiving%2017%20cards%20each%2C%203%20cards%20as%20bottom%20cards&image_size=landscape_16_9',
          interactive: (
            <div className="interactive-element">
              <p>地主最终会有多少张牌：</p>
              <div className="option-buttons">
                <button className="option-btn">17张</button>
                <button className="option-btn correct">20张</button>
                <button className="option-btn">23张</button>
              </div>
            </div>
          )
        },
        {
          title: '叫牌实践',
          description: '从随机指定的玩家开始顺时针叫牌',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Players%20bidding%20in%20Landlord%20game%2C%20selecting%20points%201-3%2C%20competitive%20atmosphere&image_size=landscape_16_9',
          interactive: (
            <div className="interactive-element">
              <p>叫牌的最高分数是：</p>
              <div className="option-buttons">
                <button className="option-btn">1分</button>
                <button className="option-btn">2分</button>
                <button className="option-btn correct">3分</button>
              </div>
            </div>
          )
        }
      ],
      gameplay: [
        {
          title: '出牌规则实践',
          description: '地主先出牌，玩家必须出同类型且更大的牌',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Players%20playing%20Landlord%20game%2C%20following%20card%20type%20rules%2C%20clockwise%20play%20order&image_size=landscape_16_9',
          interactive: (
            <div className="interactive-element">
              <p>当地主出对子时，你应该：</p>
              <div className="option-buttons">
                <button className="option-btn correct">出更大的对子</button>
                <button className="option-btn">出单牌</button>
                <button className="option-btn">出顺子</button>
              </div>
            </div>
          )
        },
        {
          title: '赢牌规则实践',
          description: '先出完牌的玩家或团队获胜',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Landlord%20game%20winner%20celebrating%2C%20player%20with%20empty%20hand%2C%20victorious%20moment&image_size=landscape_16_9',
          interactive: (
            <div className="interactive-element">
              <p>如果农民先出完牌，谁获胜：</p>
              <div className="option-buttons">
                <button className="option-btn">地主</button>
                <button className="option-btn correct">农民方</button>
                <button className="option-btn">平局</button>
              </div>
            </div>
          )
        }
      ],
      basicStrategy: [
        {
          title: '叫牌策略实践',
          description: '根据牌力决定是否叫牌',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Player%20considering%20whether%20to%20bid%20in%20Landlord%20game%2C%20analyzing%20hand%20strength%2C%20thoughtful%20expression&image_size=landscape_16_9',
          interactive: (
            <div className="interactive-element">
              <p>当你有2个炸弹和多个大牌时，你应该：</p>
              <div className="option-buttons">
                <button className="option-btn correct">叫3分</button>
                <button className="option-btn">叫2分</button>
                <button className="option-btn">不叫</button>
              </div>
            </div>
          )
        },
        {
          title: '农民合作实践',
          description: '农民之间要相互配合对抗地主',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Two%20peasants%20cooperating%20in%20Landlord%20game%2C%20strategic%20partnership%2C%20teamwork&image_size=landscape_16_9',
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
    <div className="doudizhu-learning">
      <div className="learning-header">
        <h1>斗地主游戏学习指南</h1>
        <p>从入门到精通，全面掌握斗地主游戏技巧</p>
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
                  <p>斗地主是一种基于扑克牌的三人游戏，目标是通过出牌策略，先将自己手中的牌全部出完。</p>
                  
                  <h3>牌的组成</h3>
                  <p>使用一副标准扑克牌，共54张牌，包括大小王。</p>
                  
                  <h3>玩家人数</h3>
                  <p>3人游戏，其中1人为地主，另外2人为农民，农民为一方共同对抗地主。</p>
                  
                  <h3>牌的大小</h3>
                  <p>大小王 > 2 > A > K > Q > J > 10 > 9 > 8 > 7 > 6 > 5 > 4 > 3</p>
                  <p>牌型大小：火箭（双王）> 炸弹 > 单牌 > 对牌 > 三张牌 > 三带一 > 三带二 > 顺子 > 连队 > 飞机 > 四带二 > 飞机带翅膀</p>
                  
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
                  <p>每轮发牌时，每位玩家发17张牌，剩余3张牌作为底牌。</p>
                  
                  <h3>叫牌</h3>
                  <p>从随机指定的玩家开始，按顺时针方向依次叫牌，玩家可以选择叫1分、2分、3分或不叫。叫分最高的玩家成为地主。</p>
                  
                  <h3>底牌</h3>
                  <p>叫牌结束后，地主获得剩余的3张底牌，与自己的17张牌组成20张牌。</p>
                  
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
                  <p>地主先出牌，然后按顺时针方向依次出牌。玩家必须出与首牌同类型且大小更大的牌，或者选择不出牌。</p>
                  
                  <h3>赢牌规则</h3>
                  <p>先将自己手中的牌全部出完的玩家或团队获胜。如果地主先出完牌，则地主获胜；如果任一农民先出完牌，则农民方获胜。</p>
                  
                  <h3>计分规则</h3>
                  <p>地主获胜得分为叫分数 × 2，农民获胜得分为叫分数。如果地主在出牌过程中被农民方提前压制，可能会导致分数翻倍。</p>
                  
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
                  <p>根据自己手中的牌力决定是否叫牌，一般来说，有较多大牌、炸弹或牌型整齐时适合叫牌。</p>
                  
                  <h3>出牌策略</h3>
                  <p>地主：尽量先出小牌，试探农民的牌力；农民：尽量配合队友，压制地主的出牌。</p>
                  
                  <h3>农民合作</h3>
                  <p>农民之间要相互配合，通过出牌传递信息，例如出一张小牌表示自己在该花色有大牌。</p>
                  
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
                  <p>记住已经出过的牌，特别是大牌、炸弹和关键牌，以便判断剩余牌的分布。</p>
                  
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
                onClick={() => toggleSection('landlordSkills')}
              >
                <h2>地主技巧</h2>
                <span className={`toggle-icon ${expandedSections.landlordSkills ? 'expanded' : ''}`}>
                  {expandedSections.landlordSkills ? '▼' : '▶'}
                </span>
              </div>
              {expandedSections.landlordSkills && (
                <div className="section-content">
                  <h3>如何打好地主</h3>
                  <p>合理安排出牌顺序，先出小牌试探农民的牌力，再根据情况调整策略；利用底牌优势，组合出更强大的牌型。</p>
                  
                  <h3>应对农民的策略</h3>
                  <p>注意观察农民的出牌，判断他们的牌型和牌力；尽量拆散农民的牌型，防止他们配合。</p>
                  
                  <h3>地主的心理战</h3>
                  <p>通过出牌节奏和牌型选择，给农民造成压力，干扰他们的判断。</p>
                </div>
              )}
            </div>

            <div className="section-card">
              <div 
                className="section-header"
                onClick={() => toggleSection('peasantSkills')}
              >
                <h2>农民技巧</h2>
                <span className={`toggle-icon ${expandedSections.peasantSkills ? 'expanded' : ''}`}>
                  {expandedSections.peasantSkills ? '▼' : '▶'}
                </span>
              </div>
              {expandedSections.peasantSkills && (
                <div className="section-content">
                  <h3>如何配合对抗地主</h3>
                  <p>农民之间要相互配合，通过出牌传递信息，例如出一张小牌表示自己在该花色有大牌；当队友出牌时，尽量支持。</p>
                  
                  <h3>防守技巧</h3>
                  <p>当地主出牌时，尽量用大牌压制，不让地主轻易出牌；注意保存实力，在关键时刻使用。</p>
                  
                  <h3>农民的进攻策略</h3>
                  <p>当有机会时，农民要主动进攻，打乱地主的出牌节奏；利用地主的失误，快速出完自己的牌。</p>
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
                  <h3>拆牌技巧</h3>
                  <p>根据牌局情况，合理拆牌，例如将对子拆成单牌，或将三张拆成对子和单牌，以适应牌局的需要。</p>
                  
                  <h3>骗牌技巧</h3>
                  <p>通过出牌方式误导对手，让他们误以为你有或没有某些牌，从而做出错误的判断。</p>
                  
                  <h3>算牌能力</h3>
                  <p>通过计算剩余牌的数量和分布，做出最优的决策，例如判断对手是否有炸弹，或是否能出完牌。</p>
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

export default DoudizhuLearning;