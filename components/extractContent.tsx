import { Block } from "@blocknote/core";


const extractContent = (blocks: Block[]): string[] => {
    const data: string[] = blocks.map((block) => {
        let text = ""
        if (Array.isArray(block.content)) {
            text = block.content.map((item) => {
                if (typeof item === "object" && "text" in item) {
                    return item.text
                }
                return ""
            }).join(" ")
        } else if (typeof block.content === "object") {
            if ("text" in block.content!) {
                text = String(block.content.text)
            } else if ("value" in block.content!) {
                text = String(block.content.value)
            }
        }

        return text
    })
    return data
}

export default extractContent