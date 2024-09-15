import React from 'react'
import { ProfileIcon } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';



const Profile = ({ Icon, label, link, onClick }: ProfileIcon) => {
    const router = useRouter()
    const handleClick = () => {
        if (onClick) {
            onClick()
        } else if (link) {
            router.push(link)
        }
    }
    return (
        <div
            onClick={handleClick}
            className='flex gap-2 cursor-pointer'>
            <div>
                <Icon className='text-gray-400' />
            </div>
            <h2 className='text-normal text-gray-600'>{label}</h2>
        </div>
    )
}

export default Profile