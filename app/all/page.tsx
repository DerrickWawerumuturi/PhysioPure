'use client'
import { getAllPosts } from "@/lib/actions/blog.actions"
import { getUserById } from "@/lib/actions/user.actions"
import { Capitalize, cn, timeDifference } from "@/lib/utils"
import { BlogProps, User } from "@/types"
import "../globals.css"
import { useTheme } from "next-themes"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


const Page = () => {
    const [blogs, setBLogs] = useState<BlogProps[]>([])
    const [users, setUsers] = useState<User[]>([])
    const { theme } = useTheme()
    const router = useRouter()

    useEffect(() => {
        const getBlogs = async () => {
            const blogs: BlogProps[] = await getAllPosts()
            if (blogs) {
                blogs.forEach(async (post) => {
                    const authorId = post.author_id
                    const user: User[] = await getUserById(authorId)
                    setUsers(user)
                })
                setBLogs(blogs)
            } else {
                setBLogs([])
            }
        }
        getBlogs()

    }, [])



    const handleClick = (slug: string) => {
        router.push(`/blog/${slug}`)
    }

    return (
        <div className="greed-feed">
            {blogs.map((blog, index) => (
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
                        <div className="flex sm:flex-row gap-2 text-sm font-sm text-gray-500 bottom-0">
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

export default Page
