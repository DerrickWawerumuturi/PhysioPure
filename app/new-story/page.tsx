'use client'
import dynamic from 'next/dynamic'

const Editor = dynamic(() => import('@/components/Editor/Editor'), { ssr: false })

const newStory = () => {
    return (
        <div className='mt-10'>
            <Editor />
        </div>
    )
}

export default newStory
