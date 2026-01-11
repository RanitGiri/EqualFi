import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { ClerkProvider } from '@clerk/nextjs'




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata= {
  title: {
    default: 'EqualFi | Seamless Financial Management',
    template: '%s | EqualFi',
  },
  description: 'Manage your financial activities, credit, and assets with EqualFi—the secure, responsive web app for modern finance.',
  keywords: ['Financial Management', 'Next.js Finance App', 'Credit Management', 'EqualFi Dashboard'],
  authors: [{ name: 'EqualFi Team' }],
  openGraph: {
    title: 'EqualFi - Financial Management Simplified',
    description: 'A robust dashboard for your financial operations.',
    url: 'https://equalfi.online', 
    siteName: 'EqualFi',
    // images: [
    //   {
    //     url: '/og-image.png', // Create a 1200x630 image for social sharing
    //     width: 1200,
    //     height: 630,
    //   },
    // ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {

  return (
    <ClerkProvider
      signInUrl="/authn"
      signUpUrl="/authn"
      // Change these props to ensure the session is picked up
      fallbackRedirectUrl="/dashboard"
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
    >
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        
        {children}
        <Footer/>
      </body>
    </html>
    </ClerkProvider>
  );
}
