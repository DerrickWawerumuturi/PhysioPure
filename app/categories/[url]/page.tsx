'use client'
import { getPostsWithTags } from "@/lib/actions/blog.actions"
import { getUserById } from "@/lib/actions/user.actions"
import { Capitalize, cn, timeDifference } from "@/lib/utils"
import { BlogProps, User } from "@/types"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Categories as Topics } from '@/lib/utils'
import { useTheme } from "next-themes"


const Categories = () => {
    const { url } = useParams()
    const { theme } = useTheme()
    const [blogs, setBLogs] = useState<BlogProps[]>([])
    const [users, setUsers] = useState<User[]>([])

    const router = useRouter()

    useEffect(() => {
        const getBlogs = async (url: string) => {
            const relatedBlogs: BlogProps[] = await getPostsWithTags(url)
            if (relatedBlogs) {
                relatedBlogs.forEach(async (post) => {
                    const authorId = post.author_id
                    const user: User[] = await getUserById(authorId)
                    setUsers(user)
                })
                setBLogs(relatedBlogs)
            } else {
                setBLogs([])
            }
        }
        getBlogs(url as string)
    }, [url])

    const specificCategory = Topics.find((topic) => topic.name === Capitalize(url as string))
    const categoryName = specificCategory?.name
    const description = specificCategory?.description

    const handleClick = (slug: string) => {
        router.push(`/blog/${slug}`)
    }

    if (blogs.length > 0) {
        return (
            <div className="flex flex-col gap-4">
                <div className={cn("flex bg-blue-400 w-screen sm:pb-20 sm:pl-10 sm:pt-5 h-[190px]", {
                    "bg-blue-800": theme === 'dark'
                })}>
                    {specificCategory ? (
                        <div className="flex flex-col gap-7">
                            <h2 className="font-semibold text-white text-3xl antialiased tracking-tight">
                                {categoryName}
                            </h2>
                            <p className="text-xl sm:hidden lg:flex font-normal text-gray-100 tracking-tight max-w-3xl">
                                {description}
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-7 pb-24">
                            <h2 className="font-semibold text-white text-5xl antialiased tracking-tight">
                                General
                            </h2>
                            <p className="text-lg font-normal text-gray-100 tracking-tight break-words max-w-3xl">
                                Explore a wide range of health and wellness topics that cover general healthcare advice, lifestyle tips, and insights into staying healthy. From everyday health tips to preventative care, this blog has something for everyone looking to improve their well-being.
                            </p>
                        </div>
                    )}
                </div>
                <div className="greed-feed sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            </div>
        )
    } else {
        return (
            <div>
                <h2>No related blogs</h2>
            </div>
        )
    }
}

export default Categories
