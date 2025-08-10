import React, { useState } from 'react'

function App() {
  const[compoundSelect,setCompoundSelect]=useState(false);
  const[calculateTotalAmount,setCalculateTotalAmount]=useState(0);
  const[calculateInterest,setcalculateInterest]=useState(0);
  const[principal,setPrincipal]=useState(0);
  const [FormData,setFormData]=useState({
    principal:"",
    rate:"",
    periodunit:"",
    compoundf:"",
    value:""
  })
  const radioChangeSelect=()=>{
    setCompoundSelect(true);
  }
  const radiodeSelect=()=>{
    setCompoundSelect(false);
  }
  function dataHandler(event){
    const{name,value,checked,type}=event.target;
    setFormData(previousData=>{
        return{
            ...previousData,
            [name]:type==='checkbox'?checked:value
        }
    })
    }
   
    function formHandler(event){
      event.preventDefault();
      const i = parseFloat(FormData.principal);
      const r = parseFloat(FormData.rate);
      const t = convertToYears(parseFloat(FormData.value), FormData.periodunit);
      
      if (!isNaN(t) && !isNaN(r) && !isNaN(i)) {
        let calculatedInterest;
        let calculatedPrincipal;
        if (!compoundSelect) {
          calculatedInterest = (i * r * t) / 100;
          calculatedPrincipal = i;
        } else {
          const n = getCompoundFrequency(FormData.compoundf);
          calculatedInterest = i * Math.pow(1 + r / (100 * n), n * t) - i;
          calculatedPrincipal = i;
        }
        setcalculateInterest(calculatedInterest.toFixed(2));
        setPrincipal(calculatedPrincipal.toFixed(2));
        const total = parseFloat(calculatedPrincipal) + parseFloat(calculatedInterest);
        setCalculateTotalAmount(total.toFixed(2));
      } else {
        setcalculateInterest('');
        setPrincipal('');
        setCalculateTotalAmount('');
      }
    }
    const convertToYears = (time, unit) => {
      switch (unit) {
        case 'Days':
          return time / 365;
        case 'Weeks':
          return time / 52;
        case 'Months':
          return time / 12;
        case 'Quarters':
          return time / 4;
        default:
          return time;
      }
    }
  
    // Function to get the compound frequency multiplier
    const getCompoundFrequency = (frequency) => {
      switch (frequency) {
        case 'Daily':
          return 365;
        case 'Weekly':
          return 52;
        case 'Monthly':
          return 12;
        case 'Quarterly':
          return 4;
        case 'Semi-Annually':
          return 2;
        case 'Annually':
          return 1;
        default:
          return 1;
      }
    
    }
  return (
    <>
    <div className='font-bold text-center p-5 capitalize text-4xl tracking-normal bg-red-900'>
      <h1 className='sm:text-lg mt-6 lg:text-3xl'>simple interest and compound interest calculator</h1>
    </div>
    
  
    <div className='flex justify-evenly items-center p-6  sm:flex-col lg:flex-row  '>
      <div className=' flex lg:w-[50%] shadow-lg sm:w-[105%] md:w-[60%] rounded-md '>
        <form className='flex flex-col p-5 ' onSubmit={formHandler}>
          <div className='flex justify-evenly items-center  space-x-8 w-[110%]'>
          <label className='lg:text-lg sm:text-xs w-[50%] '>
          <input className=' h-5 w-6 mr-3  text-gray-400  ' type="radio" name="radio" onChange={radiodeSelect} />
           Simple Interest
        </label>
        <label className='lg:text-lg sm:text-xs w-[68%]'>
          <input className='h-5 w-6 mr-3 text-gray-400' type="radio" name="radio"  onChange={radioChangeSelect} />
         Compound Interest
        </label>
          </div>
      
        <label  className="py-4 capitalize"id="principal">principal amount (Rs.)</label>
        <input className='p-2 lg:w-[44vw] rounded-md outline-none focus:border-black border-2 sm:w-[75vw] 'onChange={dataHandler} name="principal" type="number" value={FormData.principal}/>
        <label className="py-4 capitalize" id="annual">annual rate</label>
        <input className='p-2 lg:w-[44vw] rounded-md outline-none focus:border-black border-2 sm:w-[75vw] ' onChange={dataHandler}name="rate" type="number" value={FormData.rate} />
        <label className='py-4 capitalize'>period unit</label>
        <select className='p-2 lg:w-[44vw] rounded-md outline-none focus:border-black border-2 sm:w-[75vw] ' onChange={dataHandler } name="periodunit" value={FormData.periodunit}>
          <option className='capitalize ' value="days">Days</option>
          <option value="weeks">Weeks</option>
          <option value="months">Months</option>
          <option value="quaters">Quaters</option>
          <option value="years">Years</option>
        </select>
        { compoundSelect && 
        <>
        <label className='py-4 capitalize'>compound frequency</label>
         <select className='p-2 lg:w-[44vw] rounded-md outline-none focus:border-black border-2 sm:w-[75vw] ' onChange={dataHandler}  name="compoundf" value={FormData.compoundf}>
         <option className='capitalize ' value="days">Daily</option>
         <option value="weeks">Weekly</option>
         <option value="months">Monthly</option>
         <option value="quaters">Quater</option>
         <option value="semi-annually">Semi-Annually</option>
         <option value="years">Yearly</option>
       </select>
       </>
        }
        <label className='py-4 capitalize'>period value</label>
        <input className='p-2 lg:w-[44vw] rounded-md outline-none focus:border-black border-2 sm:w-[75vw] ' name="value" type="number" value={FormData.value} onChange={dataHandler}/>
        <button className='p-2 shadow-md border-1 m-2 capitalize sm:mt-5'>calculate</button>
        </form>
      </div>
      <div div className=' lg:w-[30%] p-6 rounded-md shadow-md flex flex-col sm:w-[95%] mt-4 '>
        <div className='flex justify-around border-b-2 shadow-md m-3 border-black p-2'  >Interest Earned <span>${calculateInterest}</span></div>
        <div className='flex justify-around border-b-2 shadow-md m-3 border-black p-2'> Principal Amount <span>${principal}</span></div>
        <div className='flex justify-around border-b-2 shadow-md m-3 border-black p-2' >Total Value      <span>${calculateTotalAmount}</span></div>
        </div>
      </div>
        </>
  )
}

export default App
