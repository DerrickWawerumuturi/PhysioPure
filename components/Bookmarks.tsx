import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import React from 'react'

interface bookMarkProps {
    name: string,
    description: string,
    attribute: string
}



const Bookmarks = ({ name, description, attribute }: bookMarkProps) => {
    const { theme } = useTheme()
    return (
        <div className='flex flex-col gap-2 items-center'>
            <div className={cn('rounded-full items-center')}>
                <Image
                    src={`/assets/images/${attribute === "exercise"
                        ? 'exercise'
                        : attribute === 'plans'
                            ? "plans"
                            : 'injury'
                        }.png`}
                    alt="name"
                    width={80}
                    height={80}
                />
            </div>
            <div className='flex flex-col gap-3 items-center'>
                <h2 className='text-start font-semibold text-xl antialiased tracking-tight break-words'>
                    {name}
                </h2>
                <p className={cn('lg:flex font-normal text-lg tracking-tight break-words text-center', {
                    "text-white": theme === 'dark',
                    "text-gray-700": theme === 'light'
                })}>
                    {description}
                </p>
            </div>
        </div>
    )
}

export default Bookmarks