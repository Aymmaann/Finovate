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

    return (
        <FinovateContext.Provider value = {{
            monthData,
            todaysData,
            todayIncome,
            todayExpense,
            todayStatus,
            todayDate,
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