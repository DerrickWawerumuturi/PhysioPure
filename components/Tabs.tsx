'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import "../app/tabs.css"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'

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
        <div>
            <Select>
                <SelectTrigger className="w-[180px] focus:outline-none">
                    <SelectValue placeholder="Categories" />
                </SelectTrigger>
                <SelectContent className='focus:outline-none'>
                    <SelectGroup>
                        <SelectLabel>Physiology</SelectLabel>
                        {tabs.map((tab) => (
                            <SelectItem
                                onClick={() => handleTabClick(tab.tag)}
                                value={tab.tag}
                                key={tab.tag}
                            >{tab.name}</SelectItem>
                        ))}

                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default Tabs