import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from './ui/button'

const Footer = () => {
    return (
        <footer className='mt-2 flex gap-4 justify-between sm:flex-col lg:flex-row bottom-0'>
            <div className='flex gap-2'>
                <Image
                    src={"/assets/images/physioIcon.png"}
                    alt='home icon'
                    width={30}
                    height={30}
                />
                <p>Explore the World of Rehabilitation and Recovery</p>
            </div>
            <div className='flex space-x-4 ml-10'>
                <Link
                    href="/about"
                    className={"text-gray-500 hover:text-gray-900"}
                >About</Link>
                <Link
                    href="/about"
                    className={"text-gray-500 hover:text-gray-900"}
                >Join the team</Link>
            </div>
        </footer>

    )
}

export default Footer