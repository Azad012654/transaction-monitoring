// import logo from './logo.svg';
import './App.css';
// import Header from './Components/Header';
import OracleUI from './Components/OracleUI';
import { Routes, Route } from 'react-router-dom';
import ViewTables from './Components/ViewTables';
import DayWise from './Components/Dashboard/DayWise';
import MaxMinTransaction from './Components/Dashboard/MaxMinTransaction';
import CountOfTransaction from './Components/Dashboard/CountOfTransaction';
import ETL from './Components/ETL';

function App() {
  return (
    // <div className="App">
    <>
    <Routes>

    <Route path='/' exact Component={OracleUI} />
    <Route path='/day-wise' exact Component={DayWise} />
    <Route path='/min-max-dashboard' exact Component={MaxMinTransaction} />
    <Route path='/transaction-count' exact Component={CountOfTransaction} />
    <Route path='/etl-dashboard' exact Component={ETL} />
    {/* <Route path='/min-max' exact Component={DayWise} /> */}
    <Route path='/view-tables' exact Component={ViewTables} />
  </Routes >
      {/* <OracleUI /> */}
     </>
  );
}

export default App;
