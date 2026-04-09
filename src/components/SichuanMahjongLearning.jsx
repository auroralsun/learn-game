import React, { useState, useEffect } from 'react';
import './SichuanMahjongLearning.css';
import LazyImage from './LazyImage';
import PracticeQuiz from './PracticeQuiz';
import { markSectionComplete, markPracticeComplete } from '../utils/progressTracker';
import { practiceImages } from '../utils/images';

const practiceScenes = {
  basicRules: [
    {
      title: '游戏目标实践',
      description: '川麻常见玩法是血战到底，即有人胡牌后其余玩家继续，直到只剩一家未胡。',
      image: practiceImages.sichuanMahjongGoal,
      prompt: '川麻最常见的玩法是：',
      options: [
        { label: '推倒胡' },
        { label: '血战到底', correct: true },
        { label: '二人麻将' }
      ]
    },
    {
      title: '牌的组成实践',
      description: '川麻通常使用108张牌，只保留条、饼、万三门数牌。',
      image: practiceImages.sichuanMahjongTiles,
      prompt: '川麻常用的牌一般包含哪些花色？',
      options: [
        { label: '条、饼、万', correct: true },
        { label: '条、饼、万、风、箭牌' },
        { label: '条、饼、万、花牌' }
      ]
    }
  ],
  cardDistribution: [
    {
      title: '发牌实践',
      description: '庄家开局14张，闲家13张，这是麻将摸打轮转的基础。',
      image: practiceImages.sichuanMahjongDeal,
      prompt: '庄家开局应拿多少张牌？',
      options: [
        { label: '13张' },
        { label: '14张', correct: true },
        { label: '15张' }
      ]
    },
    {
      title: '开牌实践',
      description: '通过掷骰确定开牌位置后，庄家先拿牌，随后依次轮转。',
      image: practiceImages.sichuanMahjongDice,
      prompt: '庄家打出第一张牌后，常见轮转方向是：',
      options: [
        { label: '逆时针', correct: true },
        { label: '顺时针' },
        { label: '随机切换' }
      ]
    }
  ],
  gameplay: [
    {
      title: '碰牌实践',
      description: '他家打出你所需的第三张相同牌时，你可以碰。',
      image: practiceImages.sichuanMahjongMeld,
      prompt: '当你有两张相同的牌，他家打出第三张相同牌时，你可以：',
      options: [
        { label: '吃' },
        { label: '碰', correct: true },
        { label: '听' }
      ]
    },
    {
      title: '胡牌结构实践',
      description: '基础和牌结构通常是四组面子加一对将。',
      image: practiceImages.sichuanMahjongWin,
      prompt: '川麻基础和牌结构通常需要：',
      options: [
        { label: '三组面子加一对将' },
        { label: '四组面子加一对将', correct: true },
        { label: '五组面子即可' }
      ]
    }
  ],
  scoring: [
    {
      title: '番型起步实践',
      description: '很多血战到底口径里，平胡通常作为基础番型起步。',
      image: practiceImages.sichuanMahjongScoring,
      prompt: '平胡通常属于：',
      options: [
        { label: '基础起步番型', correct: true },
        { label: '只能自摸的特殊番型' },
        { label: '只有庄家能做的番型' }
      ]
    },
    {
      title: '清一色识别实践',
      description: '清一色强调整副和牌都来自同一门花色。',
      image: practiceImages.sichuanMahjongPatterns,
      prompt: '以下哪种描述更符合清一色？',
      options: [
        { label: '整副牌都来自同一门花色', correct: true },
        { label: '全部由2、5、8组成' },
        { label: '恰好有七个对子' }
      ]
    }
  ],
  advancedStrategy: [
    {
      title: '牌型规划练习',
      description: '起手若同一门连张很多，就应尽早决定是走平胡、清一色还是对对胡路线。',
      image: practiceImages.sichuanMahjongScoring,
      prompt: '起手同一门花色特别集中时，更合理的思路是：',
      options: [
        { label: '尽早规划是否朝清一色方向发展', correct: true },
        { label: '完全不看结构，随便拆打' },
        { label: '先把同花色牌全部打掉' }
      ]
    }
  ],
  defense: [
    {
      title: '防点炮练习',
      description: '对手连续打同门并突然收紧出牌节奏时，往往意味着已经进入听牌甚至高危听牌。',
      image: practiceImages.sichuanMahjongMeld,
      prompt: '当你判断下家已在做清一色听牌时，更稳的做法是：',
      options: [
        { label: '优先打生张风险更低的牌，避免继续喂同门', correct: true },
        { label: '继续顺手打他可能正缺的同门牌' },
        { label: '无视风险只按自己想法出牌' }
      ]
    }
  ],
  specialPatterns: [
    {
      title: '对对胡识别练习',
      description: '对对胡强调四组刻子/杠子加一对将，而不是顺子结构。',
      image: practiceImages.sichuanMahjongPatterns,
      prompt: '下列哪种说法更符合对对胡？',
      options: [
        { label: '以刻子结构为主，四组刻子加一对将', correct: true },
        { label: '必须由七个对子组成' },
        { label: '必须全部是一种花色' }
      ]
    }
  ],
  advancedTechniques: [
    {
      title: '听牌选择练习',
      description: '有时宽听比追求更高番更重要，尤其是在场上危险张很多时。',
      image: practiceImages.sichuanMahjongWin,
      prompt: '当高番路线只剩单吊一张，而改牌后能形成多面听时，更稳的选择通常是：',
      options: [
        { label: '优先考虑更宽的听牌，提高和牌率', correct: true },
        { label: '无论如何都不改牌' },
        { label: '先把安全牌全部打光再说' }
      ]
    }
  ]
};

