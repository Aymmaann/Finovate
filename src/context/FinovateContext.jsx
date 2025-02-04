import { createContext, useContext, useEffect, useState } from "react"
import jsonData from "../data/data.json"

const FinovateContext = createContext()

export const FinanceProvider = ({ children }) => {
    const [monthData, setMonthData] = useState({});
    const [todaysData, setTodaysData] = useState({});
    const [todayIncome, setTodayIncome] = useState(0);
    const [todayExpense, setTodayExpense] = useState(0);
    const [todayStatus, setTodayStatus] = useState(0);
    const [todayDate, setTodayDate] = useState(formatDate(new Date()));
    const [expenseTotals, setExpenseTotals] = useState({});
    const [budgets,setBudgets] = useState([])
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    
    useEffect(() => {
        const interval = setInterval(() => {
          const newDate = formatDate(new Date())
          if(newDate !== todayDate) {
            setTodayDate(newDate)
          }
        }, 60000);
    }, [todayDate])

    useEffect(() => {
        const [day, month, year] = todayDate.split('/')
        const monthYear = `${month}/${year}`
        const currentMonthData = jsonData[monthYear];
        
        if (currentMonthData) {
          setMonthData(currentMonthData);
          const todayData = currentMonthData[todayDate];
          if (todayData) {
            setTodaysData(todayData);
          } else {
            console.log('No data available for today:', todayDate);
          }
        } else {
          console.log('No data available for this month:', month);
        }
    }, [todayDate])

    useEffect(() => {
        if (todaysData) {
          const income = todaysData.Income?.Income_total || 0;
          const expense = todaysData.Expense?.Expense_total || 0;
    
          setTodayIncome(income)
          setTodayExpense(expense)
          setTodayStatus(income-expense)
          
        }
    }, [todaysData])

    useEffect(() => {
      if(monthData) {
        const totals = {}
        Object.keys(monthData).forEach((dayKey) => {
            const day = monthData[dayKey]
            const expenseCategories = day.Expense?.category
            
            if(expenseCategories) {
                Object.keys(expenseCategories).forEach((category) => {
                    if(totals[category]) {
                        totals[category] += expenseCategories[category]
                    } else {
                        totals[category] = expenseCategories[category]
                    }
                })
            }
        })
        setExpenseTotals(totals);
        setIsDataLoaded(true);
      }
    }, [monthData])

    if (!isDataLoaded) {
      return (
        <div className="w-screen h-screen flex flex-col items-center justify-center text-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150" width={100}>
            <path fill="none" stroke="#5046E4" stroke-width="12" stroke-linecap="round" stroke-dasharray="300 385" stroke-dashoffset="0" d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z">
              <animate attributeName="stroke-dashoffset" calcMode="spline" dur="2" values="685;-685" keySplines="0 0 1 1" repeatCount="indefinite"></animate>
            </path>
          </svg>
          <p className="mt-2">Fetching your data...</p>
        </div>

      )
  }
    

    return (
        <FinovateContext.Provider value = {{
            monthData,
            todaysData,
            todayIncome,
            todayExpense,
            todayStatus,
            todayDate,
            expenseTotals,
            budgets, setBudgets,
            isDataLoaded
        }}>
            {children}
        </FinovateContext.Provider>
    )
}

export const useFinance = () => useContext(FinovateContext)

export const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
};