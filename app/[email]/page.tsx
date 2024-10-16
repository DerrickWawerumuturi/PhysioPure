'use client'
import { cn } from '@/lib/utils'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const { user, isSignedIn } = useUser()
    const currentPathname = usePathname()

    if (user === null) {
        return (
            <div />
        )
    }

    return (
        <div className='h-screen max-h-screen flex flex-col space-y-15 justify-start mt-10 sm:pl-10 lg:pl-20'>
            <div className='profile-icon items-center'>
                <UserButton />
                <p>{user?.firstName}</p>
            </div>
            <div className='flex gap-5 mt-7 border-b border-gray-200 pb-3'>
                <Link
                    href={`${currentPathname}`}
                    className='flex space-x-3'
                >
                    <h2 className={cn('font-normal font-segoe text-gray-500', {
                        'underline': currentPathname
                    })}>
                        Home
                    </h2>
                </Link>
                <Link href={currentPathname + "/about"}>
                    <h2 className={cn('font-normal font-segoe text-gray-500', {
                        'underline': currentPathname === currentPathname + "/about"
                    })}>
                        About
                    </h2>
                </Link>
            </div>
            {/* posts from this user */}
        </div>
    )
}

export default Page