import type { JSX } from "react"
import type React from "react"

type InputStyle = {
    icon: React.ElementType
    passwordIcon?: React.ElementType
    type?: string
    placeholder?: string
    value?: string
    category?: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    passwordVisibility?: () => void
}

const Input = (props: InputStyle):JSX.Element => {
    const {icon: Icon, passwordIcon: PasswordIcon, placeholder, value, handleChange, passwordVisibility, type, category} = props;
    return (
       <div className="relative mb-4 md:mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Icon className="size-4 md:size-5 text-green-500"/>
            </div>
            <input type={type} placeholder={placeholder}
            className='w-full pl-9 md:pl-10 pr-3 py-2 text-sm md:text-base 
            bg-gray-900 bg-opacity-50 
            rounded-lg border border-gray-700 
            focus:border-green-500 focus:ring-2 focus:ring-green-500 
            text-white placeholder-gray-400 transition duration-200'
            onChange={handleChange}
            value={value}
			/>
            {
                category === "password" && PasswordIcon ? 
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={passwordVisibility}>
                    <PasswordIcon className="size-4 md:size-5 text-green-500"/>
                </div> : null
            }
       </div>
    )
}

export default Input;