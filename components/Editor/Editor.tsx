'use client'

import { BlockNoteView } from "@blocknote/mantine"
import { useCreateBlockNote } from "@blocknote/react"
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import { Block, BlockNoteEditor } from "@blocknote/core";
import extractContent from "../extractContent";
import TagSelectionDialog from "../TagSelectionDialog";
import { toast } from "sonner";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { useState } from "react";
import { createBlogPost, updateBlogPost } from "@/lib/actions/blog.actions";



export default function Editor() {
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [blogId, setBlogId] = useState<string | null>(null);
    const [title, setTitle] = useState(""); // Added title state
    const [subtitle, setSubtitle] = useState(""); // Added subtitle state

    const editor: BlockNoteEditor = useCreateBlockNote()


    return (
        <div className="editor-container">
            <BlockNoteView
                editor={editor}
                className="blocknote-editor"
            />

            <TagSelectionDialog
                blogId={blogId!}
                open={isDialogOpen}
                blocks={blocks}
                editor={editor}
                setBlocks={setBlocks}
                onClose={() => setIsDialogOpen(false)}
                isLoading={isLoading}
                title={title}
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