const SichuanMahjongLearning = () => {
  const [activeTab, setActiveTab] = useState('intro');
  const [expandedSections, setExpandedSections] = useState({});
  const [practiceStep, setPracticeStep] = useState(0);
  const [showPractice, setShowPractice] = useState(false);
  const [selectedPractice, setSelectedPractice] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [revealAnswer, setRevealAnswer] = useState(false);

  const resetInteractionState = () => {
    setSelectedOption(null);
    setRevealAnswer(false);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
    markSectionComplete(2, section);
  };

  const startPractice = (practiceType) => {
    setSelectedPractice(practiceType);
    setPracticeStep(0);
    setShowPractice(true);
    resetInteractionState();
    markPracticeComplete(2, practiceType);
  };

  const nextPracticeStep = () => {
    const scenes = practiceScenes[selectedPractice] || [];
    const currentScene = scenes[practiceStep];

    if (currentScene?.options && !revealAnswer) {
      if (selectedOption === null) {
        return;
      }

      setRevealAnswer(true);
      return;
    }

    if (practiceStep === scenes.length - 1) {
      closePractice();
      return;
    }

    setPracticeStep(practiceStep + 1);
    resetInteractionState();
  };

  const prevPracticeStep = () => {
    setPracticeStep(practiceStep - 1);
    resetInteractionState();
  };

  const closePractice = () => {
    setShowPractice(false);
    setSelectedPractice(null);
    setPracticeStep(0);
    resetInteractionState();
  };

  useEffect(() => {
    const cards = document.querySelectorAll('.practice-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate-in');
      }, index * 100);
    });
  }, [practiceStep, selectedPractice]);

  const renderPracticeScene = () => {
    if (!showPractice) return null;

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
          <PracticeQuiz
            prompt={currentScene.prompt}
            options={currentScene.options}
            selectedOption={selectedOption}
            revealAnswer={revealAnswer}
            onSelect={setSelectedOption}
            feedbackTitle={
              revealAnswer
                ? selectedOption === currentScene.options.findIndex((option) => option.correct)
                  ? '回答正确'
                  : '这题需要修正'
                : ''
            }
            feedbackBody={revealAnswer ? `知识点：${currentScene.knowledgePoint || currentScene.description}` : ''}
          />
          <div className="practice-controls">
            <button className="control-btn" onClick={prevPracticeStep} disabled={practiceStep === 0}>
              上一步
            </button>
            <span className="step-indicator">
              {practiceStep + 1} / {scenes.length}
            </span>
            <button
              className="control-btn"
              onClick={nextPracticeStep}
              disabled={selectedOption === null && !revealAnswer}
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
        <button className={`tab-button ${activeTab === 'intro' ? 'active' : ''}`} onClick={() => setActiveTab('intro')}>
          入门阶段
        </button>
        <button className={`tab-button ${activeTab === 'advanced' ? 'active' : ''}`} onClick={() => setActiveTab('advanced')}>
          进阶阶段
        </button>
      </div>

      <div className="learning-content">
        {activeTab === 'intro' && (
          <div className="intro-section">
            <div className="section-card">
              <div className="section-header" onClick={() => toggleSection('basicRules')}>
                <h2>基本规则</h2>
                <span className={`toggle-icon ${expandedSections.basicRules ? 'expanded' : ''}`}>
                  {expandedSections.basicRules ? '▼' : '▶'}
                </span>
              </div>
              {expandedSections.basicRules && (
                <div className="section-content">
                  <h3>规则声明</h3>
                  <p>川麻常见玩法是血战到底，即有人胡牌后其余玩家继续，直到只剩一家未胡；通常只使用条、饼、万三门数牌。</p>

                  <h3>场景示例</h3>
                  <p>例如你已经胡牌离场，牌局并不会立刻结束，其余三家还要继续争胜，这也是血战到底与很多地方麻将最大的节奏差异。</p>

                  <h3>实践目标</h3>
                  <p>先掌握108张牌、4人各战、顺子刻子将牌这些基础结构，再去理解后面的番型和听牌选择。</p>

                  <div className="practice-section">
                    <button className="practice-button" onClick={() => startPractice('basicRules')}>
                      开始实践练习
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="section-card">
              <div className="section-header" onClick={() => toggleSection('cardDistribution')}>
                <h2>洗牌与发牌</h2>
                <span className={`toggle-icon ${expandedSections.cardDistribution ? 'expanded' : ''}`}>
                  {expandedSections.cardDistribution ? '▼' : '▶'}
                </span>
              </div>
              {expandedSections.cardDistribution && (
                <div className="section-content">
                  <h3>规则声明</h3>
                  <p>庄家开局14张，其他玩家13张；庄家先出第一张牌，之后形成固定的摸打一轮。</p>

                  <h3>场景示例</h3>
                  <p>例如庄家打出首张后，下家再摸打一轮，这种“14张先打、其余13张后摸”正是麻将轮转的基本骨架。</p>

                  <h3>实践目标</h3>
                  <p>通过练习记清庄闲张数差异、开牌顺序和轮转方向，避免把开局流程和中局摸打混在一起。</p>

                  <div className="practice-section">
                    <button className="practice-button" onClick={() => startPractice('cardDistribution')}>
                      开始实践练习
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="section-card">
              <div className="section-header" onClick={() => toggleSection('gameplay')}>
                <h2>游戏流程</h2>
                <span className={`toggle-icon ${expandedSections.gameplay ? 'expanded' : ''}`}>
                  {expandedSections.gameplay ? '▼' : '▶'}
                </span>
              </div>
              {expandedSections.gameplay && (
                <div className="section-content">
                  <h3>规则声明</h3>
                  <p>除庄家首打外，其余玩家通常是摸一张、打一张；碰、杠、吃和胡牌都围绕这一轮转展开。</p>

                  <h3>场景示例</h3>
                  <p>例如你手里已有两张相同牌，下家打出第三张时就能碰；若你整手牌能组成四组面子加一对将，就进入基础和牌结构。</p>

                  <h3>实践目标</h3>
                  <p>通过练习分清“什么时候能碰”“什么时候是基础和牌结构”，避免只记名词不懂落点。</p>

                  <div className="practice-section">
                    <button className="practice-button" onClick={() => startPractice('gameplay')}>
                      开始实践练习
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="section-card">
              <div className="section-header" onClick={() => toggleSection('scoring')}>
                <h2>计分规则</h2>
                <span className={`toggle-icon ${expandedSections.scoring ? 'expanded' : ''}`}>
                  {expandedSections.scoring ? '▼' : '▶'}
                </span>
              </div>
              {expandedSections.scoring && (
                <div className="section-content">
                  <h3>规则声明</h3>
                  <p>不同房规番数会有差异，但常见血战到底口径里，平胡通常作为基础起步番型，其他番型是在结构上继续叠加条件。</p>

                  <h3>场景示例</h3>
                  <p>例如你手牌已经明显偏向刻子，就应优先考虑对对胡；若一门花色高度集中，则要警惕自己是否正在走向清一色或清对路线。</p>

                  <h3>实践目标</h3>
                  <p>通过练习学会先识别“这手牌属于哪条结构路线”，再去判断番型价值，而不是只背几个番名。</p>

                  <div className="practice-section">
                    <button className="practice-button" onClick={() => startPractice('scoring')}>
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
              <div className="section-header" onClick={() => toggleSection('advancedStrategy')}>
                <h2>高级策略</h2>
                <span className={`toggle-icon ${expandedSections.advancedStrategy ? 'expanded' : ''}`}>
                  {expandedSections.advancedStrategy ? '▼' : '▶'}
                </span>
              </div>
              {expandedSections.advancedStrategy && (
                <div className="section-content">
                  <h3>技巧声明</h3>
                  <p>示例场景：起手同一门花色特别集中时，要尽早判断是继续做清一色，还是回到更稳的平胡/对对胡路线。</p>

                  <h3>技巧示例</h3>
                  <p>不要只看“哪张最没用”，还要看打出去是否容易喂给下家，尤其是他已经连续收同门牌的时候。</p>

                  <h3>实践目标</h3>
                  <p>高番不一定总比宽听更值钱，很多时候先和牌、先止损，就是更高水平的选择。</p>

                  <div className="practice-section">
                    <button className="practice-button" onClick={() => startPractice('advancedStrategy')}>
                      开始进阶场景练习
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="section-card">
              <div className="section-header" onClick={() => toggleSection('defense')}>
                <h2>防守技巧</h2>
                <span className={`toggle-icon ${expandedSections.defense ? 'expanded' : ''}`}>
                  {expandedSections.defense ? '▼' : '▶'}
                </span>
              </div>
              {expandedSections.defense && (
                <div className="section-content">
                  <h3>技巧声明</h3>
                  <p>示例场景：下家连续切掉两门，只留下同一门不动，往往就是在向清一色或强听牌靠近。</p>

                  <h3>技巧示例</h3>
                  <p>当你判断某家已经听牌时，安全张价值往往高于继续追求自己手牌的小优化。</p>

                  <h3>实践目标</h3>
                  <p>防守不是完全放弃进攻，而是在危险回合优先少送炮，在安全窗口再恢复自己的和牌速度。</p>

                  <div className="practice-section">
                    <button className="practice-button" onClick={() => startPractice('defense')}>
                      开始进阶场景练习
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="section-card">
              <div className="section-header" onClick={() => toggleSection('specialPatterns')}>
                <h2>特殊牌型</h2>
                <span className={`toggle-icon ${expandedSections.specialPatterns ? 'expanded' : ''}`}>
                  {expandedSections.specialPatterns ? '▼' : '▶'}
                </span>
              </div>
              {expandedSections.specialPatterns && (
                <div className="section-content">
                  <h3>技巧声明</h3>
                  <p>示例场景：你手里刻子多、顺子少时，就该尽早考虑是否朝对对胡方向走，而不是硬留边张去拼顺子。</p>

                  <h3>技巧示例</h3>
                  <p>清一色强调同花色，清对则是在清一色基础上还满足对对胡结构，风险和收益都更高。</p>

                  <h3>实践目标</h3>
                  <p>将对通常要求2、5、8结构更集中；七对路线则需要中后期持续保留对子，不宜随便拆散。</p>

                  <div className="practice-section">
                    <button className="practice-button" onClick={() => startPractice('specialPatterns')}>
                      开始进阶场景练习
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="section-card">
              <div className="section-header" onClick={() => toggleSection('advancedTechniques')}>
                <h2>高级技巧</h2>
                <span className={`toggle-icon ${expandedSections.advancedTechniques ? 'expanded' : ''}`}>
                  {expandedSections.advancedTechniques ? '▼' : '▶'}
                </span>
              </div>
              {expandedSections.advancedTechniques && (
                <div className="section-content">
                  <h3>技巧声明</h3>
                  <p>越到中后期，越要数某门已出多少张、自己还剩多少有效进张，这直接决定你该不该改听。</p>

                  <h3>技巧示例</h3>
                  <p>示例场景：高番路线只剩单吊一张，而改牌后可形成多面听时，宽听通常更稳。</p>

                  <h3>实践目标</h3>
                  <p>高手不是只会冲高番，而是能在“继续做大”和“及时止损”之间做出正确切换。</p>

                  <div className="practice-section">
                    <button className="practice-button" onClick={() => startPractice('advancedTechniques')}>
                      开始进阶场景练习
                    </button>
                  </div>
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
