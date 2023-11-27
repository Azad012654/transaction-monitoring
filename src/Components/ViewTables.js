import React from 'react'
import './ViewTables.css'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState, useRef, useEffect } from 'react';
import dayjs from 'dayjs';
const ViewTables = () => {

    // const [selectedDate, setSelectedDate] = useState(null);
    const [t_date, setTDate] = useState('');
    const [selectDateFormat, setSelectDateFormat] = useState('Day');
    const [count, setCount] = useState(-1);
    const [dayWiseTableData, setDayWiseTableData] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = 0;
        }
    }, [dayWiseTableData]);

    const handleDateChange = (date) => {
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        setTDate(formattedDate)
        // setSelectedDate(date);
    };
    const handleMonthWise = (date) => {
        const formattedDate = dayjs(date).format('MM/YYYY');
        setTDate(formattedDate)
        // setSelectedDate(date);
    };

    const handleFilterChange = (event) => {
        setSelectDateFormat(event.target.value);
        setCount(-1)
    };

    const convertDate = (index)=>{
        const date = dayWiseTableData[index].TRANSACTIONDATE.$date
        const formattedDate = date.substring(0, 10);
        console.log(formattedDate)
        return formattedDate
    }
    console.log(t_date)
    const callNext = async () => {
        const newCount = count + 1; // Decrement the count
            setCount(newCount);
            let queryparam = "";
            if(selectDateFormat==="Day"){
              queryparam = "date"  
            } else {
                queryparam="month";
            }
            console.log(queryparam)
        try {
            await fetch(`http://127.0.0.1:8000/search_${queryparam}?date=${t_date}&index=${newCount}`)
                .then((project_response) => {
                    console.log(project_response)
                    return project_response.json();
                    // const data = await project_response.json();

                }).then((data) => {
                    console.log(data)
                    setDayWiseTableData(data);
                })
        
        } catch (error) {
            alert("Error Encountered, Try Again")
        }
    }
console.log(selectDateFormat)



    const callPrev = async () => {
        if (count >= 0) {
            const newCount = count - 1; // Decrement the count
            setCount(newCount);
            let queryparam = "";
            if(selectDateFormat==="Day"){
              queryparam = "date"  
            } else {
                queryparam="month";
                
            }
            console.log(queryparam)
            try {

                await fetch(`http://127.0.0.1:8000/search_${queryparam}?date=${t_date}&index=${newCount}`)
                    .then((project_response) => {
                        console.log(project_response)
                        return project_response.json();
                        // const data = await project_response.json();

                    }).then((data) => {
                        console.log(data)
                        setDayWiseTableData(data);
                    })
            } catch (error) {
                alert("Error Encountered, Try Again")
            }

        }
    }
    // const formatSelectedDate = (date) => {
    //     const formattedDate = dayjs(date).format('YYYY-MM-DD');

    //     setTDate(formattedDate);
    // };
    console.log(count)
    // console.log(dayWiseTableData[0].TRANSACTIONDATE.$date)
    return (
        <div className='viewTables-Main'>
            <div className=''>

            </div>
            <div className='Table-Container'>

                {/* <div>Select Date</div> */}
                <div style={{width:'600px'}}>
                <div className='dropdown-dates'>
                    <div style={{ fontWeight: 'bold', fontFamily: 'sans-serif', marginTop: '20px' }}>Filter By :</div>
                    <select className="dropdown-btn" id="cars" value={selectDateFormat} onChange={handleFilterChange}>
                        <option value="Day" selected>Day Wise</option>
                        <option value="Month">Month Wise</option>
                    </select>
                </div>
                <div style={{ display: 'flex', gap: '50px' }}>
                    {
                        selectDateFormat === "Day" ? (
                            <div className='date-widget'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            label="Select Date"
                                            onChange={handleDateChange}
                                            style={{ width: '50px', height: '20px' }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>) : (
                            <div style={{marginTop:'10px'}} className='month-wise'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        views={['year', 'month']}
                                        label="Select Month and Year"

                                        onChange={handleMonthWise}

                                    />
                                </LocalizationProvider>
                            </div>)

                    }
                    <button onClick={callNext} className='search-btn'>Search</button>
                </div>
                </div>
                {dayWiseTableData.length > 0 ? (<>
                    <thead style={{ diaplay: 'flex', gap: '5px' }}>
                        <th>CustomerID</th>
                        <th>TransactionID</th>
                        <th>TransactioDate</th>
                        <th>CustomerLocation</th>
                        <th>TransactionAmount</th>

                    </thead>
                    <div className='table-container' ref={containerRef}>
                        {dayWiseTableData.map((row, index) => (
                            <tr key={index} >
                                <td>{row.CUSTOMERID}</td>
                                <td>{row.TRANSACTIONID}</td>
                                <td>{convertDate(index)}</td>
                                <td>{row.CUSTLOCATION}</td>
                                <td>{row.TRANSACTIONAMOUNT}</td>
                            </tr>
                        ))}
                        
                    </div>
                    <div className='pagination-btn'>
                            <button onClick={callNext}>Next</button>
                            <button onClick={callPrev}>Prev</button>
                        </div>



                </>) : null
                }
            </div>
        </div>
    )
}

export default ViewTables