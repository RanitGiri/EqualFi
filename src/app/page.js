'use client'
import AboutUs from "@/components/AboutUs";
import FeaturesSection from "@/components/Features";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/Howitworks";
import { CursorFollower } from "@/components/ui/CustomCursor";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import { useLenis } from "@/hooks/useLenis";
import Image from "next/image";

export default function Home() {
  useLenis();
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[#f2f4f8]">
      <CustomScrollbar />
      <CursorFollower />
      <Hero/>
      <AboutUs/>
      <HowItWorks/>
      <FeaturesSection/>
    </div>
  );
}
