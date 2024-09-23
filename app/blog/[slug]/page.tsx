'use client'

import { getSpecificPost } from '@/lib/actions/blog.actions'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import { cn, publishedDate } from '@/lib/utils'
import { BlogProps, User } from '@/types'
import { ChevronRight } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface HeaderProps {
    href: string,
    label: string
}

const HeaderLink = (data: HeaderProps) => {
    return (
        <div className='flex space-x-1'>
            <Link href={data.href} className='mt-0.5 hover:underline'>
                {data.label}
            </Link>
            <ChevronRight size={17} className='mt-1.5' />
        </div>
    )
}


const Page = () => {
    const [blog, setBlog] = useState<BlogProps[]>([])
    const { slug } = useParams()
    const [user, setUser] = useState<User>()
    const { theme } = useTheme()

    useEffect(() => {
        const getBlog = async () => {
            try {
                const blog = await getSpecificPost(slug)
                setBlog(blog)
                const user: User = await getLoggedInUser()
                setUser(user)
            } catch (error) {
                console.log("could retrieve the specific blog")
            }
        }
        getBlog()
    }, [slug, user])

    return (
        <div className='flex flex-col space-y-7'>
            {blog.map((cont) => (
                <div key={cont.$id}>
                    <div className={cn('flex flex-col space-y-8 p-5 bg-blue-700 w-full text-white pb-12 pt-9', {
                        'bg-gray-600': theme === 'dark'
                    })}>
                        {/* links from categories */}
                        <div className='flex space-x-1'>
                            <HeaderLink href='/' label='Home' />
                            <HeaderLink href='/' label={cont.tags[0]} />
                            <HeaderLink href='/' label='Physiology' />
                        </div>
                        <div className="flex flex-col space-y-5">
                            <h2 className='text-xl font-bold antialiased'>{cont.title}</h2>
                            <p className='break-all text-xl font-semibold'>{cont.subtitle}</p>
                        </div>
                        <div className='flex space-x-5 justify-between pt-5'>
                            <h3 className='text-md text-gray-300 font-normal'>Author: {user?.name}</h3>
                            <p className='text-md text-gray-300 font-normal'>Published on: {publishedDate(cont.updatedAt)}</p>
                        </div>

                    </div>

                    <div className='flex  p-5 justify-center mt-5'>
                        <div className='max-w-5xl pr-12'>
                            <div className='space-y-6 leading-relaxed text-gray-900 text-lg'>
                                {cont.content.split("\n").map((paragraph, index) => (
                                    <p key={index} className={cn('text-black', {
                                        'text-white': theme === 'dark'
                                    })}>
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    )
}

export default Page