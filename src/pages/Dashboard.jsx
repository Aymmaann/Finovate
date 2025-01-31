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
  const { monthData, 
          todaysData, 
          todayIncome, 
          todayExpense, 
          todayStatus } = useFinance()
  
  return (
    <div className='flex'>
      <Sidebar />

      <div className='ml-64 flex-grow'>
        <Navbar />

        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"/>
        </div>

        {/* Dashboard Content */}
        <div className="p-10">
          {/* Intro */}
          <div>
            <h1 className="text-4xl font-semibold text-gray-900">Hi, Mark Johnson</h1>
            <p className="text-gray-700">Here's an overview of your finances—let's take control of your expenses!</p>
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
            <div className="w-full flex items-center gap-11 mt-4">
              <div className="bg-white rounded-xl h-[150px] flex-1 shadow px-8 flex justify-between">
                <div className="">
                  <p className="font-semibold mt-8">{ active === 'today' ? "Today's income" : "Monthly Income"}</p>
                  <p className="text-3xl font-bold mt-4">${ active === 'today' ? `${todayIncome}` : `${monthData.Month_Income}`} <span className="text-green-500 text-sm font-semibold">+2%</span></p>
                </div>
                <div className="p-3 rounded-xl bg-[#f3dff4] my-auto">
                  <assets.LuBadgeCheck className="text-gray-800 text-[30px]" />
                </div>
              </div>

              <div className="bg-white rounded-xl h-[150px] flex-1 shadow px-8 flex justify-between">
                <div>
                  <p className="font-semibold mt-8">{ active === 'today' ? "Today's expense" : "Monthly expense"}</p>
                  <p className="text-3xl font-bold mt-4">${ active === 'today' ? `${todayExpense}` : `${monthData.Month_Expense}`} <span className="text-red-500 text-sm font-semibold">+4%</span> </p>
                </div>
                <div className="p-3 rounded-xl bg-[#f3dff4] my-auto">
                  <assets.LuBadgeAlert className="text-gray-800 text-[30px]" />
                </div>
              </div>

              {active === 'today'? (
                <div className='bg-white rounded-xl h-[150px] flex-1 shadow px-8 flex justify-between'>
                  <div>
                    <p className="font-semibold mt-8">{todayStatus >= 0? 'Surplus' : 'Deficit'}</p>
                    <p className={`text-3xl font-bold mt-4 ${todayStatus >= 0? 'text-green-500' : 'text-red-500'}`}>{todayStatus<0? `-$${todayStatus*-1}` : `+$${todayStatus}`}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#f3dff4] my-auto">
                    {todayStatus >= 0? <assets.LuBadgePlus className="text-gray-800 text-[30px]" /> : <assets.LuBadgeMinus className="text-gray-800 text-[30px]" />}
                  </div>
                </div>
              ) : (
                <div className='bg-white rounded-xl h-[150px] flex-1 shadow px-8 flex justify-between'>
                  <div>
                    <p className="font-semibold mt-8">{monthData.Month_Total >= 0? 'Surplus' : 'Deficit'}</p>
                    <p className={`text-3xl font-bold mt-4 ${monthData.Month_Total >= 0? 'text-green-500' : 'text-red-500'}`}>{monthData.Month_Total<0? `-$${monthData.Month_Total*-1}` : `+$${monthData.Month_Total}`}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#f3dff4] my-auto">
                    {monthData.Month_Total >= 0? <assets.LuBadgePlus className="text-gray-800 text-[30px]" /> : <assets.LuBadgeMinus className="text-gray-800 text-[30px]" />}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Next Sections and graphs */}
          <div>
            <div className="bg-white p-6 rounded-xl shadow mt-8">
              <h3 className="text-xl font-semibold mb-4">Income vs Expense</h3>
              <IncomeExpenseChart monthData={monthData} />
            </div>
            <div className="mt-10">
              <h2 className="text-3xl font-semibold text-gray-900">Financial Overview</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
                {/* <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Income vs Expense</h3>
                  <IncomeExpenseChart monthData={monthData} />
                </div> */}

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Expense Breakdown</h3>
                  {/* <ExpenseCategoryPieChart todaysData={todaysData} /> */}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Savings Progress</h3>
                  {/* <SavingsProgressBarChart savingsData={[monthData.Savings, monthData.Savings_Target]} /> */}
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Debt vs Savings</h3>
                  {/* <DebtVsSavingsChart debt={monthData.Debt} savings={monthData.Savings} /> */}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg mt-8">
                <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
                {/* <RecentTransactions transactions={monthData.Transactions} /> */}
              </div>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard