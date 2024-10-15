'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Categories, cn } from '@/lib/utils'
import { buttonVariants } from './ui/button'
import { Edit } from 'lucide-react'
import { ModeToggle } from './ModeToggle'
import { UserButton, useUser } from '@clerk/nextjs'
import MobileNav from './MobileNav'


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { user, isSignedIn } = useUser()

    return (
        <div className='shadow p-2 top-0'>
            <section className='mx-auto flex space-x-8 sm:justify-between lg:justify-around sm:ml-1 lg:ml-5 top-0'>
                <Link
                    href={"/"}
                    className='flex space-x-1 lg:-ml-32 sm:ml-0'
                >
                    <Image
                        src="/assets/images/physioIcon.png"
                        alt='home icon'
                        width={50}
                        height={50}
                    />
                    <h1 className='text-xl font-bold mt-3'>
                        PhysioPure
                    </h1>
                </Link>
                <MobileNav />
                <div className='sm:hidden lg:flex space-x-7 lg:pl-96 text-lg  text-gray-700 font-semibold mt-3'>

                    <div
                        className='min-w-[100px]'
                        onMouseEnter={() => setIsOpen(true)}
                        onMouseLeave={() => setIsOpen(false)}
                    >
                        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                            <DropdownMenuTrigger asChild className='focus:outline-0 focus:ring-0 focus-visible:ring-0 focus-visible::ring-offset-0'>
                                <h2 className="cursor-pointer">Categories</h2>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='min-w-0'>
                                <div className='grid grid-cols-2 gap-2 p-2'>
                                    {Categories.map((category, index) => (
                                        <DropdownMenuItem key={index}>
                                            <Link
                                                href={`/categories${category.url}`}
                                                className="text-sm font-normal"
                                            >
                                                {category.name}
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className={cn('flex space-x-5', {
                        "hidden": !isSignedIn
                    })}>
                        <Link href="/new-story" className={cn("flex gap-2 mr-5")}>
                            <Edit className="text-gray-600 mt-1" strokeWidth={1} />
                            <p className="text-gray-500">Write</p>
                        </Link>
                        <div>
                            <UserButton />
                        </div>
                    </div>
                    {!isSignedIn && (
                        <div className='flex space-x-7 -mt-2 lg:pl-5'>
                            <Link
                                href="/articles"
                                className={buttonVariants({ variant: "destructive" })}
                            >
                                Articles
                            </Link>
                            <Link
                                href="/blogs"
                                className={buttonVariants({ variant: "outline" })}
                            >
                                Blogs
                            </Link>
                        </div>
                    )}
                    <div className='-mt-1'>
                        <ModeToggle />
                    </div>

                </div>
            </section>
        </div>
    )
}

export default Navbar