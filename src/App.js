import Transaction from './components/Transaction';
import Form from './components/Form';
import Report from './components/Report';
import './App.css';
import { useState, useEffect, useReducer } from 'react';
import DataContext from './data/DataContext';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';

function App() {
  const initState = [
    {id:1,title:"ค่าที่พัก",amount:-7000},
    {id:2,title:"เงินเดือน",amount:50000},
    {id:3,title:"ค่าเดินทาง",amount:-2000},
    {id:4,title:"ค่าอาหาร",amount:-6000},
    {id:5,title:"โบนัสรายเดือน",amount:1200}
  ]

  const [items,setItems] = useState(initState)

  const [reportIncome, setReportIncome] = useState(0)
  const [reportExpense, setReportExpense] = useState(0)

  const onAddNewItem=(newItem)=>{
    setItems((prevItem)=>{
      return [newItem,...prevItem] //prevItem คือ stateก่อนหน้า
    })
  }

  useEffect(()=>{
    const amounts = items.map(items=>items.amount)
    const income = amounts.filter(element=>element>0).reduce((total,element)=>total+=element,0)
    const expense = (amounts.filter(element=>element<0).reduce((total,element)=>total+=element,0))*-1

    setReportIncome(income.toFixed(2))
    setReportExpense(expense.toFixed(2))
  },[items,reportIncome,reportExpense])


  // //reducer state
  // const [showReport,setShowReport] = useState(true)
  // const reducer=(state, action)=>{
  //   switch (action.type) {
  //     case "SHOW":
  //       return setShowReport(true)
  //       break;
  //     case "HIDE":
  //       return setShowReport(false)
  //       break;
  //   }
  // }
  // const [result, dispatch] = useReducer(reducer,showReport)

  return (
    <DataContext.Provider value={{income : reportIncome, expense : reportExpense}}>
      <div className="container">      
        <Router>
          <div>
            <ul className="horizontal-menu">
              <li>
                <Link to="/">ข้อมูลบัญชี</Link>
              </li>
              <li>
                <Link to="/insert">บันทึกข้อมูล</Link>
              </li>
            </ul>
            <h1>แอพบัญชีรายรับ - รายจ่าย</h1>
            <Switch>
              <Route path="/" exact>
                <Report/>
              </Route>
              <Route path="/insert">
                <Form onAddItem={onAddNewItem}/>
                <Transaction items={items}/> 
              </Route>
            </Switch>
          </div>
        </Router>        
        {/* {showReport && <Report/>}       
        <div>
          <h1>{result}</h1>
          <button onClick={()=>dispatch({type:"SHOW"})}>แสดง</button>
          <button onClick={()=>dispatch({type:"HIDE"})}>ซ่อน</button>
        </div> */}
      </div>
    </DataContext.Provider>
    
  );
}

export default App;
