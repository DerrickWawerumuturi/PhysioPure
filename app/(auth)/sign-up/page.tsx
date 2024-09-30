import AuthForm from '@/components/AuthForm'
import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='flex h-screen max-w-screen'>
            <div className='container remove-scrollbar'>
                <div className='sub-container max-w-[860px] flex-1 py-2 items-center lg:px-[5%]'>
                    <AuthForm type='sign-up' />
                </div>
            </div>
            <Image
                src="/assets/images/sign-up.png"
                alt='sign-in image'
                width={1000}
                height={1000}
                className='h-full sm:hidden lg:block object-cover max-w-[790px]'
            />
        </div>
    )
}

export default page