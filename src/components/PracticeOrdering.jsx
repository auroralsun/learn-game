import { useRef } from 'react'

const PracticeOrdering = ({
  prompt,
  items,
  revealAnswer,
  onReorder,
  feedbackTitle,
  feedbackBody
}) => {
  const dragIndexRef = useRef(null)

  const moveItem = (fromIndex, toIndex) => {
    if (fromIndex === toIndex || fromIndex === null || toIndex === null) {
      return
    }

    const nextItems = [...items]
    const [movedItem] = nextItems.splice(fromIndex, 1)
    nextItems.splice(toIndex, 0, movedItem)
    onReorder(nextItems)
  }

  return (
    <div className="interactive-element">
      <p>{prompt}</p>
      <div className="drag-drop-container">
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className={`draggable-card ${revealAnswer ? 'revealed-order' : ''}`}
            draggable={!revealAnswer}
            onDragStart={() => {
              dragIndexRef.current = index
            }}
            onDragOver={(event) => {
              event.preventDefault()
            }}
            onDrop={() => {
              moveItem(dragIndexRef.current, index)
              dragIndexRef.current = null
            }}
            onDragEnd={() => {
              dragIndexRef.current = null
            }}
          >
            <span className="order-index">{index + 1}</span>
            <span className="order-label">{item}</span>
          </div>
        ))}
      </div>
      {revealAnswer && (
        <div className="practice-feedback">
          <h3>{feedbackTitle || '排序结果已确认'}</h3>
          <p>{feedbackBody || '已显示标准顺序，可继续进入下一题。'}</p>
        </div>
      )}
    </div>
  )
}

export default PracticeOrdering
