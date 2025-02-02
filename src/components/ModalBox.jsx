import React, { useState } from 'react'
import assets from "../assets/assets.js"

const ModalBox = ({ setIsModalOpen, budgets, setBudgets }) => {
  const [budgetCategory, setBudgetCategory] = useState('')
  const [budgetAmt, setBudgetAmt] = useState(0)
  const [isCategoryEmpty, setIsCategoryEmpty] = useState(false)
  const [isAmountEmpty, setIsAmountEmpty] = useState(false)

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(budgetCategory!=='' && budgetAmt>0) {
      setBudgets([...budgets, {category: budgetCategory, amount: budgetAmt}])
      setIsCategoryEmpty(false)
      setIsAmountEmpty(false)
      setIsModalOpen(false)
    }
    if(budgetCategory === '') {
      setIsCategoryEmpty(true)
    }
    if(budgetAmt <= 0) {
      setIsAmountEmpty(true)
    }
  }

  return (
    <div className='bg-white w-full p-6 outline-none'>
        <div className='w-full flex justify-between items-center'>
          <p className='text-[20px] font-semibold'>Create New Budget</p>
          <div className='p-2 hover:text-[#5046e4] rounded-full smooth-transition'>
            <assets.IoCloseSharp className=' cursor-pointer text-[24px]' onClick={closeModal} />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <p className='mt-8 font-medium ml-1'>Budget Name</p>
          <input type="text" placeholder='e.g. Home decor' 
                className='outline-none border w-full border-gray-300 py-2 px-4 rounded-md mt-2' 
                onChange={(e) => setBudgetCategory(e.target.value)}
          />
          <p className='text-sm text-red-500 mt-1.5 ml-1'>{isCategoryEmpty? 'Category cannot be empty' : ''}</p>

          <p className='mt-6 font-medium ml-1'>Budget Amount</p>
          <input type="number" placeholder='e.g. $5000'
                className='outline-none border w-full border-gray-300 py-2 px-4 rounded-md mt-2' 
                onChange={(e) => setBudgetAmt(e.target.value)}
          />
          <p className='text-sm text-red-500 mt-1.5 ml-1'>{isAmountEmpty? 'Amount should be greater than 0' : ''}</p>

          <button
            className="smooth-transition w-full rounded-md cursor-pointer bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-8"
            type="submit"
          >
            Create Budget
          </button>
        </form> 
    </div>
  )
}

export default ModalBox