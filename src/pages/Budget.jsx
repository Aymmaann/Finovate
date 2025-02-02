import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import assets from "../assets/assets.js" 
import Modal from 'react-modal';
import ModalBox from '../components/ModalBox.jsx'
import BudgetComponent from '../components/BudgetComponent.jsx';

const Budget = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [budgets, setBudgets] = useState([])

  return (
    <div className='flex'>
      <Sidebar />

      <div className='ml-64 flex-grow'>
        <Navbar />

        {/* Background Gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        {/* Main Content */}
        <div className='p-10'>
          <h1 className="text-4xl font-semibold text-gray-900">My Budgets</h1>

          {/* Budget Card Section */}
          <div className='flex flex-wrap gap-5 mt-10'>
            <div className='rounded-xl bg-white border border-gray-300 border-dashed shadow w-[330px] h-[200px] p-12'>
              <div 
                className="hover:bg-[#f3dff4] rounded-full p-3 w-[50px] mx-auto cursor-pointer smooth-transition"
                onClick={() => setIsModalOpen(true)}
              >
                <assets.FaPlus className="text-[26px]" />
              </div>
              <p className="text-center mt-4">Create new budget</p>
            </div>
            {budgets.length>0 && budgets.map((budget,index) => (
              <BudgetComponent category={budget.category} amount={budget.amount} key={index} />
            ))}
          </div>
        </div>

        {/* Modal */}
        <Modal 
            isOpen={isModalOpen}
            onRequestClose={() => {}}
            style={{
                overlay: {
                    backgroundColor: "rgba(0,0,0,0.6)",
                },
            }}
            ariaHideApp={false}
            contentLabel=""
            className="w-[33%] max-h-3/4 border-[1px] border-zinc-800 bg-blackbg rounded-xl mx-auto mt-44 overflow-scroll outline-none" 
        >
          <ModalBox setIsModalOpen={setIsModalOpen} budgets={budgets} setBudgets={setBudgets} />
        {/* <AddEditNotes
            type={openAddEditModal.type}
            noteData={openAddEditModal.data}
            onClose={() => {
                setOpenAddEditModal({ isShown: false, type: "add", data: null })
            }}
            getAllNotes={getAllNotes}
            showToastMessage={showToastMessage}
        /> */}
        </Modal> 



        {/* Another Background Gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  )
}

export default Budget
