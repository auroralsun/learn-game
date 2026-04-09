import React, { useState, useEffect } from 'react';
import './DoudizhuLearning.css';
import LazyImage from './LazyImage';
import PracticeOrdering from './PracticeOrdering';
import PracticeQuiz from './PracticeQuiz';
import { markSectionComplete, markPracticeComplete } from '../utils/progressTracker';
import { practiceImages } from '../utils/images';

const practiceScenes = {
  basicRules: [
    {
      title: '游戏目标实践',
      description: '斗地主的核心目标是先把自己这一方的牌全部出完。',
      image: practiceImages.doudizhuGoal,
      prompt: '斗地主标准玩法的人数是：',
      options: [
        { label: '2人' },
        { label: '3人', correct: true },
        { label: '4人' }
      ]
    },
    {
      title: '牌序排序实践',
      description: '请拖动卡片，把它们按从大到小的顺序排好。',
      image: practiceImages.doudizhuRanking,
      prompt: '请按从大到小排列这些牌：',
      orderingItems: ['K', '2', 'A', '大王'],
      correctOrder: ['大王', '2', 'A', 'K']
    }
  ],
  cardDistribution: [
    {
      title: '发牌实践',
      description: '每位玩家先拿17张牌，剩余3张作为底牌，地主拿到底牌后手牌变为20张。',
      image: practiceImages.doudizhuDeal,
      prompt: '地主最终会有多少张牌？',
      options: [
        { label: '17张' },
        { label: '20张', correct: true },
        { label: '23张' }
      ]
    },
    {
      title: '叫牌实践',
      description: '叫牌通常从随机起始玩家开始，最高可以叫到3分。',
      image: practiceImages.doudizhuBid,
      prompt: '叫牌的最高分数通常是：',
      options: [
        { label: '1分' },
        { label: '2分' },
        { label: '3分', correct: true }
      ]
    }
  ],
  gameplay: [
    {
      title: '出牌规则实践',
      description: '跟牌时必须出同类型且更大的牌，否则只能选择不要。',
      image: practiceImages.doudizhuPlay,
      prompt: '当上家出对子时，你更合理的回应是：',
      options: [
        { label: '出更大的对子', correct: true },
        { label: '出单牌也算跟牌' },
        { label: '顺子一定能压对子' }
      ]
    },
    {
      title: '胜负判断实践',
      description: '若任意一个农民先出完牌，农民方整体获胜。',
      image: practiceImages.doudizhuVictory,
      prompt: '如果农民甲先把牌出完，结果应是：',
      options: [
        { label: '地主获胜' },
        { label: '农民方获胜', correct: true },
        { label: '需要看农民乙剩几张牌' }
      ]
    }
  ],
  basicStrategy: [
    {
      title: '叫牌策略实践',
      description: '炸弹、大牌和顺畅牌型越多，越适合积极叫高分。',
      image: practiceImages.doudizhuStrategy,
      prompt: '当你有两组炸弹且高牌很多时，更合理的倾向是：',
      options: [
        { label: '叫3分', correct: true },
        { label: '一定不叫' },
        { label: '先把炸弹拆开再决定' }
      ]
    },
    {
      title: '农民合作实践',
      description: '农民不是各打各的，而是要合力卡住地主的出牌节奏。',
      image: practiceImages.doudizhuTeamwork,
      prompt: '当队友已经能压住地主时，你更应该：',
      options: [
        { label: '尽量配合队友保住牌权', correct: true },
        { label: '抢着把自己最大牌先打掉' },
        { label: '完全不看队友情况只顾自己' }
      ]
    }
  ],
  advancedStrategy: [
    {
      title: '记牌场景练习',
      description: '如果大小王都已出现，你对剩余炸弹和高牌的判断会更准确。',
      image: practiceImages.doudizhuStrategy,
      prompt: '已知大小王都打出后，你接下来最该关注的是：',
      options: [
        { label: '剩余2和炸弹还在谁手里', correct: true },
        { label: '忘掉已出的牌，重新猜' },
        { label: '只盯着自己下一手想打什么' }
      ]
    },
    {
      title: '控节奏场景练习',
      description: '地主若手里有一条长顺，最怕被农民不断断节奏、逼拆牌。',
      image: practiceImages.doudizhuPlay,
      prompt: '如果你判断地主想连走顺子，农民更合理的策略是：',
      options: [
        { label: '优先用合适牌型断节奏，逼地主拆牌', correct: true },
        { label: '完全放任地主顺着出' },
        { label: '只要有牌就随便乱压' }
      ]
    }
  ],
  landlordSkills: [
    {
      title: '地主出牌顺序练习',
      description: '地主常要优先处理最容易被卡死的牌型，再考虑留关键大牌收尾。',
      image: practiceImages.doudizhuStrategy,
      prompt: '地主手里有一手长顺和两张单牌，更稳的思路通常是：',
      options: [
        { label: '优先考虑把长顺价值兑现，再规划单牌出口', correct: true },
        { label: '先把所有单牌乱甩掉' },
        { label: '立刻把炸弹拆开垫小牌' }
      ]
    }
  ],
  peasantSkills: [
    {
      title: '农民协同练习',
      description: '一个农民负责顶牌，另一个农民负责跑牌，是非常常见的协同方式。',
      image: practiceImages.doudizhuTeamwork,
      prompt: '队友已经明显在帮你顶地主，你更应该：',
      options: [
        { label: '抓住窗口尽快走自己的整手牌', correct: true },
        { label: '继续和队友抢同一手牌权' },
        { label: '故意拆散自己已成型的牌' }
      ]
    }
  ],
  advancedTechniques: [
    {
      title: '拆牌决策练习',
      description: '拆牌不是越少越好，而是看拆完之后是否能形成更顺的整体出牌路线。',
      image: practiceImages.doudizhuPlay,
      prompt: '为了避免最后卡一张单牌，以下哪种思路更合理？',
      options: [
        { label: '必要时提前拆出更顺的整体路线', correct: true },
        { label: '无论如何绝不拆牌' },
        { label: '只看当前这一手能不能压住，不看后续' }
      ]
    }
  ]
};

