'use client'
import React from 'react'
import { motion } from 'framer-motion'

function HowItWorks() {
  return (
    <div className='relative bg-gradient-to-b h-[175vh] from-[#010514] to-[#0a1128] min-h-screen flex flex-col justify-center items-center overflow-hidden w-full rounded-3xl mt-10 shadow-2xl shadow-black z-20'>
      {/* Background Grid Pattern */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,rgba(120,160,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,160,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none'></div>

      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.5 }}
        className='text-center mb-12 max-w-3xl relative z-10'
      >
        <h2 className='text-4xl md:text-5xl font-extrabold text-[#f2f4f8] tracking-tight drop-shadow-[0_4px_20px_rgba(120,160,255,0.3)]'>
          3 Simple Steps to Credit Access
        </h2>
        <p className='text-[#a0b0d0] mt-4 text-lg font-medium'>
          Leverage your digital income with AI-powered credit assessment through Welliptic MCP
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div className='relative w-[85%] md:w-[55%] mt-4 z-10'>
        
        {/* Growing line animation */}
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          viewport={{ once: true, amount: 0.3 }}
          className='absolute left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-[#78a0ff] to-[#4d7fd9] rounded-full shadow-[0_0_20px_rgba(120,160,255,0.5)] origin-top'
        ></motion.div>

        {/* Step Items */}
        <div className='flex flex-col items-center relative z-10'>

          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
            className='w-full flex md:justify-start justify-center mb-20'
          >
            <div className='md:w-1/2 bg-[#0f1a2e]/80 backdrop-blur-md p-6 rounded-2xl shadow-[0_8px_30px_rgba(120,160,255,0.2)] border border-[#78a0ff]/20 -m-4'>
              <h3 className='text-[#78a0ff] font-black text-xl mb-2'>Step 1 — Connect Your Digital Income</h3>
              <p className='text-[#a0b0d0]'>
                Link your freelance platforms, gig economy accounts, and digital payment histories. Our multi-agent system securely analyzes your income streams using Welliptic MCP.
              </p>
            </div>
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 150 }}
              viewport={{ once: true, amount: 0.5 }}
              className='absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-[#78a0ff] rounded-full shadow-[0_0_20px_rgba(120,160,255,0.6)] border-2 border-[#010514]'
            ></motion.div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
            className='w-full flex md:justify-end justify-center mb-20'
          >
            <div className='md:w-1/2 bg-[#0f1a2e]/80 backdrop-blur-md p-6 rounded-2xl shadow-[0_8px_30px_rgba(120,160,255,0.2)] border border-[#78a0ff]/20 text-right -m-4'>
              <h3 className='text-[#78a0ff] font-black text-xl mb-2'>Step 2 — AI Credit Assessment</h3>
              <p className='text-[#a0b0d0]'>
                Our intelligent agents process your data through Welliptic's MCP framework, evaluating creditworthiness based on digital income patterns, transaction consistency, and earning trends.
              </p>
            </div>
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 1.0, type: 'spring', stiffness: 150 }}
              viewport={{ once: true, amount: 0.5 }}
              className='absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-[#5c8be6] rounded-full shadow-[0_0_20px_rgba(92,139,230,0.6)] border-2 border-[#010514]'
            ></motion.div>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
            className='w-full flex md:justify-start justify-center'
          >
            <div className='md:w-1/2 bg-[#0f1a2e]/80 backdrop-blur-md p-6 rounded-2xl shadow-[0_8px_30px_rgba(120,160,255,0.2)] border border-[#78a0ff]/20 -m-4'>
              <h3 className='text-[#78a0ff] font-black text-xl mb-2'>Step 3 — Get Instant Credit Offers</h3>
              <p className='text-[#a0b0d0]'>
                Receive personalized credit offers from our partner lenders. Choose the best terms for your needs and get funded quickly — all powered by transparent AI decision-making.
              </p>
            </div>
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 1.2, type: 'spring', stiffness: 150 }}
              viewport={{ once: true, amount: 0.5 }}
              className='absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-[#4d7fd9] rounded-full shadow-[0_0_20px_rgba(77,127,217,0.6)] border-2 border-[#010514]'
            ></motion.div>
          </motion.div>

        </div>
      </div>

      {/* Tagline */}
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        className='text-[#78a0ff] mt-16 text-lg italic font-medium text-center drop-shadow-[0_2px_10px_rgba(120,160,255,0.3)] relative z-10'
      >
        Your digital income is your credit history — unlock opportunities with AI-powered trust.
      </motion.p>
    </div>
  )
}

export default HowItWorks