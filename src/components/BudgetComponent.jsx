import React, { useContext, useEffect, useState } from 'react'
import { useFinance } from '../context/FinovateContext'

const BudgetComponent = ({ category, amount }) => {
  const { expenseTotals } = useFinance()

  useEffect(() => {
    console.log(expenseTotals);
  }, [expenseTotals])

  const getLength = (usedBudget, budget) => {
    if(usedBudget >= budget) {
        return 100;
    } else {
        return (usedBudget / budget) * 100
    }
  }

  const usedBudget = expenseTotals[category.toLocaleLowerCase()] || 0;

  return (
    <div className='rounded-xl bg-white border border-gray-300 shadow  h-[200px] p-6'>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold text-gray-800">{category}</p>
          <p className="text-2xl font-semibold text-indigo-600">${amount}</p>
        </div>

        {/* Divider Line */}
        <div className="border-t border-gray-200 mt-4 mb-6"></div>

        {/* Bottom Section - Additional Info */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <p className="text-gray-500">Total Budget</p>
          <p className="text-gray-700 font-semibold">${amount}</p>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
          <p className="text-gray-500">Budget Used</p>
          <p className="text-gray-700 font-semibold">${usedBudget}</p>
        </div>
        <div className='h-[8px] w-full rounded-xl bg-gray-400 mt-5'>
            <div className="bg-[#5046e4] h-[8px] rounded-xl" style={{ width: `${getLength(usedBudget,amount)}%` }}></div>
        </div>
    </div>
  )
}

export default BudgetComponent