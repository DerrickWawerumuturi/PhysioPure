'use client'

import { logoutUser } from "@/lib/auth"
import { Categories } from "@/lib/utils"
import { SignedOut, useUser } from "@clerk/nextjs"
import { BookA, BookHeadphones, BookOpenCheck, LogOut, Menu, NotebookTabs, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"


const MobileNav = () => {
    const { user, isSignedIn } = useUser()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [showList, setShowList] = useState<boolean>(false)
    const pathname = usePathname()

    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    const closeOnCurrent = (href: string) => {
        if (pathname === href) {
            setIsOpen(false)
        }
    }

    const toogleCategories = (href: string) => {
        closeOnCurrent(href)
        setShowList(!showList)
    }


    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden")
        } else {
            document.body.classList.remove("overflow-hidden")
        }
    }, [isOpen])

    if (!isOpen) {
        return (
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
            >
                <Menu className="h-6 w-6" aria-hidden='true' />
            </button>
        )
    }
    return (
        <div>
            <div className='relative z-40 lg:hidden'>
                <div className='fixed inset-0 bg-black bg-opacity-25' />
            </div>

            <div className='fixed  overscroll-y-none  overscroll-x-none inset-0 z-40 flex'>
                <div className='w-4/5'>
                    <div className='relative flex w-full max-w-sm flex-col overflow-y-auto bg-white pb-6 shadow-xl'>
                        <div className='flex px-4 pb-6 pt-5'>
                            <button
                                type='button'
                                onClick={() => setIsOpen(false)}
                                className='relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'>
                                <X className='h-6 w-6' aria-hidden='true' />
                            </button>
                        </div>

                        <div className='mt-2 flex flex-col gap-2'>
                            <div className="flex flex-col space-y-4 ml-1">
                                <button
                                    type="button"
                                    onClick={() => toogleCategories("/categories")}
                                    className="-m-2 flex p-2 font-medium text-gray-900"
                                >
                                    <NotebookTabs className="h-6 w-6" />
                                    <span className="pl-2">Categories</span>
                                </button>
                                {showList && (
                                    <ul className="grid grid-cols-2 gap-y-1 gap-x-1 border border-gray-400 rounded-lg p-4">
                                        {Categories.map((category, index) => (
                                            <li key={index} className="">
                                                <Link
                                                    href={`/categories${category.url}`}
                                                >
                                                    <span className="text-sm font-medium text-gray-900 hover:text-blue-500 hover:text-md">{category.name}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <Link
                                    onClick={() => closeOnCurrent('/articles')}
                                    href='/articles'
                                    className="-m-2 flex p-2 font-medium text-gray-900"
                                >
                                    <BookA className="h-6 w-6" />
                                    <span className="pl-2">Articles</span>
                                </Link>
                                <Link
                                    onClick={() => closeOnCurrent('/blog')}
                                    href='/blog'
                                    className="-m-2 flex p-2 font-medium text-gray-900"
                                >
                                    <BookHeadphones className="h-6 w-6" />
                                    <span className="pl-2">Blogs</span>
                                </Link>
                            </div>

                            {user && (
                                <div className="flex flex-col">
                                    <Link href="/new-story" className="flex gap-2">
                                        <BookOpenCheck className="h-6 w-6" />
                                        <h2 className="pl-2">Write</h2>
                                    </Link>
                                    <div className='flow-root items-center ml-6'>
                                        <SignedOut />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default MobileNav
