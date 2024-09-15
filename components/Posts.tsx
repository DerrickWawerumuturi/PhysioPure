import { Capitalize } from '@/lib/utils'
import { Post } from '@/types'
import React from 'react'

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Example usage:
const publishedDate = formatDate("2018-03-24T00:00:00Z");

const Posts = ({
    author,
    category,
    title,
    subTitle
}: Post) => {
    // get user from appwrite and see if the user has an image in there account
    // const image = author
    return (
        <div className='flex flex-col gap-2 border-b-2 pb-8 border-gray-100'>
            <div className='flex space-x-2'>
                <div className='rounded-full w-5 h-5 flex items-center justify-center bg-red-500  text-white font-semibold text-xm p-3'>
                    {author.charAt(0)}
                </div>
                <p className='text-sm font-normal'>{Capitalize(author)} in {category}</p>
            </div>
            <div className='post flex flex-col gap-2'>
                <h1 className='font-bold text-xl'>{Capitalize(title)}</h1>
                <p className='text-md font-semibold text-gray-500'>{Capitalize(subTitle)}.</p>
            </div>
            <div className='flex space-x-3 mt-3'>
                <p className='font-normal text-sm text-gray-600'>{publishedDate}</p>
            </div>
        </div>
    )
}

export default Posts