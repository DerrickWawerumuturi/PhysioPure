'use client'
import { getAllPosts } from "@/lib/actions/blog.actions"
import { getLoggedInUser } from "@/lib/actions/user.actions"
import { Capitalize, cn, timeDifference } from "@/lib/utils"
import { BlogProps, User } from "@/types"
import { useTheme } from "next-themes"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Posts: React.FC = () => {
    const [blogs, setBLogs] = useState<BlogProps[]>([])
    const [user, setUser] = useState<User>()
    const router = useRouter()
    const { theme } = useTheme()

    useEffect(() => {
        const getAllBlogs = async () => {
            try {
                const blogPosts = await getAllPosts()
                const user: User = await getLoggedInUser()
                setUser(user)
                setBLogs(blogPosts)
            } catch (error) {
                console.error("Error gettign all blogs")
            }
        }
        getAllBlogs()
    }, [])

    const handleClick = (slug: string) => {
        router.push(`/blog/${slug}`)

    }
    return (
        <div className="flex space-x-5">
            <div className="hover:cursor-pointer">
                {blogs.map((blog) => (
                    <div key={blog.$id} className={cn("flex space-x-10 border-b-2 pb-8 border-gray-100 lg:w-[700px]  overflow-hidden", {
                        'border-none': theme === 'dark'
                    })} onClick={() => handleClick(blog.slug)}>
                        <div className="flex flex-col p-4 space-y-6 flex-grow">
                            <div className="flex space-x-2">
                                <p className="rounded-full w-5 h-5 flex items-center justify-center bg-blue-500  text-white font-semibold text-xm p-3">
                                    {user?.name[0]}
                                </p>
                                <h2 className="ml-2 mt-0 font-normal font-segoe text-sm">{user?.name} in {Capitalize(blog.tags[0])}</h2>
                            </div>
                            <div className="flex flex-col space-y-2 ml-7">
                                <h2 className="font-bold text-2xl antialiased break-words">{Capitalize(blog.title)}</h2>
                                <p className="font-semibold text-gray-500 break-words">{blog.subtitle}</p>
                            </div>
                            <div className="flex space-x-3 ml-7 items-end justify-start mt-10 -mb-6">
                                <div className="text-gray-600 font-normal text-sm">{timeDifference(String(blog.updatedAt))}</div>
                            </div>
                        </div>
                        <div className="mt-10 flex-shrink-0 w-[150px] h-[150px] overflow-hidden flex items-center justify-center">
                            <Image
                                src={blog?.previewImageUrl}
                                alt={blog?.previewImageId}
                                width={150}
                                layout="fixed"
                                height={150}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="">

            </div>
        </div >
    )
}

export default Posts