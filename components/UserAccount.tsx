'use client'

import { useEffect, useState } from "react"
import { Popover } from "./ui/popover"
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Bookmark, LogOut, Settings, User } from "lucide-react"
import Profile from "./Profile"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { logOut } from "@/lib/actions/user.actions"
import { getUser } from "@/lib/auth"

const UserAccount = () => {
    const [user, setUser] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const router = useRouter()

    const handleLogOut = async () => {
        try {
            await logOut()
            router.push("/")
        } catch (error) {
            toast.error("Log out failed")
        }
    }
    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser()
            if (user === null) {
                setEmail(null)
                setUser(null)
            } else {
                setEmail(user.email)
                setUser(user.name)
            }
        }
        fetchUser()
    }, [])

    if (user === null) {
        return (
            <div />
        )
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="profile-img">
                    <h2 className="text-center text-white">{user?.[0]}</h2>
                </div>
            </PopoverTrigger>
            <PopoverContent className="lg:w-80 sm:w-52 border rounded-lg shadow-lg focus:outline-none">
                <div className="bg-white flex flex-col gap-4 z-50 p-5 border border-white">
                    <Profile Icon={User} label="Profile" link={`@${email}`} />
                    <Profile Icon={Bookmark} label="Library" link={`me/list`} />
                    <Profile Icon={Settings} label="Settings" link={`me/settings`} />
                    <Profile Icon={LogOut} label="Sign out" onClick={handleLogOut} />
                </div>
            </PopoverContent>
        </Popover>

    )
}

export default UserAccount