import React from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState, useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import './CountTransactions.css'

const CountTransactions = () => {
    const [t_date,setT_date]=useState("");
    const [countData,setCOuntData]=useState(null)
    const [toggleSpinner,setToggleSpinner]=useState(false)
    const handleMonthWise = (date) => {
        const formattedDate = dayjs(date).format('MM/YYYY');
        setT_date(formattedDate)
    };

    const callNext = async () => {
        setToggleSpinner(true)
        try {
            await fetch(`http://127.0.0.1:8000/count_month?date=${t_date}`)
                .then((project_response) => {
                    console.log(project_response)
                    return project_response.json();
                    // const data = await project_response.json();

                }).then((data) => {
                    console.log(data)
                    setCOuntData(data);
                    setToggleSpinner(false)
                })
        
        } catch (error) {
            alert("Error Encountered, Try Again")
        }
    }
    
    console.log(toggleSpinner)
    return (
        <div style={{marginTop:'50px'}} className='count-container'>
            <div className='date-widget-container' >
                
                <div>Select Month And Year :</div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        views={['year', 'month']}
                        label="Select Month and Year"
                        onChange={handleMonthWise}
                    />
                </LocalizationProvider>
                
            </div>
            <button className='count-btn' onClick={callNext}>Show Count</button>
           { toggleSpinner===true ? ( <div className='display-count'>
                <label>Total Count for {t_date} is : {countData.transaction_count}</label>
            </div>): (<div>Hello</div>)
            }
        </div>
    )
}

export default CountTransactions