import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import { User } from '@/types'
import { Button } from './ui/button'
import Link from 'next/link'

interface NotLoggedProps {
    user: User | null
}

const NotLoggedIn = ({ user }: NotLoggedProps) => {
    return (
        <div className='blur-background'>
            <AlertDialog open={user === null}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className='text-center'>Not loggedIn?</AlertDialogTitle>
                        <AlertDialogDescription>
                            <div className='flex flex-col  space-y-5'>
                                <Button variant={"ghost"}>
                                    <Link href={"/sign-up"}>
                                        Sign Up
                                    </Link>

                                </Button>
                                <Button variant={"destructive"}>
                                    <Link href={"/sign-in"}>
                                        Sign in
                                    </Link>
                                </Button>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
}

export default NotLoggedIn