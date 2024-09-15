// TagSelectionDialog.tsx
import React, { useState, useEffect } from 'react';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogTrigger } from './ui/alert-dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import FileUploader from './FileUploader';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { createTag, getAllTags, updateBlog } from '@/lib/actions/blog.actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';
import { ID } from 'node-appwrite';

interface TagSelectionDialogProps {
    open: boolean;
    onClose: () => void;
    onTagSelect: (tag: string) => void;
    blogId: string;
    onClick: () => void;
    isLoading: boolean;
    isDraftSaved: boolean;
    errorMessage: string;
    title: string;
    subtitle: string;
    setTitle: (newValue: string) => void;
    setSubtitle: (newValue: string) => void;
    setIsLoading: (newValue: boolean) => void;
}

const TagSelectionDialog: React.FC<TagSelectionDialogProps> = ({
    open, onClose, onTagSelect, blogId,
    onClick, isLoading, setIsLoading, isDraftSaved, errorMessage,
    title, subtitle, setTitle, setSubtitle
}) => {
    const router = useRouter();
    const [tags, setTags] = useState<any[]>([]);
    const [newTag, setNewTag] = useState<string>('general');
    const [selectedTag, setSelectedTag] = useState<string | null>(newTag);
    const [files, setFiles] = useState<File[]>([]);
    const [user, setUser] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        if (open) {
            const loadTags = async () => {
                try {
                    const fetchedTags = await getAllTags();
                    setTags(fetchedTags);
                } catch (error) {
                    console.error('Failed to fetch tags:', error);
                }
            };
            loadTags();
        }
    }, [open]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userParams = await getLoggedInUser();
                setUser(userParams);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        };
        fetchUser();
    }, []);

    const handleAddTag = async () => {
        if (newTag.trim()) {
            try {
                await createTag(newTag.trim());
                setTags(prevTags => [...prevTags, { name: newTag.trim() }]);
                setNewTag('');
                toast.message("tag created")
            } catch (error) {
                console.error('Failed to add tag:', error);
            }
        }
    };

    const handleTagSelect = (tagId: string) => {
        setSelectedTag(tagId);
    };

    const handleSelectTag = async () => {
        console.log(selectedTag)
        if (selectedTag) {
            try {
                console.log("selected blog id", blogId)
                const result = await updateBlog(blogId, "published", undefined, title, subtitle);
                onTagSelect(selectedTag);
                onClose();
                console.log(result)
                return result
            } catch (error) {
                console.error('Failed to update blog:', error);
                return true;
            }
        }
    };

    const handlePublish = async () => {
        setIsLoading(true);
        try {
            const result = await handleSelectTag();
            console.log(result)
            if (result) {
                toast.success("Blog published successfully");
                setTimeout(() => router.push("/"), 1000);
            } else {
                toast.error("Failed to publish blog");
            }
        } catch (error) {
            toast.error("An error occurred during publishing");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={isDialogOpen ? 'modal-open' : ''}>
            <div className={isDialogOpen ? 'blur-background' : ''}>
                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <AlertDialogTrigger onClick={() => setIsDialogOpen(true)} disabled={isLoading} className='flex text-center rounded-2xl p-2 bg-green-400'>
                        {isLoading ? "Saving..." : "Publish"}
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <div className='flex space-x-14 font-segoe'>
                            {/* Left section - for image */}
                            <div className='flex flex-col space-y-1'>
                                <AlertDialogTitle className="text-lg font-semibold mb-2">Story preview</AlertDialogTitle>
                                <FileUploader files={files} onChange={setFiles} />
                                <div className='mt-5'>
                                    <Input
                                        className='border-x-0 focus:outline-none ring-0 border-0 ring-offset-0 focus-visible:ring-0 text-gray-900 placeholder:text-gray-300'
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
                            <div className='flex flex-col space-y-2'>
                                <h2>Publishing to: <span className='font-semibold ml-1'>{user?.name}</span></h2>
                            </div>
                        </div>
                        <AlertDialogDescription className="text-sm text-gray-500 mb-2">
                            Add or change topics so that readers can know what your story is about
                            <div className="flex flex-wrap gap-2 mt-2">
                                {tags.map((tag) => (
                                    <div
                                        key={ID.unique()}
                                        onClick={() => handleTagSelect(tag.$id)}
                                        className={`cursor-pointer rounded-2xl p-2 border-2 flex items-center justify-center ${selectedTag === tag.$id ? "bg-blue-500 border-blue-700 text-white" : "bg-gray-200 border-gray-300"
                                            }`}
                                    >
                                        {tag.name}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4">
                                <Textarea
                                    className='border border-gray-100 rounded-none bg-gray-50 h-6 p-2 mt-2 focus:outline-none'
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    placeholder='Add a topic...'
                                />
                                <button
                                    type='button'
                                    onClick={handleAddTag}
                                    value={selectedTag!}
                                    className="ml-2 bg-blue-500 text-white px-4 py-2 mt-2 rounded-2xl"
                                >
                                    Create Tag
                                </button>
                            </div>
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={onClose} className='border-none font-normal text-gray-500'>Schedule for later</AlertDialogCancel>
                            <Button
                                onClick={handlePublish}
                                variant={"secondary"}
                                disabled={isLoading}
                            >
                                Publish
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
};

export default TagSelectionDialog;
