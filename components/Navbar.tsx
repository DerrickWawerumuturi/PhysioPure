import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PandaHeader = () => {
    return (
        <div className='shadow p-2 top-0'>
            <section className='flex space-x-8 lg:justify-around ml-5 top-0'>
                <Link
                    href={"/"}
                    className='flex space-x-1 lg:-ml-32'
                >
                    <Image
                        src="/assets/images/physioIcon.png"
                        alt='home icon'
                        width={50}
                        height={50}
                    />
                    <h1 className='text-xl font-semibold mt-3'>PhysioPure</h1>
                </Link>
                <div className='flex space-x-7 lg:pl-96 text-lg  text-gray-700 font-semibold mt-3'>
                    <Link href={"/"}>Categories</Link>
                    <Link href={"/"}>write</Link>
                    <Link href={"/"}>Account</Link>
                </div>
            </section>
        </div>
    )
}

export default PandaHeader