'use client'
import RequestAccessEmail from '@/components/emails/NewUser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import nodemailer from "nodemailer"
import { sendEmail } from '@/lib/emailService'


const Page = () => {
    const { theme } = useTheme()
    const [email, setEmail] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const handleEmails = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setErrorMessage(null)
        setSuccessMessage(null)

        try {
            // const emailContent = RequestAccessEmail({
            //     userFirstname: "",
            //     requestAccessLink: "https://insights-ivory.vercel.app",
            // })

            // const email = await sendEmail({
            //     to: ,
            //     subject: "Request for access to Insights IVory",
            //     html: emailContent,
            // })
        } catch (error) {

        }
    }

    return (
        <div className="mt-10 h-screen max-w-3xl mx-auto text-center flex flex-col items-center">
            <h2 className={cn("text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mt-7", {
                "text-white": theme === 'dark'
            })}>
                Want to contribute? Whether in writing or editing
            </h2>
            <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
                Enter your email below to request access and start sharing your ideas, experiences, and knowledge through our platform
            </p>

            <form
                onSubmit={handleEmails}
                className="flex w-full max-w-sm items-center space-x-2 mt-10 ">
                <Input
                    placeholder='Your email address'
                    type='email'
                    size={10}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Button type='submit' variant={"green"}>
                    {isLoading ? (
                        <Loader2 />
                    ) : (
                        "Send"
                    )}
                </Button>
            </form>
            {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
            {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
        </div>
    )
}

export default Page