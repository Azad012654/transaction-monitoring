import React from 'react'
import { useState } from 'react';
import './OracleUI.css'
import { useNavigate } from 'react-router-dom';

const ETL = () => {

    const navigate = useNavigate();

    const [databases, setDatabases] = useState();
    const [errorstate, setErrorState] = useState("200");
    const [errorMessage, setErrorMessage] = useState('');
    const [servicename, setSetviceName] = useState('');
    const [count, setCount] = useState(1);
    const [table, setTable] = useState([]);
    const [selectedTable, setSelectedTable] = useState('');
    const [selectedRows, setSelectedRows] = useState({});
    const [mongoSuccess, setMongoSuccess] = useState("");
    const startTime = performance.now();
    const [toggleForms, setToggleForms] = useState(true);
    const [RenderMongoBtn, setRenderMongoBtn] = useState(false);

    const chooseTable = (index) => {
        console.log(index)
        setSelectedTable(table[index])
        setSelectedRows(index);
    }

    const showNext = async() => {
        await fetch(`http://127.0.0.1:8000/show_tables?index=${count}`)
            .then((project_response) => {
                return project_response.json();
            }).then((data) => {
                setTable(data);
            })
        setCount(count + 1)
    }
    const showPrev = async() => {
        await fetch(`http://127.0.0.1:8000/show_tables?index=${count}`)
        .then((project_response) => {
            return project_response.json();
        }).then((data) => {
            setTable(data);
        })
    setCount(count - 1)
    }
    const showTable = async() => {
        setCount(count + 1)
        setRenderMongoBtn(true)
        await fetch(`http://127.0.0.1:8000/show_tables?index=${count}`)
            .then((project_response) => {
                return project_response.json();
            }).then((data) => {
                setTable(data);
            })
    }

    const submitToMongo = async () => {
        setMongoSuccess("standby")
        try {
            await fetch(`http://127.0.0.1:8000/upload_to_mgdb?tb_name=${selectedTable}`, {

                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((data) => {
                if (data.status == '201') {
                    const endTime = performance.now();
                    const timeTaken = endTime - startTime;
                    console.log(`API request took ${timeTaken} milliseconds`);
                    console.log(data.status)
                    alert("Migration Completed")
                    navigate('/day-wise')
                    setMongoSuccess("Done")
                } else {
                    navigate('/day-wise')
                    alert("Failed To Save")
                }
            })
        }
        catch (error) {
            console.log(error)
            navigate('/day-wise')
            alert("Erro Failed to Save")
        }
    }

    return (
        <><div className='etl-main'>
        <div className='etl-container'>
            {
                errorstate == "200" ? (<>
                <h2></h2>
                    <div className='table-view-container'>
                        {/* <h2>Table Names</h2> */}
                        {count <= 1 ? (<div style={{ textAlign: 'center' }}><button className='save-btn' onClick={showTable}>Show Table Names</button></div>) : (
                            <div className='btn-container'>
                                <button className='next-btn' onClick={showNext}>Next</button>
                                <h3>SELECT TABLE</h3>
                                <button className='next-btn' onClick={showPrev}>Prev</button>
                            </div>
                        )}
                        <div style={{width:'100%'}}>

                        {
                                
                            table.map((row, index) => (
                                <tr onClick={() => chooseTable(index)} key={index} style={{width:'500px', backgroundColor: selectedRows === index ? 'green' : 'white', color: selectedRows === index ? 'white' : 'black' }}>
                                    <td style={{width:'500px'}} >{row}</td>
                                </tr>
                            ))
                            
                        }
                    </div>
                    </div>
                    {RenderMongoBtn ? (
                        <div style={{ textAlign: 'center', marginTop:'10px' }}>
                            <button className='save-btn' onClick={submitToMongo}>Save to MongoDB</button>
                        </div>) : null}
                </>) : null
            }

            {mongoSuccess == "standby" ? (<div className="loading-spinner">
                <div className="spinner"></div>
                <div>Saving.....</div>
            </div>) : null
            }
            </div>
            </div>
        </>
    )
}

export default ETL