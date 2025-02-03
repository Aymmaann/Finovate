import { React, useState, useEffect, useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import jsonData from '../data/data.json'
import assets from "../assets/assets.js"
import IncomeExpenseChart from '../graphs/IncomeExpenseChart.jsx'
import ExpenseCategoryPieChart from '../graphs/EXpenseCategoryPieChart.jsx'
import SavingsProgressBarChart from '../graphs/SavingProgressBarChart.jsx'
import DebtVsSavingsChart from '../graphs/DebtVsSavingsChart.jsx'
import RecentTransactions from '../graphs/RecentTransactions.jsx'
import { useFinance } from '../context/FinovateContext.jsx';


const Dashboard = () => { 
  const [active, setActive] = useState('today')
  const [totalSpending, setTotalSpending] = useState(0)
  const { monthData, 
          todaysData, 
          todayIncome, 
          todayExpense, 
          todayStatus } = useFinance()
  const Balance = jsonData.Total_Balance
  const { expenseTotals, isDataLoaded } = useFinance()
  

  const formatBalance = (balance) => {
    return new Intl.NumberFormat('en-US').format(balance);
  };
  

  useEffect(() => {
    if (isDataLoaded) {
      console.log(expenseTotals);
      const sortedExpenses = Object.entries(expenseTotals).sort((a, b) => b[1] - a[1]);
      const top3expenses = sortedExpenses.slice(0, 3);
      if (top3expenses.length > 0) {
        console.log(top3expenses);
        const spending = top3expenses[0][1] + top3expenses[1][1] + top3expenses[2][1];
        setTotalSpending(spending);
      }
    }
  }, [expenseTotals]);
  const top3expenses = expenseTotals ? Object.entries(expenseTotals).sort((a, b) => b[1] - a[1]).slice(0, 3) : [];
  
  return (
    <div className='flex'>
      <Sidebar />

      <div className='ml-64 flex-grow bg-transparent'>
        <Navbar />

        <div
          aria-hidden="true"
          className="absolute inset-0 -top-10 -left-10 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-20 sm:-left-20">
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative top-0 left-0 aspect-[1155/678] w-[36.125rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:w-[72.1875rem]"/>
        </div>



        {/* Dashboard Content */}
        {isDataLoaded && top3expenses.length>0? (
            <div className="p-10">
              {/* Intro */}
              <div>
                <h1 className="text-4xl font-semibold text-gray-900">Hi, Ayman Haseeb</h1>
                <p className="text-gray-700 mt-2">Here's an overview of your finances—let's take control of your expenses!</p>
              </div>
    
    
              {/* Quick Info on Daily and Monthly expenditure */}
              <div>
                <div className="flex gap-5 mt-8">
                  <button className="smooth-transition rounded-md cursor-pointer bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          onClick={() => setActive('today')}
                  >
                    Today's Data
                  </button>
                  <button className="smooth-transition rounded-md cursor-pointer bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          onClick={() => setActive('month')}
                  >
                  Monthly Data
                  </button>
                </div>
                <div className="w-full flex items-center gap-6 mt-4">
                  <div className="bg-white rounded-xl h-[150px] flex-1 shadow px-8 flex justify-between">
                    <div className="">
                      <p className="font-semibold mt-8">{ active === 'today' ? "Today's income" : "Monthly Income"}</p>
                      <p className="text-3xl font-medium mt-4">${ active === 'today' ? `${formatBalance(todayIncome)}` : `${formatBalance(monthData.Month_Income)}`} <span className="text-green-500 text-sm font-semibold">+2%</span></p>
                    </div>
                    <div className="p-3 rounded-xl border border-gray-300 my-auto">
                      <assets.LuBadgeCheck className="text-gray-800 text-[25px]" />
                    </div>
                  </div>
    
                  <div className="bg-white rounded-xl h-[150px] flex-1 shadow px-8 flex justify-between">
                    <div>
                      <p className="font-semibold mt-8">{ active === 'today' ? "Today's expense" : "Monthly expense"}</p>
                      <p className="text-3xl font-medium mt-4">${ active === 'today' ? `${formatBalance(todayExpense)}` : `${formatBalance(monthData.Month_Expense)}`} <span className="text-red-500 text-sm font-semibold">+4%</span> </p>
                    </div>
                    <div className="p-3 rounded-xl border border-gray-300 my-auto">
                      <assets.LuBadgeAlert className="text-gray-800 text-[25px]" />
                    </div>
                  </div>
    
                  {active === 'today'? (
                    <div className='bg-white rounded-xl h-[150px] flex-1 shadow px-8 flex justify-between'>
                      <div>
                        <p className="font-semibold mt-8">{todayStatus >= 0? 'Surplus' : 'Deficit'}</p>
                        <p className={`text-3xl font-medium mt-4 ${todayStatus >= 0? 'text-green-500' : 'text-red-500'}`}>{todayStatus<0? `-$${formatBalance(todayStatus*-1)}` : `+$${formatBalance(todayStatus)}`}</p>
                      </div>
                      <div className="p-3 rounded-xl border border-gray-300 my-auto">
                        {todayStatus >= 0? <assets.LuBadgePlus className="text-gray-800 text-[25px]" /> : <assets.LuBadgeMinus className="text-gray-800 text-[30px]" />}
                      </div>
                    </div>
                  ) : (
                    <div className='bg-white rounded-xl h-[150px] flex-1 shadow px-8 flex justify-between'>
                      <div>
                        <p className="font-semibold mt-8">{monthData.Month_Total >= 0? 'Surplus' : 'Deficit'}</p>
                        <p className={`text-3xl font-medium mt-4 ${monthData.Month_Total >= 0? 'text-green-500' : 'text-red-500'}`}>{monthData.Month_Total<0? `-$${formatBalance(monthData.Month_Total*-1)}` : `+$${formatBalance(monthData.Month_Total)}`}</p>
                      </div>
                      <div className="p-3 rounded-xl border border-gray-300 my-auto">
                        {monthData.Month_Total >= 0? <assets.LuBadgePlus className="text-gray-800 text-[25px]" /> : <assets.LuBadgeMinus className="text-gray-800 text-[30px]" />}
                      </div>
                    </div>
                  )}
                </div>
              </div>
    
              {/* Total Balance and Spending Overview */}
              <div className='flex gap-6 mt-6'>
                <div className='flex-1 h-[300px] bg-white shadow rounded-lg p-6'>
                  <div className='flex justify-between'>
                    <div className='flex items-center gap-3'>
                      <div className='p-2 rounded-lg border border-gray-300'>
                        <assets.FaMoneyBills className='text-[#1a1f37]' />
                      </div>
                      <p className='font-semibold text-lg '>Total Balance</p>
                    </div>
                    <div className='p-2 rounded-lg border border-gray-300 cursor-pointer'>
                        <assets.BsThreeDots className='text-[#1a1f37]' />
                    </div>
                  </div>
                  <p className='text-4xl mt-4 font-medium'>${formatBalance(Balance)}</p>
    
                  <div className='bg-[#f5f7fb] px-3 py-2 rounded-md flex items-center justify-between mt-6'>
                    <div className='flex items-center gap-4'>
                      <img src={assets.card1} className='w-[40px] shadow' alt="card 1" />
                      <div>
                        <p className='font-medium'>${formatBalance((Balance/100)*33)}</p>
                        <p className='text-sm text-gray-400 font-light'>**** **** **** 3452</p>
                      </div>
                    </div>
                    <button className='text-[#65749e] bg-white border border-gray-200 rounded-md py-2 px-4 text-sm hover:text-indigo-600 smooth-transition'>Details</button>
                  </div>
                  <div className='bg-[#f5f7fb] px-3 py-2 rounded-md flex items-center justify-between mt-4'>
                    <div className='flex items-center gap-4'>
                      <img src={assets.card2} className='w-[40px] shadow' alt="card 1" />
                      <div>
                        <p className='font-medium'>${formatBalance((Balance/100)*67)}</p>
                        <p className='text-sm text-gray-400 font-light'>**** **** **** 1245</p>
                      </div>
                    </div>
                    <button className='text-[#65749e] bg-white border border-gray-200 rounded-md py-2 px-4 text-sm hover:text-indigo-600 smooth-transition'>Details</button>
                  </div>
                </div>
    
                <div className='flex-1 h-[300px] bg-white shadow rounded-lg p-6'>
                  <div className='flex justify-between'>
                    <div className='flex items-center gap-3'>
                      <div className='p-2 rounded-lg border border-gray-300'>
                        <assets.FaMoneyBills className='text-[#1a1f37]' />
                      </div>
                      <p className='font-semibold text-lg '>Spending Overview</p>
                    </div>
                    <div className='p-2 rounded-lg border border-gray-300 cursor-pointer'>
                        <assets.BsThreeDots className='text-[#1a1f37]' />
                    </div>
                  </div>
                  <div className='flex items-center justify-between mt-4'>
                    <p className='text-3xl font-medium'>${parseInt(totalSpending/1000)},{parseFloat(totalSpending%1000)}</p>
                    <p className='text-gray-500 text-sm font-semibold'>Of $10,000</p>
                  </div>
                  <div className='border border-gray-300 rounded-lg w-full h-[30px] p-1 flex gap-1 mt-6'>
                    <div className={`bg-indigo-600 h-[20px] rounded-md`} style={{ width: `${(top3expenses[0][1]/10000)*484}px` }}></div>
                    <div className={`bg-[#232b43] h-[20px] rounded-md`} style={{ width: `${(top3expenses[1][1]/10000)*484}px` }}></div>
                    <div className={`bg-[#1dadc3] h-[20px] rounded-md`} style={{ width: `${(top3expenses[2][1]/10000)*484}px` }}></div>
                    <div className='bg-[#eeeeee] h-[20px] rounded-md'></div>
                  </div>
    
                  {!isDataLoaded? (
                      <div className="flex flex-col items-center justify-center text-center mt-8">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150" width={70}>
                          <path fill="none" stroke="#5046E4" stroke-width="12" stroke-linecap="round" stroke-dasharray="300 385" stroke-dashoffset="0" d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z">
                            <animate attributeName="stroke-dashoffset" calcMode="spline" dur="2" values="685;-685" keySplines="0 0 1 1" repeatCount="indefinite"></animate>
                          </path>
                        </svg>
                        <p className="mt-2 text-sm">Fetching your data...</p>
                      </div>
                  ) : (
                    <div className='mt-4'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          <div className='w-[15px] h-[15px] rounded-md bg-indigo-600'></div>
                          <p className='text-gray-700 font-medium'>{top3expenses[0][0][0].toUpperCase() + top3expenses[0][0].slice(1)}</p>
                        </div>
                        <p className='font-semibold text-lg'>${top3expenses[0][1]}</p>
                      </div>
                      <div className='flex items-center justify-between mt-2'>
                        <div className='flex items-center gap-2'>
                          <div className='w-[15px] h-[15px] rounded-md bg-[#232b43]'></div>
                          <p className='text-gray-700 font-medium'>{top3expenses[1][0][0].toUpperCase() + top3expenses[1][0].slice(1)}</p>
                        </div>
                        <p className='font-semibold text-lg'>${top3expenses[1][1]}</p>
                      </div>
                      <div className='flex items-center justify-between mt-2'>
                        <div className='flex items-center gap-2'>
                          <div className='w-[15px] h-[15px] rounded-md bg-[#1dadc3]'></div>
                          <p className='text-gray-700 font-medium'>{top3expenses[2][0][0].toUpperCase() + top3expenses[2][0].slice(1)}</p>
                        </div>
                        <p className='font-semibold text-lg'>${top3expenses[2][1]}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
    
              {/* Next Sections and graphs */}
              <div>
                <div className="bg-white p-6 rounded-xl shadow mt-6">
                  <h3 className="text-xl font-semibold mb-4">Income and Expenses Overview (This Month)</h3>
                  <div className='w-full flex justify-center'>
                    <IncomeExpenseChart monthData={monthData} />
                  </div>
                </div>
              </div>
            </div>
        ) : (
            <div className="w-screen h-screen flex flex-col items-center justify-center text-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150" width={100}>
                <path fill="none" stroke="#5046E4" stroke-width="12" stroke-linecap="round" stroke-dasharray="300 385" stroke-dashoffset="0" d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z">
                  <animate attributeName="stroke-dashoffset" calcMode="spline" dur="2" values="685;-685" keySplines="0 0 1 1" repeatCount="indefinite"></animate>
                </path>
              </svg>
              <p className="mt-2">Fetching your data...</p>
            </div>
        )}

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard