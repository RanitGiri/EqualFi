
'use client'
import { Instrument_Serif } from 'next/font/google'
import React from 'react'
import { motion } from 'framer-motion'

const instr = Instrument_Serif({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-instr',
})

function AboutUs() {
  return (
    <div className='bg-[#f2f4f8] mt-[-10vh] h-[110vh] w-screen flex flex-col items-center justify-center'>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className='flex flex-col items-center'
        >
          <h1 className={`${instr.className} text-7xl text-[#1D2233] font-black mt-[25vh] text-center`}>
              About Us
          </h1>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '60%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className='h-1 bg-gradient-to-r from-transparent via-[#78a0ff] to-transparent mt-4 rounded-full'
          />
        </motion.div>

        <section className='w-full h-[60%] mt-[5vh] px-20 flex items-center justify-center'>
                <motion.div 
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                  className='h-full w-[50%] flex items-center text-left text-[#1D2233] font-medium text-lg leading-8 px-4'
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, ex. Sint assumenda recusandae aliquid cum facere voluptatibus praesentium dignissimos asperiores a, placeat dicta, consectetur, incidunt illum inventore impedit possimus iusto!
                    Possimus labore nihil temporibus minima sunt neque, deleniti fuga commodi qui, assumenda a, odio reiciendis quae quod. Pariatur exercitationem laudantium eos hic itaque maxime eius, tempore amet similique maiores perferendis?
                    Exercitationem eos architecto delectus doloribus earum illo cumque quam assumenda, dicta quia dolores iste reiciendis aperiam commodi sed excepturi dignissimos eveniet placeat voluptate! Aperiam omnis animi, culpa odit officia quidem.
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scaleY: 0 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                  className='h-[50%] w-[2px] bg-gradient-to-b from-transparent via-[#78a0ff] to-transparent mx-8 rounded-full'
                />

                <motion.div 
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                  className='h-full w-[50%] flex justify-center items-center'
                >
                    <div className='h-[80%] aspect-square drop-shadow-[0_10px_40px_rgba(120,160,255,0.3)]' style={{
                      backgroundImage: 'url("/aboutus.svg")',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      backgroundSize: 'contain'
                    }}>
                    </div>
                </motion.div>
        </section>
    </div>
  )
}

export default AboutUs