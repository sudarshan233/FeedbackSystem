import { useState, type JSX } from "react";

const Digits = ():JSX.Element => {
    const [borderColour, setBorderColour] = useState("border-gray-600");


    return (
        <div className="mb-4 lg:mb-6">
            <input className={`px-4 py-2 rounded-xl bg-gray-600
            outline-0 size-10 lg:size-12 text-white opacity-70
            text-sm md:text-base
            border ${borderColour}`} onClick={(): void => {
                setBorderColour((prevState: string): string => prevState === "border-gray-600" ? "border-green-500" : "border-gray-600")
            }}/>
        </div>
    )
}

export default Digits;