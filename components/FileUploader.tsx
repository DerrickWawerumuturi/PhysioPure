"use client"

import { convertFileToUrl } from '@/lib/utils'
import Image from 'next/image'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

type FileUploaderProps = {
    files: File[] | undefined,
    onChange: (files: File[]) => void

}


const FileUploader = ({ files, onChange }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        onChange(acceptedFiles)
    }, [onChange])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} className='file-upload'>
            <input {...getInputProps()} />
            {files && files?.length > 0 ?
                <Image
                    src={convertFileToUrl(files[0])}
                    width={1000}
                    height={1000}
                    alt="uploaded image"
                    className='max-h-[400px] overflow-hidden object-cover'
                /> : (
                    <>
                        <Image
                            src="/assets/icons/upload.svg"
                            alt='upload'
                            height={40}
                            width={40}
                        />
                        <div className='file-upload_label'>
                            <p className='text-14-regular'>
                                Include a high-quality image in your story to make it more inviting to readers.
                            </p>
                        </div>
                    </>
                )}
        </div>
    )
}

export default FileUploader