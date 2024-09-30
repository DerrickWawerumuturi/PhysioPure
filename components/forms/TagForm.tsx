import React from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { InputTags } from '../MultipleTags'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TagFormProps } from '@/types'

const TagForm: React.FC<TagFormProps> = ({ onTagsChange }) => {
    const formSchema = z.object({
        tags: z.array(z.string().min(2, {
            message: "Tag must be at least 2 characters.",
        })),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tags: [],
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        onTagsChange(values.tags)
    }

    return (
        <Form {...form}>
            <form onChange={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Add or change topics (up to 5) so readers know what your story is about</FormLabel>
                            <FormControl>
                                <InputTags value={field.value} onChange={field.onChange} />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>

    )
}

export default TagForm