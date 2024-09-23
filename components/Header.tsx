'use client'; // This is necessary to use client-side hooks like `usePathname`

import { usePathname } from 'next/navigation';
import { Edit, Bell, Search } from 'lucide-react';
import Link from 'next/link';
import UserAccount from './UserAccount';
import { Suspense } from 'react';
import Tabs from './Tabs';
import { ModeToggle } from './ModeToggle';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

const Header = () => {
    const pathname = usePathname();
    const { theme } = useTheme()

    // Check if the  route is "/new-post"
    const isNewPostPage = pathname === '/new-story';

    return (
        <div className={cn("relative flex gap-2 border-b-2 border-gray-100 w-full justify-between pb-3 mt-1 ml-2", {
            "border-gray-50 border-b-2": theme === 'dark'
        })}>
            <div className="header flex space-x-8 justify-between">
                <h1 className={`text-3xl font-bold  mt-4 ml-5`}>PhysioPure</h1>
                {/* <div className=' lg:ml-28 sm:pl-12 lg:pl-44'>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Tabs />
                    </Suspense>
                </div> */}
            </div>

            {/* Conditionally render the "Write" button and others */}

            <div className="flex gap-7 others mt-5 mr-7">
                {!isNewPostPage && (
                    <div className="flex relative items-center space-x-4 ml-2">
                        <div className='sm:pl-12'>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Tabs />
                            </Suspense>
                        </div>
                        <div>
                            <ModeToggle />
                        </div>

                        <Link href="/new-story" className="flex gap-2 ml-5">
                            <Edit className="text-gray-600" strokeWidth={1} />
                            <p className="text-gray-500 text-sm">Write</p>
                        </Link>
                    </div>

                )}
                <div className=''>
                    <Bell strokeWidth={1} className="text-gray-500 sm:mt-2" />
                </div>
                <div className='sm:mt-1'>
                    <UserAccount />
                </div>
            </div>
        </div>
    );
};

export default Header;
