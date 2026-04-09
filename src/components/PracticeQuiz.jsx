const PracticeQuiz = ({
  prompt,
  options,
  selectedOption,
  revealAnswer,
  onSelect,
  feedbackTitle,
  feedbackBody
}) => (
  <div className="interactive-element">
    <p>{prompt}</p>
    <div className="option-buttons">
      {options.map((option, index) => {
        const isSelected = selectedOption === index
        const isCorrect = option.correct === true

        let className = 'option-btn'

        if (isSelected) {
          className += ' selected'
        }

        if (revealAnswer && isCorrect) {
          className += ' revealed-correct'
        }

        if (revealAnswer && isSelected && !isCorrect) {
          className += ' revealed-incorrect'
        }

        return (
          <button
            key={`${prompt}-${option.label}`}
            type="button"
            className={className}
            onClick={() => onSelect(index)}
            disabled={revealAnswer}
          >
            {option.label}
          </button>
        )
      })}
    </div>
    {revealAnswer && feedbackTitle && (
      <div className="practice-feedback">
        <h3>{feedbackTitle}</h3>
        <p>{feedbackBody}</p>
      </div>
    )}
  </div>
)

export default PracticeQuiz
