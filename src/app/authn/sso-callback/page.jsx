// app/authn/sso-callback/page.tsx
'use client'

import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function SSOCallback() {
  const router = useRouter()
  
  return (
    <AuthenticateWithRedirectCallback
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
      signInForceRedirectUrl='/dashboard'
      signUpForceRedirectUrl='/dashboard'
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
    />
  )
}