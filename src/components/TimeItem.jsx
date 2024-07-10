import '../assets/css/Time/TimeItem.css'

const TimeItem = ({ isActive, isCurrent = false, cellSize = '30px' }) => {
  const isActiveClass = isActive ? 'active' : '';
  const isCurrentClass = isCurrent ? 'current' : '';
  const cellStyle = { width: cellSize, height: cellSize };

  return (
    <div className={`time-cell ${isActiveClass} ${isCurrentClass}`} style={cellStyle}></div>
  )
}

export default TimeItem