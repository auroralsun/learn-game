import React, { useState, useEffect } from 'react';
import './EightyPointsLearning.css';
import LazyImage from './LazyImage';
import PracticeOrdering from './PracticeOrdering';
import PracticeQuiz from './PracticeQuiz';
import { markSectionComplete, markPracticeComplete } from '../utils/progressTracker';
import { practiceImages } from '../utils/images';

const practiceScenes = {
  basicRules: [
    {
      title: '游戏目标实践',
      description: '八十分常见目标是抓分方争取拿到80分或更多，守分方则尽量把对手压到80分以下。',
      image: practiceImages.eightyPointsGoal,
      prompt: '更符合八十分胜负目标的是：',
      options: [
        { label: '抓分方争取抓到80分或以上，守分方尽量压分', correct: true },
        { label: '谁先把手牌出完谁就立即单独获胜' },
        { label: '只比较最后谁手里剩牌更少' }
      ]
    },
    {
      title: '牌的组成实践',
      description: '八十分通常使用两副扑克牌，共108张。',
      image: practiceImages.eightyPointsDeck,
      prompt: '两副标准扑克牌一共是多少张？',
      options: [
        { label: '54张' },
        { label: '108张', correct: true },
        { label: '112张' }
      ]
    },
    {
      title: '牌序排序实践',
      description: '请拖动卡片，把这些牌按从大到小的顺序排好。',
      image: practiceImages.eightyPointsRanking,
      prompt: '请按从大到小排列这些牌：',
      orderingItems: ['2', '小王', 'A', '大王'],
      correctOrder: ['大王', '小王', 'A', '2']
    }
  ],
  cardDistribution: [
    {
      title: '发牌实践',
      description: '108张牌由4人参与且留8张底牌时，每位玩家应拿到25张牌。',
      image: practiceImages.eightyPointsDeal,
      prompt: '八十分4人局留8张底牌时，每位玩家应拿多少张牌？',
      options: [
        { label: '24张' },
        { label: '25张', correct: true },
        { label: '26张' }
      ]
    },
    {
      title: '底牌处理实践',
      description: '庄家拿到底牌后，需要整理手牌，再扣回等量底牌。',
      image: practiceImages.eightyPointsBid,
      prompt: '庄家拿到8张底牌后，通常要做什么？',
      options: [
        { label: '把8张底牌全部留在手里，不再回扣' },
        { label: '从手牌中再扣回8张，重新形成底牌', correct: true },
        { label: '立刻把底牌全部公开给所有玩家' }
      ]
    }
  ],
  gameplay: [
    {
      title: '跟牌规则实践',
      description: '首家出某花色时，如果你手里还有该花色，通常必须优先跟该花色。',
      image: practiceImages.eightyPointsPlay,
      prompt: '当首家出红桃A，而你手里还有红桃时，应该：',
      options: [
        { label: '优先跟出红桃牌', correct: true },
        { label: '直接任意出主牌即可' },
        { label: '随便垫别的花色也可以' }
      ]
    },
    {
      title: '计分规则实践',
      description: '八十分常见分牌是5、10、K，其中5算5分，10和K各算10分。',
      image: practiceImages.eightyPointsScore,
      prompt: '请计算这几张分牌总分：5、10、K、5',
      options: [
        { label: '25分' },
        { label: '30分', correct: true },
        { label: '35分' }
      ]
    }
  ],
  basicStrategy: [
    {
      title: '抢主判断实践',
      description: '主牌质量高、分牌控制力强时，通常更适合积极争取主导权。',
      image: practiceImages.eightyPointsStrategy,
      prompt: '你手里有双王、多张主牌和较强分牌控制力，这时更合理的倾向是：',
      options: [
        { label: '积极争取主导权', correct: true },
        { label: '无论如何都不抢主' },
        { label: '先把所有分牌随手垫掉' }
      ]
    },
    {
      title: '团队合作实践',
      description: '配合时既要帮队友保分，也要避免把关键控制牌过早浪费。',
      image: practiceImages.eightyPointsTeamwork,
      prompt: '队友正在控局并准备收分，你更应该：',
      options: [
        { label: '补上能稳住牌权的牌，帮助队友收分', correct: true },
        { label: '立刻把最大牌都抢着打掉' },
        { label: '故意改打最乱的花色' }
      ]
    }
  ],
  advancedStrategy: [
    {
      title: '记分牌场景练习',
      description: '本轮已见两张10和一张K，若对手仍在控局，就要优先考虑剩余分牌还会不会继续被他家拿走。',
      image: practiceImages.eightyPointsScore,
      prompt: '已知大部分分牌尚未落地，而你方当前领先牌权，此时更稳的思路是：',
      options: [
        { label: '继续控牌，把分牌尽量收进本方墩里', correct: true },
        { label: '马上把所有主牌一次性打光' },
        { label: '主动把牌权送回对手试探' }
      ]
    },
    {
      title: '控节奏场景练习',
      description: '你判断队友黑桃门很长，继续让黑桃门走顺，往往比随机切花更容易连续收分。',
      image: practiceImages.eightyPointsPlay,
      prompt: '如果你判断队友在黑桃门很长，你更适合：',
      options: [
        { label: '尽量把牌权导回黑桃，让队友持续兑现', correct: true },
        { label: '立刻改打自己最弱的花色' },
        { label: '完全无视队友牌型，随机出牌' }
      ]
    }
  ],
  defense: [
    {
      title: '守分反制练习',
      description: '对手准备收一墩大分时，守方应优先考虑是否用关键主牌拆掉这一墩。',
      image: practiceImages.eightyPointsPlay,
      prompt: '对手这一墩可能包含两张10和一张K，你手里只剩一个关键主牌，应该：',
      options: [
        { label: '优先考虑断掉这一墩，避免大量失分', correct: true },
        { label: '先省着不用，等分都被拿走再说' },
        { label: '垫最小分牌给对手' }
      ]
    }
  ],
  teamwork: [
    {
      title: '队友信号练习',
      description: '队友在安全时机先垫小牌，常常是在告诉你该门暂时不需要他接管。',
      image: practiceImages.eightyPointsTeamwork,
      prompt: '队友在你已领先的牌墩上垫出很小的同花色牌，更可能意味着：',
      options: [
        { label: '他不想浪费大牌，你可以继续主导本墩', correct: true },
        { label: '他已经没有任何同花色牌' },
        { label: '他希望你立刻把大王打掉' }
      ]
    }
  ],
  advancedTechniques: [
    {
      title: '算牌决策练习',
      description: '若你已经确认两张王都出过，后续主牌大小关系就更容易判断。',
      image: practiceImages.eightyPointsStrategy,
      prompt: '两王都已出现后，你的算牌重点更应该转向：',
      options: [
        { label: '剩余主级牌和关键分牌还在哪一方', correct: true },
        { label: '假装自己没看过已出牌' },
        { label: '只盯着自己上一手出的牌' }
      ]
    }
  ]
};

