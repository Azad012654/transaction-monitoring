import React from 'react'
import MaxMin from './MaxMin'
import { useNavigate } from 'react-router-dom'

const MaxMinTransaction = () => {
    const navigate = useNavigate();
  return (
    <div>
        <div className='daywise-container'>
            <button onClick={()=> navigate('/day-wise')} className='header-btn'>DayWise Transaction</button>
            <button onClick={()=> navigate('/min-max-dashboard')} className='header-btn'>MAX & MIN Transaction</button>
            <button onClick={()=> navigate('/transaction-count') } className='header-btn'>Count of Transaction</button>
        </div>
        <MaxMin />
    </div>
  )
}

export default MaxMinTransaction