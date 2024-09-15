"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import CustomInput from "./CustomInput"
import { authFormSchema } from "@/lib/utils"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { signIn, signUp } from "@/lib/actions/user.actions"
import { useRouter } from "next/navigation"


const AuthForm = ({ type }: { type: string }) => {
    const [isLoading, setIsLoading] = useState(false)
    const formSchema = authFormSchema(type)
    const router = useRouter()


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: type === 'sign-up' ? "" : undefined,
            email: "",
            password: ""
        },
    })
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        try {
            if (type === "sign-up") {
                const userData = {
                    username: data.username!,
                    email: data.email,
                    password: data.password
                }

                const newUser = await signUp(userData)
                if (newUser.success === "false") {
                    toast.error(newUser.message)
                }
                if (newUser) router.push("/")

            }
            if (type === 'sign-in') {
                const response = await signIn({
                    email: data.email,
                    password: data.password
                })
                if (response) router.push("/")
            }
        } catch (error) {
            console.error('Error submitting form')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="auth-form ml-10">
            <header className="flex flex-col gap-5 md:gap-8">
                <Link href={"/"} className="cursor-pointer items-center gap-1 flex">
                    <h1 className="text-[26px] leading-[26px] font-segoe font-bold text-black">
                        Insights
                    </h1>
                </Link>
            </header>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <>
                        <div className="flex flex-col gap-4">
                            {type === 'sign-up' && (

                                <CustomInput
                                    control={form.control}
                                    name="username"
                                    placeholder="username"
                                    label="Enter username"
                                />
                            )}
                            <CustomInput
                                control={form.control}
                                name="email"
                                placeholder="john@doe.com"
                                label="Enter email"
                            />
                            <CustomInput
                                control={form.control}
                                name="password"
                                placeholder="password"
                                label="Enter password"
                            />
                        </div>
                    </>

                    <div className="flex flex-col fap-4">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="text-[16px] leading-[16px] rounded-lg border border-buttonGradient font-semibold text-white "
                        >
                            {isLoading ? (
                                <>
                                    <Loader2
                                        size={20}
                                        className="animate-spin"
                                    />
                                    &nbsp; Loading ...
                                </>
                            ) : type === "sign-in" ? "Sign in" : "Sign up"}
                        </Button>
                    </div>
                </form>
            </Form>
            <footer className='flex justify-center gap-1'>
                <p className='text-[14px] leading-[14px] font-normal text-gray-600'>{type === "sign-in"
                    ? "Don't have an account?"
                    : 'Already have an account'
                }
                </p>
                <Link
                    className='text-[14px] leading-[14px] cursor-pointer font-medium text-buttonGradient'
                    href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
                >
                    {type === 'sign-in' ? 'Sign up' : 'Sign in'}
                </Link>
            </footer>
        </section>
    )
}

export default AuthForm