const EightyPointsLearning = () => {
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
    markSectionComplete(1, section);
  };

  const startPractice = (practiceType) => {
    const firstScene = (practiceScenes[practiceType] || [])[0];
    setSelectedPractice(practiceType);
    setPracticeStep(0);
    setShowPractice(true);
    resetInteractionState(firstScene);
    markPracticeComplete(1, practiceType);
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
              <div className="section-header" onClick={() => toggleSection('basicRules')}>
                <h2>基本规则</h2>
                <span className={`toggle-icon ${expandedSections.basicRules ? 'expanded' : ''}`}>
                  {expandedSections.basicRules ? '▼' : '▶'}
                </span>
              </div>
              {expandedSections.basicRules && (
                <div className="section-content">
                  <h3>规则声明</h3>
                  <p>八十分是一种四人对家的抓分游戏。常见玩法里，抓分方要尽量把分牌抓到80分或以上，守分方则努力把对手压到80分以下。</p>

                  <h3>场景示例</h3>
                  <p>例如你和对家已经收回两墩分牌，而对手还没拿到关键10和K，这时你们的核心任务就不是“快点出完牌”，而是继续把分墩控制在本方。</p>

                  <h3>实践目标</h3>
                  <p>先理解两副牌共108张、4人对家、主牌与副牌大小关系，再通过练习判断哪些选择真正服务于“抓分/守分”。</p>

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
                <h2>发牌与定主</h2>
                <span className={`toggle-icon ${expandedSections.cardDistribution ? 'expanded' : ''}`}>
                  {expandedSections.cardDistribution ? '▼' : '▶'}
                </span>
              </div>
              {expandedSections.cardDistribution && (
                <div className="section-content">
                  <h3>规则声明</h3>
                  <p>两副牌共108张，4人参与且留8张底牌时，每位玩家通常拿25张牌；常见玩法会先定主，再由庄家处理底牌。</p>

                  <h3>场景示例</h3>
                  <p>例如庄家拿到底牌后发现主牌质量明显提升，他需要重新整理整手牌，再扣回8张，不能把底牌无限留在自己手里。</p>

                  <h3>实践目标</h3>
                  <p>通过练习分清“每人拿多少张”“庄家何时形成最终手牌”“底牌如何回扣”这三个最容易混淆的点。</p>

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
                  <p>首家出某花色时，若你手里仍有该花色，一般必须先跟该花色；本墩里牌面最大的玩家赢墩并继续先手。</p>

                  <h3>场景示例</h3>
                  <p>例如首家出红桃A，而你手里还有红桃和主牌，这时不能直接用主牌抢，必须先跟红桃；只有缺门时才考虑垫牌或用主牌翻回牌权。</p>

                  <h3>实践目标</h3>
                  <p>通过练习同时掌握跟牌、赢墩和分牌计算，理解为什么真正关键的是“谁把分墩拿走”，而不是单纯“谁牌更大”。</p>

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
                  <p>基础策略的核心不是“牌大就抢”，而是判断谁更适合控局、何时该保分、何时该把牌权送回队友。</p>

                  <h3>场景示例</h3>
                  <p>例如你手里主牌强但分牌保护一般，就要先想清楚是否真该抢主；如果队友长套更好，很多时候把牌权导回给他更划算。</p>

                  <h3>实践目标</h3>
                  <p>通过练习学会在抢主、出牌顺序和团队配合之间做选择，而不是只按“先出小牌”这类单一口诀操作。</p>

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
                  <p>示例场景：你已看见两张10和一张K被对手收走，这时就要判断剩余分牌是否还会继续落入同一侧，而不是只看自己当前有没有大牌。</p>
                  
                  <h3>技巧示例</h3>
                  <p>示例场景：队友领先一墩时，你垫小同花往往是在告诉他“这门我不需要接”，让队友继续按原节奏控局。</p>
                  
                  <h3>实践目标</h3>
                  <p>示例场景：你判断队友黑桃门很长，就应尽量把牌权导回黑桃，而不是随意切去自己最弱的花色。</p>

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
                  <p>示例场景：对手准备收走一墩20分以上，而你手里只剩一张关键主牌，这时优先断掉这墩通常比“留着以后看”更值。</p>
                  
                  <h3>技巧示例</h3>
                  <p>如果能把对手从舒服的长套门上逼开，往往就能让他提前交出主牌或关键控制牌。</p>
                  
                  <h3>实践目标</h3>
                  <p>真正要省的是能拦住对手关键收分的牌，而不是所有大牌都盲目囤着不用。</p>

                  <div className="practice-section">
                    <button className="practice-button" onClick={() => startPractice('defense')}>
                      开始进阶场景练习
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="section-card">
              <div className="section-header" onClick={() => toggleSection('teamwork')}>
                <h2>团队配合</h2>
                <span className={`toggle-icon ${expandedSections.teamwork ? 'expanded' : ''}`}>
                  {expandedSections.teamwork ? '▼' : '▶'}
                </span>
              </div>
              {expandedSections.teamwork && (
                <div className="section-content">
                  <h3>技巧声明</h3>
                  <p>示例场景：队友已经控住主牌，你就应优先考虑如何保分、导门，而不是为了“展示有牌”去抢回本不该抢的牌权。</p>
                  
                  <h3>技巧示例</h3>
                  <p>一方负责持续控局，另一方负责保住关键分门，这种分工常比两个人都抢着打大牌更有效。</p>
                  
                  <h3>实践目标</h3>
                  <p>一旦发现对手某门已空，团队就该马上换思路，避免再把分牌继续送进可被杀掉的门里。</p>

                  <div className="practice-section">
                    <button className="practice-button" onClick={() => startPractice('teamwork')}>
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
                  <p>高级局里最实用的是算剩余主级牌、分牌和长套归属，知道谁还保留着最后的控制力。</p>
                  
                  <h3>技巧示例</h3>
                  <p>示例场景：你暂时不暴露全部控制牌，可以让对手误判你某门已空，从而在关键墩突然翻回牌权。</p>
                  
                  <h3>实践目标</h3>
                  <p>每次抢墩前都要想清楚：这张大牌打出去后，下一墩是不是还能继续控住，以及分牌是否会因此外流。</p>

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

export default EightyPointsLearning;
