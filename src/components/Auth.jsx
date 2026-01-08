'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Zap, TrendingUp, Lock, Check } from 'lucide-react'
import { useSignIn, useSignUp, useAuth, useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

function LoginSignupPage() {
  const router = useRouter()
  const { isSignedIn, isLoaded: authLoaded } = useAuth()
  const clerk = useClerk()
  const { signIn, isLoaded: signInLoaded, setActive: setSignInActive } = useSignIn()
  const { signUp, isLoaded: signUpLoaded, setActive: setSignUpActive } = useSignUp()
  
  const [verificationCode, setVerificationCode] = useState('')
  const [needsVerification, setNeedsVerification] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [activeFeature, setActiveFeature] = useState(0)
  const [particlePositions, setParticlePositions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [debugInfo, setDebugInfo] = useState('')

  // Redirect if already signed in
  useEffect(() => {
    if (authLoaded && isSignedIn) {
      console.log('User is signed in, redirecting...')
      window.location.href = '/dashboard'
    }
  }, [isSignedIn, authLoaded])

  const features = [
    {
      icon: Zap,
      title: "Instant Credit Access",
      description: "Get approved in minutes with AI-powered credit assessment",
      color: "#78a0ff"
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your data is encrypted and protected with military-grade security",
      color: "#5c8be6"
    },
    {
      icon: TrendingUp,
      title: "Digital Income = Credit",
      description: "Transform your freelance and gig income into trusted credit history",
      color: "#4d7fd9"
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Your information is never shared without your explicit consent",
      color: "#78a0ff"
    }
  ]

  const OAUTH_PROVIDERS = {
    Google: 'oauth_google',
    GitHub: 'oauth_github',
    Apple: 'oauth_apple',
  }

  const oauthLogin = async (strategy) => {
    if (!signIn || !strategy) return;
    
    try {
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: '/authn/sso-callback',
        redirectUrlComplete: '/dashboard',
      });
    } catch (err) {
      console.error('OAuth error:', err)
      setError('Authentication failed. Please try again.')
    }
  };

  useEffect(() => {
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 15
    }))
    setParticlePositions(particles)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleLogin = async (e) => {
    e?.preventDefault()
    if (!signInLoaded || isLoading) return
    
    setError('')
    setIsLoading(true)

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      })

      console.log('Login result:', result)

      if (result.status === 'complete') {
        await setSignInActive({ session: result.createdSessionId })
        console.log('Session activated, redirecting...')
        
        // Use clerk's navigation
        await clerk.setActive({ session: result.createdSessionId })
        
        // Small delay then hard redirect
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 500)
      } else {
        setError('Login incomplete. Please try again.')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError(err.errors?.[0]?.message || err.errors?.[0]?.longMessage || 'Invalid email or password.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e) => {
    e?.preventDefault()
    if (!signUpLoaded || isLoading) return
    
    setError('')
    setIsLoading(true)

    try {
      const result = await signUp.create({
        emailAddress: email,
        password,
        firstName: fullName.split(' ')[0] || 'User',
        lastName: fullName.split(' ').slice(1).join(' ') || '',
      })

      console.log('Signup result:', result)

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      })

      setNeedsVerification(true)
      setError('')
      setDebugInfo(`Verification email sent to ${email}`)
    } catch (err) {
      console.error('Signup error:', err)
      setError(err.errors?.[0]?.message || err.errors?.[0]?.longMessage || 'Signup failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerify = async (e) => {
    e?.preventDefault()
    if (!signUpLoaded || isLoading) return
    
    setError('')
    setDebugInfo('')
    setIsLoading(true)

    try {
      console.log('Attempting verification with code:', verificationCode)
      
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      })

      console.log('Full verification result:', JSON.stringify(completeSignUp, null, 2))
      setDebugInfo(`Status: ${completeSignUp.status}`)

      if (completeSignUp.status === 'complete') {
        console.log('Verification complete!')
        console.log('Created session ID:', completeSignUp.createdSessionId)
        
        if (!completeSignUp.createdSessionId) {
          console.error('No session ID in response!')
          setError('Session creation failed. Please try logging in instead.')
          setIsLoading(false)
          return
        }

        // Method 1: Use clerk directly
        console.log('Setting active session via clerk...')
        await clerk.setActive({ session: completeSignUp.createdSessionId })
        
        console.log('Waiting for session to sync...')
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Check if we're now signed in
        console.log('Auth state after setActive:', { 
          isSignedIn: clerk.session !== null,
          sessionId: clerk.session?.id
        })
        
        if (clerk.session) {
          console.log('Session confirmed, redirecting...')
          window.location.href = '/dashboard'
        } else {
          console.error('Session not found after setActive!')
          setError('Authentication succeeded but session not created. Please try logging in.')
          
          // Try to log them in automatically
          setTimeout(() => {
            setNeedsVerification(false)
            setIsLogin(true)
            setError('Please log in with your new account.')
          }, 2000)
        }
      } else if (completeSignUp.status === 'missing_requirements') {
        setError('Additional information required. Status: ' + completeSignUp.status)
        console.log('Missing requirements:', completeSignUp)
      } else {
        setError(`Verification status: ${completeSignUp.status}. Please try again.`)
        console.log('Unexpected status:', completeSignUp.status)
      }
    } catch (err) {
      console.error('Verification error:', err)
      console.error('Error details:', JSON.stringify(err, null, 2))
      setError(err.errors?.[0]?.message || err.errors?.[0]?.longMessage || 'Invalid verification code.')
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading while checking auth status
  if (!authLoaded) {
    return (
      <div className="min-h-screen bg-[#010514] flex items-center justify-center">
        <div className="text-[#78a0ff] text-xl">Loading...</div>
      </div>
    )
  }

  if (isSignedIn) {
    return (
      <div className="min-h-screen bg-[#010514] flex items-center justify-center">
        <div className="text-[#78a0ff] text-xl">Redirecting to dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#010514] flex overflow-hidden relative pt-10">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-black text-[#78a0ff] mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              EQUALFI
            </h1>
            <p className="text-[#a0b0d0] text-sm">Equal Access to Financial Opportunities</p>
          </motion.div>

          {!needsVerification && (
            <div className="flex gap-2 mb-8 bg-[#0f1a2e] p-1 rounded-xl">
              <button
                onClick={() => {
                  setIsLogin(true)
                  setError('')
                  setDebugInfo('')
                }}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  isLogin
                    ? 'bg-[#78a0ff] text-white shadow-[0_0_20px_rgba(120,160,255,0.4)]'
                    : 'text-[#a0b0d0] hover:text-white'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => {
                  setIsLogin(false)
                  setError('')
                  setDebugInfo('')
                }}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  !isLogin
                    ? 'bg-[#78a0ff] text-white shadow-[0_0_20px_rgba(120,160,255,0.4)]'
                    : 'text-[#a0b0d0] hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>
          )}

          {debugInfo && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 text-sm"
            >
              {debugInfo}
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={needsVerification ? 'verify' : (isLogin ? 'login' : 'signup')}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0f1a2e]/50 backdrop-blur-md p-8 rounded-2xl border border-[#78a0ff]/20"
            >
              {needsVerification ? (
                <form onSubmit={handleVerify} className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">Check Your Email</h3>
                    <p className="text-[#a0b0d0] text-sm">
                      We've sent a verification code to <span className="text-[#78a0ff]">{email}</span>
                    </p>
                  </div>

                  <div>
                    <label className="block text-[#a0b0d0] mb-2 text-sm font-medium">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      placeholder="000000"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      maxLength={6}
                      autoFocus
                      className="w-full px-4 py-3 bg-[#010514] border border-[#78a0ff]/30 rounded-xl text-white placeholder-[#a0b0d0]/50 focus:border-[#78a0ff] focus:outline-none focus:ring-2 focus:ring-[#78a0ff]/20 transition-all tracking-widest text-center text-2xl"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || verificationCode.length !== 6}
                    className="w-full py-4 bg-[#78a0ff] hover:bg-[#5c8be6] text-white font-bold rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(120,160,255,0.3)] hover:shadow-[0_6px_30px_rgba(120,160,255,0.5)] hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {isLoading ? 'Verifying...' : 'Verify Email'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setNeedsVerification(false)
                      setVerificationCode('')
                      setError('')
                      setDebugInfo('')
                    }}
                    className="w-full py-2 text-[#a0b0d0] hover:text-white transition-all text-sm"
                  >
                    ← Back to Sign Up
                  </button>
                </form>
              ) : isLogin ? (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-[#a0b0d0] mb-2 text-sm font-medium">Email</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-[#010514] border border-[#78a0ff]/30 rounded-xl text-white placeholder-[#a0b0d0]/50 focus:border-[#78a0ff] focus:outline-none focus:ring-2 focus:ring-[#78a0ff]/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[#a0b0d0] mb-2 text-sm font-medium">Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-[#010514] border border-[#78a0ff]/30 rounded-xl text-white placeholder-[#a0b0d0]/50 focus:border-[#78a0ff] focus:outline-none focus:ring-2 focus:ring-[#78a0ff]/20 transition-all"
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center text-[#a0b0d0] cursor-pointer">
                      <input type="checkbox" className="mr-2 accent-[#78a0ff]" />
                      Remember me
                    </label>
                    <a href="#" className="text-[#78a0ff] hover:underline">Forgot password?</a>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-[#78a0ff] hover:bg-[#5c8be6] text-white font-bold rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(120,160,255,0.3)] hover:shadow-[0_6px_30px_rgba(120,160,255,0.5)] hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#78a0ff]/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-[#0f1a2e]/50 text-[#a0b0d0]">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {['Google', 'GitHub', 'Apple'].map((provider) => (
                      <button
                        key={provider}
                        type="button"
                        onClick={() => oauthLogin(OAUTH_PROVIDERS[provider])}
                        className="py-3 px-4 bg-[#010514] border border-[#78a0ff]/30 rounded-xl text-[#a0b0d0] hover:border-[#78a0ff] hover:text-white transition-all duration-300 text-sm font-medium"
                      >
                        {provider}
                      </button>
                    ))}
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSignup} className="space-y-6">
                  <div>
                    <label className="block text-[#a0b0d0] mb-2 text-sm font-medium">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-[#010514] border border-[#78a0ff]/30 rounded-xl text-white placeholder-[#a0b0d0]/50 focus:border-[#78a0ff] focus:outline-none focus:ring-2 focus:ring-[#78a0ff]/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[#a0b0d0] mb-2 text-sm font-medium">Email</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-[#010514] border border-[#78a0ff]/30 rounded-xl text-white placeholder-[#a0b0d0]/50 focus:border-[#78a0ff] focus:outline-none focus:ring-2 focus:ring-[#78a0ff]/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[#a0b0d0] mb-2 text-sm font-medium">Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                      className="w-full px-4 py-3 bg-[#010514] border border-[#78a0ff]/30 rounded-xl text-white placeholder-[#a0b0d0]/50 focus:border-[#78a0ff] focus:outline-none focus:ring-2 focus:ring-[#78a0ff]/20 transition-all"
                    />
                  </div>

                  <label className="flex items-start text-[#a0b0d0] text-sm cursor-pointer">
                    <input type="checkbox" required className="mr-2 mt-1 accent-[#78a0ff]" />
                    <span>I agree to the <a href="#" className="text-[#78a0ff] hover:underline">Terms of Service</a> and <a href="#" className="text-[#78a0ff] hover:underline">Privacy Policy</a></span>
                  </label>

                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-[#78a0ff] hover:bg-[#5c8be6] text-white font-bold rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(120,160,255,0.3)] hover:shadow-[0_6px_30px_rgba(120,160,255,0.5)] hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#78a0ff]/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-[#0f1a2e]/50 text-[#a0b0d0]">Or sign up with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {['Google', 'GitHub', 'Apple'].map((provider) => (
                      <button
                        key={provider}
                        type="button"
                        onClick={() => oauthLogin(OAUTH_PROVIDERS[provider])}
                        className="py-3 px-4 bg-[#010514] border border-[#78a0ff]/30 rounded-xl text-[#a0b0d0] hover:border-[#78a0ff] hover:text-white transition-all duration-300 text-sm font-medium"
                      >
                        {provider}
                      </button>
                    ))}
                  </div>
                </form>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="hidden lg:flex w-1/2 relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,160,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,160,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />

        {particlePositions.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#78a0ff]"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="relative z-10 max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-32 h-32 mx-auto mb-8 relative"
                >
                  <div 
                    className="absolute inset-0 rounded-full opacity-20 blur-xl"
                    style={{ backgroundColor: features[activeFeature].color }}
                  />
                  <div
                    className="absolute inset-0 rounded-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${features[activeFeature].color}40, ${features[activeFeature].color}10)`,
                      border: `2px solid ${features[activeFeature].color}60`,
                      boxShadow: `0 0 40px ${features[activeFeature].color}40`
                    }}
                  >
                    {React.createElement(features[activeFeature].icon, {
                      className: "w-16 h-16",
                      style: { color: features[activeFeature].color }
                    })}
                  </div>
                </motion.div>

                <h3 className="text-4xl font-bold text-white mb-4 text-center">
                  {features[activeFeature].title}
                </h3>
                <p className="text-[#a0b0d0] text-lg text-center leading-relaxed">
                  {features[activeFeature].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-3 mb-12">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveFeature(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeFeature ? 'w-12 bg-[#78a0ff]' : 'w-2 bg-[#78a0ff]/30'
                }`}
              />
            ))}
          </div>

          <div className="space-y-4">
            {[
              "No traditional credit history required",
              "Instant approval decisions",
              "Transparent AI-powered assessment",
              "Secure data handling with encryption"
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-3 text-[#a0b0d0]"
              >
                <div className="w-6 h-6 rounded-full bg-[#78a0ff]/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-[#78a0ff]" />
                </div>
                <span>{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="absolute top-10 right-10 w-40 h-40 border-2 border-[#78a0ff]/20 rounded-full" />
        <div className="absolute bottom-10 left-10 w-60 h-60 border-2 border-[#78a0ff]/20 rounded-full" />
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap');
      `}</style>
    </div>
  )
}

export default LoginSignupPage