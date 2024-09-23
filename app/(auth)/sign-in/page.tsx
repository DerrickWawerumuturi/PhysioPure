import AuthForm from '@/components/AuthForm'
import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='flex h-screen max-w-screen'>
            <div className='container remove-scrollbar'>
                <div className='sub-container max-w-[860px] flex-1 flex-col py-10 px-[5%]'>
                    <AuthForm type='sign-in' />
                </div>
            </div>
            <div className='sm:hidden lg:block'>
                <Image
                    src="/assets/images/sign-in.jpg"
                    alt='sign-in image'
                    width={1000}
                    height={1000}
                    priority
                    className='h-full sm:hidden md:block object-cover max-w-[690px]'
                />
            </div>
        </div>
    )
}

export default page