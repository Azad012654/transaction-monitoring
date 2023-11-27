import React from 'react'
import './DayWise.css'
import ViewTables from '../ViewTables'
import { useNavigate } from 'react-router-dom'
const DayWise = () => {
  const navigate = useNavigate()
  return (
    <div>
        <div className='daywise-container'>
            <button onClick={()=> navigate('/day-wise')} className='header-btn'>DayWise Transaction</button>
            <button onClick={()=> navigate('/min-max-dashboard')} className='header-btn'>MAX & MIN Transaction</button>
            <button onClick={()=> navigate('/transaction-count') } className='header-btn'>Count of Transaction</button>
        </div>
        <ViewTables />
    </div>
  )
}

export default DayWise