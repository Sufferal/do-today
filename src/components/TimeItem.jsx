import '../assets/css/Time/TimeItem.css'

const TimeItem = ({ isActive, cellSize = '30px' }) => {
  const isActiveClass = isActive ? 'active' : '';
  const cellStyle = { width: cellSize, height: cellSize };

  return (
    <div className={`time-cell ${isActiveClass}`} style={cellStyle}></div>
  )
}

export default TimeItem