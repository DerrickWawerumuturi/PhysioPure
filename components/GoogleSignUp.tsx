'use client'

import { signIn } from 'next-auth/react';
import { Button } from './ui/button'
import Image from 'next/image'


const GoogleSignUp = () => {
    const handleGoogleSignUp = async () => {
        await signIn("google", { callbackUrl: "/" });
    };

    return (
        <div className='flex flex-col gap-4 items-center'>
            <p className='font-normal text-gray-600 text-lg'>or</p>
            <Button
                variant={"ghost"}
                onClick={handleGoogleSignUp}
            >
                <Image
                    src={"/assets/icons/google.svg"}
                    alt='google icon'
                    width={20}
                    height={20}
                />
                <p>Sign in with google</p>
            </Button>
        </div>

    )
}

export default GoogleSignUp