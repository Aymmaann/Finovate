import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion' 
import Dashboard from './pages/Dashboard'
import Chatbot from './pages/Chatbot'
import Transaction from './pages/Transaction'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'

function App() {
  const location = useLocation(); 

  return (
    <div>
      <Routes location={location} key={location.pathname}> 
        <Route path='/' element={
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.3 }}
          >
            <Home />
          </motion.div>
        } />
        <Route path='/dashboard' element={
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.3 }}
          >
            <Dashboard />
          </motion.div>
        } />
        <Route path='/chatbot' element={
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.3 }}
          >
            <Chatbot />
          </motion.div>
        } />
        <Route path='/transaction' element={
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.3 }}
          >
            <Transaction />
          </motion.div>
        } />
        <Route path='/signin' element={
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.3 }}
          >
            <SignIn />
          </motion.div>
        } />
        <Route path='/signup' element={
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.3 }}
          >
            <SignUp />
          </motion.div>
        } />
      </Routes>
    </div>
  )
}

export default App
