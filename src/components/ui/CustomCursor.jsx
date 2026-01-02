'use client'
import React, { useEffect, useState, useRef } from 'react'

export function CursorFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const cursorRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorRef.current = { x: e.clientX, y: e.clientY }
      
      const target = e.target
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
      )
    }

    const animate = () => {
      setPosition(prev => ({
        x: prev.x + (cursorRef.current.x - prev.x) * 0.15,
        y: prev.y + (cursorRef.current.y - prev.y) * 0.15
      }))
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s'
        }}
      >
        <div
          className="rounded-full bg-white transition-all duration-200"
          style={{
            width: isPointer ? '40px' : '12px',
            height: isPointer ? '40px' : '12px',
            border: isPointer ? '2px solid white' : 'none',
            backgroundColor: isPointer ? 'transparent' : 'white'
          }}
        />
      </div>

      {/* Trailing cursor */}
      <div
        className="fixed pointer-events-none z-[9998] mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s, height 0.3s, opacity 0.3s'
        }}
      >
        <div
          className="rounded-full border-2 border-white"
          style={{
            width: isPointer ? '60px' : '40px',
            height: isPointer ? '60px' : '40px',
            opacity: isPointer ? 0.5 : 0.3
          }}
        />
      </div>
    </>
  )
}