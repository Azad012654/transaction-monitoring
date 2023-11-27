import React from 'react'
import './OracleUI.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OracleUI = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [databases, setDatabases] = useState();
    const [errorstate, setErrorState] = useState();
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


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };


    const payload = {
        user_name: username,
        password: password,
        service_name: servicename,
    }
    const chooseTable = (index) => {
        console.log(index)
        setSelectedTable(table[index])
        setSelectedRows(index);
    }
    const showNext = async () => {

        await fetch(`http://127.0.0.1:8000/show_tables?index=${count}`)
            .then((project_response) => {
                return project_response.json();
            }).then((data) => {
                setTable(data);
            })
        setCount(count + 1)
    }
    const showPrev = async () => {

        await fetch(`http://127.0.0.1:8000/show_tables?index=${count}`)
            .then((project_response) => {
                return project_response.json();
            }).then((data) => {
                setTable(data);
            })
        setCount(count - 1)
    }

    const showTable = async () => {
        setCount(count + 1)
        setRenderMongoBtn(true)
        await fetch(`http://127.0.0.1:8000/show_tables?index=${count}`)
            .then((project_response) => {
                return project_response.json();
            }).then((data) => {
                setTable(data);
            })
    }
    // console.log(username+" "+password)
    const connectToOrcale = async () => {
        if (username === "" || password === "" || servicename === "") {
            alert("Please fill all the details")
        } else {
            try {
                await fetch('http://127.0.0.1:8000/ora_sub', {

                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)

                }).then((data) => {

                    if (data.status === 200) {
                        alert("Connected Successfully")
                        navigate('/etl-dashboard')
                    } else if (data.status === 401) {
                        alert("Wrong Password")
                        window.location.reload()
                    } else {
                        alert("Error Encountered")
                        window.location.reload()
                    }
                    setDatabases(data);
                    setErrorState(data.status)
                    setToggleForms(false)
                })
            }
            catch (error) {
                console.log(error)
                alert("Error Encountered")
            }
        }
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
                    setMongoSuccess("Done")
                } else {
                    alert("Failed To Save")
                }
            })
        }
        catch (error) {
            console.log(error)
            alert("Erro Failed to Save")
        }
    }
    console.log(selectedTable)
    return (
        <>
            <div className='orcale-container'>
                <div className='log-in-container' >
                    <div className='login-form'>
                        {toggleForms === true ? (
                            <div className='input-container'>
                                <div style={{ textAlign: 'center' }}>
                                    <h3 className='log-in-caption'>Connect to Orcale DB</h3>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ display: 'flex', flex: 0.4, flexDirection: 'column', gap: '5px' }}>
                                        <label>Enter Username </label>
                                        <label>Enter Password </label>
                                        <label>Service Name </label>
                                    </div>
                                    <div style={{ display: 'flex', flex: 0.6, flexDirection: 'column', justifyContent: 'flex-start', gap: '2px' }}>
                                        <input type="text" placeholder='username' onChange={(event) => setUsername(event.target.value)}></input>
                                        <input type="password" placeholder='password' onChange={(event) => setPassword(event.target.value)}></input>
                                        <input type="text" placeholder='service name' onChange={(event) => setSetviceName(event.target.value)}></input>

                                    </div>
                                </div>
                                <button className='login-btn' onClick={connectToOrcale}>LOG IN</button>
                                {errorstate === 404 && <div>User Does Not Exist!</div>}
                                {errorstate === 401 && <div style={{ color: 'red' }}>Wrong Password! Authentication Failed</div>}
                                {errorstate === 200 && <div style={{ color: 'green' }}>Successfully Connected</div>}
                            </div>) : null
                        }

                        {
                            errorstate == "200" ? (<>
                                <div className='table-view-container'>
                                    {/* <h2>Table Names</h2> */}
                                    {count <= 1 ? (<div style={{ textAlign: 'center' }}><button className='save-btn' onClick={showTable}>Show Table Names</button></div>) : (
                                        <div className='btn-container'>
                                            <button className='next-btn' onClick={showNext}>Next</button>
                                            <button className='next-btn' onClick={showPrev}>Prev</button>
                                        </div>
                                    )}

                                    {

                                        table.map((row, index) => (
                                            <tr onClick={() => chooseTable(index)} key={index} style={{ backgroundColor: selectedRows === index ? 'green' : 'white', color: selectedRows === index ? 'white' : 'black' }}>
                                                <td>{row}</td>
                                            </tr>
                                        ))
                                    }

                                </div>
                                {RenderMongoBtn ? (
                                    <div style={{ textAlign: 'center' }}>
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
                <div className='image'></div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffd700" fill-opacity="1" d="M0,160L40,186.7C80,213,160,267,240,272C320,277,400,235,480,224C560,213,640,235,720,218.7C800,203,880,149,960,154.7C1040,160,1120,224,1200,240C1280,256,1360,224,1400,208L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
            </div>
        </>
    )
}

export default OracleUI