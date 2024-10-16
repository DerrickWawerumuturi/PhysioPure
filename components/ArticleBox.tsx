'use client'
import { getTop6Posts } from '@/lib/actions/blog.actions'
import { getUserById } from '@/lib/actions/user.actions'

import { Capitalize, cn, timeDifference } from '@/lib/utils'
import { BlogProps, User } from '@/types'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ArticleBox = () => {
    const { theme } = useTheme()
    const [blogs, setBLogs] = useState<BlogProps[]>([])
    const [users, setUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const getAllBlogs = async () => {
            try {
                const blogPosts: BlogProps[] = await getTop6Posts()
                blogPosts?.forEach(async (post) => {
                    const authorId = post.author_id
                    const user: User[] = await getUserById(authorId)
                    setUsers(user)
                })

                setBLogs(blogPosts)
            } catch (error) {
                console.error("Error gettign all blogs", error)
            } finally {
                setIsLoading(false)
            }
        }
        getAllBlogs()
    }, [])

    const handleClick = (slug: string) => {
        router.push(`/blog/${slug}`)

    }

    if (isLoading) {
        return (
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-lg lg:max-w-7xl'>
                {[...Array(6).map((_, index) => (
                    <div key={index} className='rounded-xl shadow-lg overflow-hidden h-[400px] flex flex-col animate-pulse'>
                        <div className='relative w-full h-48 bg-gray-300' />
                        <div className='flex flex-col p-4 flex-grow'>
                            <div className='"h-6 bg-gray-300 mb-4' />
                            <div className='"h-6 bg-gray-300 mb-4' />
                            <div className='"h-6 bg-gray-300 mb-4' />
                        </div>
                    </div>
                ))]}
            </div>
        )
    }

    return (
        <div className="greed-feed sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogs?.map((blog, index) => (
                <div
                    key={index}
                    className={cn("relative rounded-xl shadow-lg overflow-hidden flex flex-col grid-expand hover:cursor-pointer", {
                        "border border-gray-100": theme === "dark"
                    })}
                    onClick={() => handleClick(blog.slug)}
                >
                    <div className="relative w-full h-48">
                        <Image
                            src={blog?.previewImageUrl}
                            alt={blog.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col flex-grow p-4 gap-2">
                        <h2 className={cn("text-start text-gray-900 font-bold text-xl overflow-break-words break-words", {
                            "text-white ": theme === 'dark'
                        })}>
                            {Capitalize(blog.title)}
                        </h2>
                        <p className="text-start text-gray-500 font-normal text-lg line-clamp-2 ">
                            {Capitalize(blog.subtitle)}
                        </p>
                        <div className='flex-grow' />
                        <div className="flex justify-between text-sm font-sm text-gray-500 bottom-0">
                            {users.map((user, index) => (
                                <p key={index}>{user?.username}</p>
                            ))}
                            <p>{timeDifference(String(blog.updatedAt))}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    )
}


export default ArticleBox