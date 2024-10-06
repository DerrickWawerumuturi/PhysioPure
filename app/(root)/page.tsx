'use client'
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import ArticleBox from "@/components/ArticleBox";
import Footer from "@/components/Footer";
import Bookmarks from "@/components/Bookmarks";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";


export default function Home() {
  const { theme } = useTheme()

  return (
    <div className="h-screen max-h-screen py-20 mx-auto text-center flex flex-col items-center max-w-3xl sm:overflow-x-hidden md:overflow-x-visible">
      <h1 className={cn("text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mt-7", {
        "text-red-500": theme === 'dark'
      })}>
        Empower Your Movement, Transform Your Health.
      </h1>
      <p className="mt-6 text-lg max-w-prose text-muted-foreground">
        Discover expert tips, treatments, and exercises
        designed to help you move better,live pain-free,
        and achieve lasting well-being.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Link
          href="/request-access"
          className={buttonVariants({ variant: "green" })}
        >
          Request Access
        </Link>
        <Link
          href="/articles"
          className={buttonVariants({ variant: "ghost" })}
        >
          Browse Articles
        </Link>
      </div>
      <div className="flex text-center mt-10 rounded-md">
        <Image
          src="/assets/images/PhysioExamples.png"
          alt="examples"
          width={1500}
          height={1500}
          className="w-full max-w-sm sm:max-w-xs md:max-w-md rounded-md"
        />
      </div>
      <div className={cn("flex gap-10 lg:pl-10 sm:mb-16 lg:mb-28 mt-36", {
        "text-green-400": theme === "dark"
      })}>
        <Bookmarks
          name="Exercise"
          description=" Explore inspiring stories from individuals who transformed their lives through innovative exercises, unlocking the key to mobility and strength"
          attribute="exercise"
        />
        <Bookmarks
          name="Personalized Plans"
          description="Discover firsthand accounts of tailored rehabilitation journeys that empowered individuals to reclaim their wellness and achieve their fitness goals"
          attribute="plans"
        />
        <Bookmarks
          name="Injury Prevention"
          description="Read about real-life challenges faced by individuals overcoming injuries and the strategies they used to prevent setbacks and promote healing."
          attribute="injury"
        />
      </div>
      <div className="mt-24 flex flex-col gap-2">
        <h2 className="font-bold sm:text-5xl lg:text-4xl antialiased tracking-tight sm:text-center lg:pl-3 pb-2 lg:pb-5">Latest <span className="sm:hidden lg:block">from the team</span></h2>
        <ArticleBox />
      </div>
      <div className="flex mt-10">
        <Link
          href="/all"
          className={buttonVariants({ variant: "ghost" })}
        >
          View All Posts
        </Link>
      </div>
      <div className="mt-14 pb-10 border-t-2 p-4 border-gray-100 align-middle">
        <Footer />
      </div>

    </div>
  );
}
