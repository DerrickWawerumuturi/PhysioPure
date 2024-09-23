'use client'

import { getAllPosts } from "@/lib/actions/blog.actions"
import { BlogProps } from "@/types"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"


const Recommended = () => {
    const [title, setTitle] = useState<string[]>([])

    const getRandomTitles = (titles: string[]) => {
        if (titles.length <= 5) return titles

        const shuffled = [...titles].sort(() => 0.5 - Math.random())
        return shuffled.slice(0, 5)
    }

    useEffect(() => {
        const getTitles = async () => {
            const blogs: BlogProps[] = await getAllPosts()
            setTitle(blogs.map(blog => blog.title))
        }
        getTitles()
    }, [])

    const displayedTitles = getRandomTitles(title)

    return (
        <div className="flex flex-col space-y-2 w-[350px]">
            <div className="flex flex-col space-y-3 p-5 border border-gray-600 rounded-md">
                <h2 className="text-xl font-segoe font-bold text-center">Recommended</h2>
                {displayedTitles.map((title, index) => (
                    <div key={index} className="flex space-x-2 break-words">
                        <ArrowRight />
                        <h3>{title}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Recommended