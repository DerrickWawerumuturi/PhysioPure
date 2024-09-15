'use client'

import { BlockNoteView } from "@blocknote/mantine"
import { useCreateBlockNote } from "@blocknote/react"
import "../../app/css/Editor.css"
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import { Block } from "@blocknote/core";
import extractContent from "../extractContent";
import TagSelectionDialog from "../TagSelectionDialog";
import { toast } from "sonner";
import { createBlog, getBlog, updateBlog } from "@/lib/actions/blog.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { useState } from "react";



export default function Editor() {
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [isDraftSaved, setIsDraftSaved] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errrorMessage, setErrorMessage] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [blogId, setBlogId] = useState<string | null>(null);
    const [title, setTitle] = useState(""); // Added title state
    const [subtitle, setSubtitle] = useState(""); // Added subtitle state

    const editor = useCreateBlockNote({
        initialContent: [
            {
                type: "paragraph",
            }
        ],
    });

    const handleContentChange = () => {
        const updatedBlocks = editor.document;
        setBlocks(updatedBlocks);
        setIsDraftSaved(false);
    };

    const handleSaveDraft = async () => {
        const user = await getLoggedInUser()
        const userId = user.$id

        setIsLoading(true);
        const data = extractContent(blocks);


        if (blogId) {
            const updatedBlog = await updateBlog(blogId, "draft", data, title, subtitle);
            if (updatedBlog) {
                setBlogId(updatedBlog.$id);
                setIsDraftSaved(true);
                toast.success("Blog updated successfully");
            } else {
                toast.error("Error updating blog");
                setErrorMessage("Error updating blog");
            }
        } else {
            const DBblogId = await createBlog(userId, "draft", data)
            console.log("db blog id")
            try {
                if (typeof DBblogId === "string") {
                    console.log(DBblogId)
                    setBlogId(DBblogId);
                    setIsDraftSaved(true);
                } else {
                    toast.error("Error saving draft");
                    setErrorMessage("Error saving draft");
                }
                setIsLoading(false);
            } catch (error) {
                console.log("client issue");
            }
        }
        setIsLoading(false);
    };
    console.log("blog id", blogId)
    return (
        <div className="editor-container">
            <BlockNoteView
                editor={editor}
                className="blocknote-editor"
                onClick={handleContentChange}
            />

            <TagSelectionDialog
                blogId={blogId!}
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onTagSelect={(tag) => setSelectedTag(tag)}
                onClick={handleSaveDraft}
                isLoading={isLoading}
                isDraftSaved={isDraftSaved}
                errorMessage={errrorMessage}
                title={title} // Pass title
                subtitle={subtitle}
                setTitle={setTitle}
                setSubtitle={setSubtitle}
                setIsLoading={setIsLoading}
            />
        </div>
    );
}


// steps
// button page
// to publish - tags, then get the title from the backend and show it to front end
// blog page
// deploy 