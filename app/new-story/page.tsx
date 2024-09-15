import dynamic from 'next/dynamic'
import "../css/Editor.css"

const Editor = dynamic(() => import('@/components/Editor/Editor'), { ssr: false })

const newStory = () => {
    return (
        <div className=''>
            <Editor />
        </div>
    )
}

export default newStory