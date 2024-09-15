'use client'; // This is necessary to use client-side hooks like `usePathname`

import { usePathname } from 'next/navigation';
import { Edit, Bell, Search } from 'lucide-react';
import Link from 'next/link';
import UserAccount from './UserAccount';

const Header = () => {
    const pathname = usePathname();

    // Check if the  route is "/new-post"
    const isNewPostPage = pathname === '/new-story';

    return (
        <div className="relative flex gap-2 border-b-2 border-gray-100 w-full justify-between pb-3 mt-1 ml-2">
            <div className="header flex gap-2">
                <h1 className="text-3xl font-bold mt-3 ml-5">Insight</h1>
                {!isNewPostPage && (
                    <div className="flex relative items-center mt-3 ml-2">
                        <Search className="absolute left-3 text-gray-500" size={20} />
                        <input
                            placeholder="Search"
                            type="text"
                            className="rounded-3xl bg-gray-50 pl-10 p-2"
                        />
                    </div>)}
            </div>

            {/* Conditionally render the "Write" button and others */}

            <div className="flex gap-7 others mt-5 mr-7">
                {!isNewPostPage && (
                    <Link href="/new-story" className="flex gap-2">
                        <Edit className="text-gray-600" strokeWidth={1} />
                        <p className="text-gray-500 text-sm">Write</p>
                    </Link>
                )}
                <div>
                    <Bell strokeWidth={1} className="text-gray-500" />
                </div>
                <div>
                    <UserAccount />
                </div>
            </div>
        </div>
    );
};

export default Header;
