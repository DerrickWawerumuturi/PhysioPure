import { authFormSchema } from "@/lib/utils"
import { Control, FieldPath } from "react-hook-form"
import { z } from "zod"
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"


const formSchema = authFormSchema('sign-up')
interface CustomProps {
    control: Control<z.infer<typeof formSchema>>
    name: FieldPath<z.infer<typeof formSchema>>
    placeholder: string
    label: string
}

const CustomInput = ({ control, name, placeholder, label }: CustomProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className="flex flex-col gap-1.5">
                    <FormLabel className="text-[14px] leading-[14px] w-full max-w-[420px] font-medium text-gray-700">{label}</FormLabel>
                    <div className="flex w-full flex-col">
                        <FormControl>
                            <Input
                                placeholder={placeholder}
                                className="input-class"
                                type={name === "password" ? 'password' : "text"}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage className="text-[12px] leading-[12px] text-red-500" />
                    </div>
                </div>
            )}
        >

        </FormField>
    )
}

export default CustomInput