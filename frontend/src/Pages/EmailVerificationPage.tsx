import { useEffect, useRef, useState, type FormEvent, type JSX } from "react";
import { motion } from "framer-motion";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

import { useAuthStore } from "../../store/authStore";

const EmailVerificationPage = ():JSX.Element => {
    const [code, setCode] = useState(["", "", "", "", "", "",]);
    const inputRefs: React.RefObject<(HTMLInputElement | null)[]> = useRef<(HTMLInputElement | null)[]>([]);
    const navigate: NavigateFunction = useNavigate();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const { verifyEmail, error, isLoading } = useAuthStore();

    const handleChange = (index: number, value: string): void => {
        const newCode = [...code];

        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for(let i = 0; i < 6; i++)
                newCode[i] = pastedCode[i] || "";
            setCode(newCode);

            const lastFilledIndex = newCode.findIndex((digit: string) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1: 5;
            inputRefs.current[focusIndex]
            
        } else {
            newCode[index] = value;
            setCode(newCode);

            if(value && index < 5)
                inputRefs.current[index + 1]?.focus();
        }
    }
    
    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>): void => {
        if(e.key === "Backspace" && !code[index] && index > 0)
            inputRefs.current[index - 1]?.focus();
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void>=> {
        try {
            const verificationCode: string = code.join("");
            await verifyEmail(verificationCode);
            
            toast.success("Email Verified successfully 🎉🎉🎉", {
                style: {
                    backgroundColor: '#1F2937',
                    color: "#F2F2F2"
                }
            })

            navigate('/');
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setActiveIndex(code.findIndex((digit: string) => digit !== ""))
        if(code.every((digit: string) => digit !== "")){
            void handleSubmit({ preventDefault: () => {} } as React.FormEvent<HTMLFormElement>);
            navigate("/")
        }
    }, [code])

    return (
        <motion.div
        initial={{
            opacity: 0,
            y: 20
        }}
        animate={{
            opacity: 1,
            y: 0
        }}
        transition={{
            duration: 0.7
        }}
        className="max-w-sm md:max-w-md lg:max-w-lg w-full mx-auto bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-3xl rounded-2xl shadow-xl">
            <div className="p-4 md:p-6 lg:p-8">
                <h1 className="text-2xl md:text-3xl 
                mb-2 md:mb-4 lg:mb-6
                font-bold text-center text-transparent bg-clip-text
                bg-gradient-to-r from-green-500 to-emerald-500">Verify Your Email</h1>
                <p className="text-sm text-center text-white opacity-50">Enter the 6-digit code sent to your email address</p>
            </div>
            <form onSubmit={handleSubmit} className="px-4 md:px-6 lg:px-8">
                <div className="flex mb-4 lg:mb-6 justify-between">
                    {code.map((digit: string, index: number) => {
                        return (
                            <input 
                            key={index}
                            ref={(el) => {
                                inputRefs.current[index] = el
                            }}
                            type="text"
                            maxLength={6}
                            value={digit}
                            className={`px-4 py-2 rounded-xl bg-gray-600
                            outline-0 size-12 lg:size-14 text-white opacity-70
                            text-sm md:text-base
                            border ${activeIndex === index ? "border-green-500" : "border-gray-600"}
                            transition-colors ease-linear duration-200`}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}/>
                        )
                    })}

                </div>

                {error && <p className="text-red-700 text-sm md:text-base
                mt-2 mb-2 md:mt-4 md:mb-4 lg:mt-6 lg:mb-6">{error}</p>}
                
                <motion.button className="w-full text-gray-200 font-bold
                text-sm md:text-base lg:text-xl
                p-2 md:p-4
                mb-2 md:mb-4 lg:mb-6
                rounded-lg border-gray-700 
                focus:border-green-500 focus:ring-2 focus:ring-green-500
                bg-gradient-to-r from-green-500 to-emerald-700"
                whileHover={{scale: 1.02}}
                whileTap={{scale: 0.98}}
                type="submit"
                disabled={isLoading}>{isLoading ? <Loader className="animate-spin mx-auto"/> : "Verify Email"}</motion.button>
            </form>
        </motion.div>
    )
}

export default EmailVerificationPage;