import axios from 'axios';
import React, { useState } from 'react'
import { useRef } from "react";
import './MaxMin.css';
// import axios from 'axios';

const MaxMin = () => {
    const CustomerID = useRef();
    const [result,setResult]=useState([])
    

    const submitHandler =async(e)=>{
        const payload={
            CustomerID:CustomerID.current.value,
          }
          
        console.log(payload.CustomerID)
          await axios.get(`http://127.0.0.1:8000/fetch_mongo?customerID=${payload.CustomerID}`)
          .then(function (response) {
            console.log(response.data);
            setResult(response.data)
          })
          .catch(function (error) {
            console.log(error);
          })

       
    }

  return (
    <>
      <div className='max-min-container' >
        <label style={{marginTop:'5vh', fontSize:'20px'}} htmlFor="from date"><h6>Enter CustomerID Below :</h6></label>
        <input className='date-box' placeholder="CustomerID"
        type="text" ref={CustomerID}/>
        <button type='submit' id='assign_btn' onClick={submitHandler}>Get Transactions</button>
        </div>
        {result.map((number) => (
            <div key="uniqueKey" className='res_div' >
                <div>
                <label>LOW TRANSACTION AMOUNT:</label> ₹{number.Lowest_Amount}
                <br></br>
                <label>HIGHEST TRANSACTION_ID :</label>{number.Highest_Trans_id}
                </div>
                <div>
                <label>HIGH TRANSACTION AMOUNT:</label> ₹{number.Highest_Amount}
                <br></br>
                <label>LOWEST TRANSACTION_ID :</label>{number.Lowest_Trans_id}
                </div>
                <div>
                
                </div>
            </div>
            ))}

 
        
    </>
  )
}

export default MaxMin
