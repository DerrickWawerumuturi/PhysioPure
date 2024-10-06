'use client'

import { Button } from './ui/button'
import Image from 'next/image'
import { loginWithGoogle } from "@/lib/auth"


const GoogleSignUp = () => {

    return (
        <div className='flex flex-col gap-4 items-center'>
            <p className='font-normal text-gray-600 text-lg'>or</p>
            <Button
                variant={"ghost"}
                onClick={loginWithGoogle}
            >
                <Image
                    src={"/assets/icons/google.svg"}
                    alt='google icon'
                    width={20}
                    height={20}
                />
                <p className='pl-3 text-normal'>Sign in with google</p>
            </Button>
        </div>

    )
}

export default GoogleSignUp