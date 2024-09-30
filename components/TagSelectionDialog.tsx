
'use client'

import React, { useState, useEffect } from 'react';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogTrigger } from './ui/alert-dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import FileUploader from './FileUploader';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';
import { createBlogPost, createTag, getAllTags, updateBlogPost } from '@/lib/actions/blog.actions';
import { Block, BlockNoteEditor } from '@blocknote/core';
import { createPost } from '@/types';
import { generateSlug, simplifyContent } from '@/lib/utils';
import Success from './Success';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import TagForm from './forms/TagForm';

interface TagSelectionDialogProps {
    open: boolean;
    editor: BlockNoteEditor
    onClose: () => void;
    blogId: string;
    blocks: Block[],
    setBlocks: (block: Block[]) => void
    isLoading: boolean;
    title: string;
    subtitle: string;
    setTitle: (newValue: string) => void;
    setSubtitle: (newValue: string) => void;
    setIsLoading: (newValue: boolean) => void;
}

const TagSelectionDialog: React.FC<TagSelectionDialogProps> = ({
    open, onClose, isLoading, setIsLoading, blocks, setBlocks,
    title, subtitle, setTitle, setSubtitle, editor
}) => {
    const router = useRouter();
    const [files, setFiles] = useState<File[]>([]);
    const [user, setUser] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [published, setPublished] = useState(false)
    const [tags, setTags] = useState<string[]>([])
    const [success, setSuccess] = useState(false)


    useEffect(() => {
        const getUser = async () => {
            const user = await getLoggedInUser()
            setUser(user)
        }
        getUser()
    }, [])

    const handleBlog = async (type: "blog" | "article") => {
        // svae the blog to database, making sure to add he title and subtitle or preview from alert content
        const userId = user.$id
        console.log("user id is ", userId)
        const createdAt = new Date()
        const updatedAt = new Date()

        const blocks = editor.document
        setPublished(true)
        const slug = generateSlug(title, user?.username)

        let formData;
        const content = simplifyContent(blocks)

        if (
            files && files.length > 0
        ) {
            const fileData = new Blob([files[0]], {
                type: files[0].type
            })
            formData = new FormData()
            formData.append("fileData", fileData)
            formData.append("fileName", files[0].name)
        }

        try {
            const data: createPost = {
                title,
                subtitle,
                slug,
                author_id: userId,
                content: content,
                tags,
                published: published,
                publish_type: type,
                createdAt: createdAt,
                updatedAt: updatedAt,
                previewImage: files[0] ? formData : undefined
            }
            const createNewBlog = await createBlogPost(data)
            if (createNewBlog) {
                console.log("successfully created new blog")
                console.log("the author id is ", createNewBlog.author_id)

                toast.success("🥳🥳Congrats!! Blog published successfully", {
                    style: { color: "green" }
                });
                setSuccess(true)
                setTimeout(() => {
                    router.push("/")
                }, 3000)
            } else {
                toast.error("Failed to publish blog")
            }
        } catch (error) {
            console.log("could not create post", error)
        }
    }

    return (
        <div className={isDialogOpen ? 'modal-open' : ''}>
            <div className={isDialogOpen ? 'blur-background' : ''}>
                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <AlertDialogTrigger onClick={() => setIsDialogOpen(true)} disabled={isLoading} className='flex text-center rounded-2xl p-5 bg-green-400'>
                        {isLoading ? "Saving..." : "Publish"}
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <div className='flex sm:flex-col lg:flex-row sm:gap-4 lg:space-x-14'>
                            {/* Left section - for image */}
                            <div className='flex flex-col space-y-1'>
                                <AlertDialogTitle className="text-lg font-semibold mb-2">Story preview</AlertDialogTitle>
                                <FileUploader files={files} onChange={setFiles} />
                                <div className='mt-7'>
                                    <Input
                                        className='border-x-0 focus-visible:border-t-0 focus:outline-none ring-0 border-0 ring-offset-0 focus-visible:ring-0 text-gray-900 placeholder:text-gray-300'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder='Add a title for people to know'
                                    />
                                    <hr />
                                    <Input
                                        className='border-0 focus:border-y-0 focus:outline-none ring-0 ring-offset-0 focus-visible:ring-0 text-gray-900 placeholder:text-gray-300'
                                        value={subtitle}
                                        onChange={(e) => setSubtitle(e.target.value)}
                                        placeholder='Write a preview subtitle'
                                    />
                                    <hr />
                                </div>
                            </div>
                            {/* Right section - for publish */}
                            <div className='flex'>
                                <h2 className=''>{' '} Publishing to: <span className='font-semibold ml-1'>{user?.name}</span></h2>
                            </div>
                        </div>
                        <AlertDialogDescription className="text-sm text-gray-500 mb-2">
                            <TagForm onTagsChange={setTags} />
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                            <AlertDialogCancel
                                onClick={onClose}
                                className='border-none font-normal text-gray-500'>Schedule for later</AlertDialogCancel>
                            <Button
                                onClick={() => handleBlog("blog")}
                                variant={"secondary"}
                                disabled={isLoading}
                            >
                                Publish as Blog
                            </Button>
                            <Button
                                onClick={() => handleBlog("article")}
                                variant={"destructive"}
                                disabled={isLoading}
                            >
                                Publish as Article
                            </Button>
                        </AlertDialogFooter>
                        {success && <Success />}
                    </AlertDialogContent>
                </AlertDialog>
            </div>

        </div>
    );
};

export default TagSelectionDialog;