const DoudizhuLearning = () => {
  const [activeTab, setActiveTab] = useState('intro');
  const [expandedSections, setExpandedSections] = useState({});
  const [practiceStep, setPracticeStep] = useState(0);
  const [showPractice, setShowPractice] = useState(false);
  const [selectedPractice, setSelectedPractice] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [revealAnswer, setRevealAnswer] = useState(false);
  const [orderingItems, setOrderingItems] = useState([]);
  const [hasInteracted, setHasInteracted] = useState(false);

  const resetInteractionState = (scene) => {
    setSelectedOption(null);
    setRevealAnswer(false);
    setOrderingItems(scene?.orderingItems ? [...scene.orderingItems] : []);
    setHasInteracted(false);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
    markSectionComplete(3, section);
  };

  const startPractice = (practiceType) => {
    const firstScene = (practiceScenes[practiceType] || [])[0];
    setSelectedPractice(practiceType);
    setPracticeStep(0);
    setShowPractice(true);
    resetInteractionState(firstScene);
    markPracticeComplete(3, practiceType);
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

    if (currentScene?.orderingItems && !revealAnswer) {
      if (!hasInteracted) {
        return;
      }

      setOrderingItems([...currentScene.correctOrder]);
      setRevealAnswer(true);
      return;
    }

    if (practiceStep === scenes.length - 1) {
      closePractice();
      return;
    }

    const nextStep = practiceStep + 1;
    setPracticeStep(nextStep);
    resetInteractionState(scenes[nextStep]);
  };

  const prevPracticeStep = () => {
    const prevStep = practiceStep - 1;
    setPracticeStep(prevStep);
    resetInteractionState((practiceScenes[selectedPractice] || [])[prevStep]);
  };

  const closePractice = () => {
    setShowPractice(false);
    setSelectedPractice(null);
    setPracticeStep(0);
    resetInteractionState(null);
  };

  useEffect(() => {
    const cards = document.querySelectorAll('.practice-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate-in');
      }, index * 100);
    });
  }, [practiceStep, selectedPractice]);

  const renderPracticeInteractive = (scene) => {
    const correctIndex = scene.options?.findIndex((option) => option.correct) ?? -1;
    const isCorrect = selectedOption === correctIndex;
    const feedbackTitle = revealAnswer
      ? isCorrect
        ? '回答正确'
        : '这题需要修正'
      : '';
    const feedbackBody = revealAnswer
      ? `知识点：${scene.knowledgePoint || scene.description}`
      : '';

    if (scene.options) {
      return (
        <PracticeQuiz
          prompt={scene.prompt}
          options={scene.options}
          selectedOption={selectedOption}
          revealAnswer={revealAnswer}
          onSelect={setSelectedOption}
          feedbackTitle={feedbackTitle}
          feedbackBody={feedbackBody}
        />
      );
    }

    if (scene.orderingItems) {
      return (
        <PracticeOrdering
          prompt={scene.prompt}
          items={orderingItems}
          revealAnswer={revealAnswer}
          onReorder={(items) => {
            setOrderingItems(items);
            setHasInteracted(true);
          }}
          feedbackTitle="排序结果已确认"
          feedbackBody={`知识点：${scene.knowledgePoint || scene.description}`}
        />
      );
    }

    return scene.interactive;
  };

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
          {renderPracticeInteractive(currentScene)}
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
              disabled={
                (currentScene.options && selectedOption === null && !revealAnswer) ||
                (currentScene.orderingItems && !hasInteracted && !revealAnswer)
              }
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
                  <p>斗地主是三人对抗游戏，1名地主对2名农民，目标是让自己这一方先把手牌全部出完。</p>

                  <h3>场景示例</h3>
                  <p>例如农民甲先走完牌，即使农民乙手里还有牌，这局也算农民方整体获胜；这和很多“只看个人先出完”的纸牌游戏不同。</p>

                  <h3>实践目标</h3>
                  <p>先掌握54张牌、地主与农民阵营、以及大王 {'>'} 小王 {'>'} 2 {'>'} A 的单牌顺序，再进入牌型压制练习。</p>

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
                <h2>发牌与叫牌</h2>
                <span className={`toggle-icon ${expandedSections.cardDistribution ? 'expanded' : ''}`}>
                  {expandedSections.cardDistribution ? '▼' : '▶'}
                </span>
              </div>
              {expandedSections.cardDistribution && (
                <div className="section-content">
                  <h3>规则声明</h3>
                  <p>每位玩家先拿17张牌，剩余3张作为底牌；叫分最高者成为地主并拿走底牌。</p>

                  <h3>场景示例</h3>
                  <p>例如你叫到3分成为地主，拿到底牌后手牌会变成20张，因此你判断牌型和规划出牌路线时一定要把底牌增益算进去。</p>

                  <h3>实践目标</h3>
                  <p>通过练习分清“先17张、后20张”“谁能成为地主”“底牌如何改变整手牌价值”这几个基础点。</p>

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
                  <p>上家出什么牌型，下家就只能用同类型更大的牌压，或者选择不要；不能拿顺子去压对子。</p>

                  <h3>场景示例</h3>
                  <p>例如上家出了对子10，你手里有顺子和对子J，这时只有对子J能压，顺子再大也不算同类型压制。</p>

                  <h3>实践目标</h3>
                  <p>通过练习同时掌握牌型压制、胜负判断和倍率变化，理解为什么很多局面里“要不要压”比“能不能压”更重要。</p>

                  <div className="practice-section">
                    <button className="practice-button" onClick={() => startPractice('gameplay')}>
                      开始实践练习
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="section-card">
              <div className="section-header" onClick={() => toggleSection('basicStrategy')}>
                <h2>基本策略</h2>
                <span className={`toggle-icon ${expandedSections.basicStrategy ? 'expanded' : ''}`}>
                  {expandedSections.basicStrategy ? '▼' : '▶'}
                </span>
              </div>
              {expandedSections.basicStrategy && (
                <div className="section-content">
                  <h3>规则声明</h3>
                  <p>基础策略的核心是判断整手牌路线是否顺畅，而不是只看自己有没有几张大牌。</p>

                  <h3>场景示例</h3>
                  <p>例如你虽有炸弹，但单牌出口很多且连牌断裂，就不一定适合冲高分；反过来，牌型顺畅时即使没有很多炸弹，也可能值得积极叫牌。</p>

                  <h3>实践目标</h3>
                  <p>通过练习判断叫牌、出牌路线和农民配合之间的关系，避免只靠“有炸弹就叫”“有大牌就压”这类单点思维决策。</p>

                  <div className="practice-section">
                    <button className="practice-button" onClick={() => startPractice('basicStrategy')}>
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
                  <p>示例场景：当大小王都已打出后，你对剩余2和炸弹的判断会清晰很多，这会直接影响你敢不敢放地主继续走牌。</p>

                  <h3>技巧示例</h3>
                  <p>示例场景：地主想连走顺子时，农民就应尽量用合适牌型打断，让地主被迫拆牌。</p>

                  <h3>实践目标</h3>
                  <p>如果对手连续优先处理单牌，往往说明他在为长顺、飞机或对子收尾铺路。</p>

                  <div className="practice-section">
                    <button className="practice-button" onClick={() => startPractice('advancedStrategy')}>
                      开始进阶场景练习
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="section-card">
              <div className="section-header" onClick={() => toggleSection('landlordSkills')}>
                <h2>地主技巧</h2>
                <span className={`toggle-icon ${expandedSections.landlordSkills ? 'expanded' : ''}`}>
                  {expandedSections.landlordSkills ? '▼' : '▶'}
                </span>
              </div>
              {expandedSections.landlordSkills && (
                <div className="section-content">
                  <h3>技巧声明</h3>
                  <p>示例场景：你手里有一手长顺和两张难处理的单牌，往往要先思考长顺如何兑现，再安排单牌出口，而不是见牌就压。</p>

                  <h3>技巧示例</h3>
                  <p>地主最大的优势不是“牌多”，而是更容易拼出一条完整的出牌路线，所以更要珍惜连牌和炸弹的整体价值。</p>

                  <h3>实践目标</h3>
                  <p>在对手只剩一两手牌时，地主更应关注是否还能稳住最后一次牌权，而不是一味拼眼前这一手。</p>

                  <div className="practice-section">
                    <button className="practice-button" onClick={() => startPractice('landlordSkills')}>
                      开始进阶场景练习
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="section-card">
              <div className="section-header" onClick={() => toggleSection('peasantSkills')}>
                <h2>农民技巧</h2>
                <span className={`toggle-icon ${expandedSections.peasantSkills ? 'expanded' : ''}`}>
                  {expandedSections.peasantSkills ? '▼' : '▶'}
                </span>
              </div>
              {expandedSections.peasantSkills && (
                <div className="section-content">
                  <h3>技巧声明</h3>
                  <p>示例场景：队友明显在替你顶地主时，你就要抓紧机会走牌，而不是再去和队友争同一手牌权。</p>

                  <h3>技巧示例</h3>
                  <p>农民的强点往往来自持续断节奏，让地主无法按自己理想的牌序一把走完。</p>

                  <h3>实践目标</h3>
                  <p>当你判断地主只剩一手可成型牌时，关键对子、炸弹或大单张都可能成为决定胜负的“闸门牌”。</p>

                  <div className="practice-section">
                    <button className="practice-button" onClick={() => startPractice('peasantSkills')}>
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
                  <p>拆牌不是越少越好，而是看拆完之后能否形成更顺的整体路线，例如避免最后卡一张无处可出的单牌。</p>

                  <h3>技巧示例</h3>
                  <p>示例场景：你故意先放过一手较小对子，可能让对手误判你已经没有更大对子，从而在关键轮次吃回牌权。</p>

                  <h3>实践目标</h3>
                  <p>越到残局，越要算剩余2、炸弹和单张出口，很多胜负都不在“这手能不能压”，而在“压完之后谁还剩最后一手”。</p>

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

export default DoudizhuLearning;
