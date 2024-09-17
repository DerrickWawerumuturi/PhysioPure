'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import "../app/tabs.css"

const Tabs = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const activeTag = searchParams.get("tag")

    const tabs = [
        { name: "Cardiology", tag: "cardiology" },
        { name: "Pediatrics", tag: "pediatrics" },
        { name: "Neurology", tag: "neurology" },
        { name: "Oncology", tag: "oncology" },
        { name: "Dermatology", tag: "dermatology" },
    ];

    const handleTabClick = (tag: string) => {
        const newParams = new URLSearchParams(searchParams)
        newParams.set("tag", tag)
        router.push(`/?${newParams.toString()}`)
    }



    return (
        <div className='tabs-container border-b-2 border-gray-100'>
            <button
                type='button'
                title='slideLeft'
            >
                <ChevronLeft
                    className='chevron'
                />
            </button>
            <div
                className='tabs-scroll'
            >
                {tabs.map((tab) => (
                    <div
                        key={tab.name}
                        className={`tab text-sm text-gray-600 font-normal ${activeTag === tab.tag ? "active-tab" : ""}`}
                        onClick={() => handleTabClick(tab.tag)}
                    >
                        {tab.name}
                    </div>
                ))}
            </div>
            <button
                title='slideRight'
                type='button'
            >
                <ChevronRight
                    className='chevron'
                />
            </button>
        </div>
    )
}

export default Tabs