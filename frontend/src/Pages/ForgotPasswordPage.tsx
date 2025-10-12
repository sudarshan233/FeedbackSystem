import { motion } from "framer-motion"
import { ArrowLeft, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import Input from "../Components/Input";

import { useAuthStore } from "../../store/authStore";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { forgotPassword, error } = useAuthStore();

    const handleForgotPassword = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true)
        try {
            await forgotPassword(email);
            toast.success("Password Reset Link sent successfully 🎉🎉🎉", {
                style: {
                    backgroundColor: '#1F2937',
                    color: "#F2F2F2"
                }
            })

        } catch(error) {
            console.error(error)
        }
    }
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
                bg-gradient-to-r from-green-500 to-emerald-500">Forgot Password</h1>
                {
                    isSubmitted ? null : <p className="text-sm text-center text-white opacity-50">
                    Enter your email address and we'll send you a link to reset your password</p>
                }
            </div>
            {
                isSubmitted ? <div className="w-full flex flex-col justify-center items-center
                mb-2 md:mb-4 lg:mb-6">
                    <div className=" bg-green-500 rounded-full
                    flex justify-center items-center size-20 md:size-24
                    mb-2 md:mb-4 lg:mb-6">
                        <Mail className="size-10 md:size-12 stroke-white"/>
                    </div>
                    <p className="text-sm text-center text-white opacity-50">
                    If an account exists for {email}, you wil receive a password reset link shortly</p>
                </div>
                : <form onSubmit={handleForgotPassword} className="px-4 md:px-6 lg:px-8">
                    <Input icon={Mail} placeholder="Email Address" value={email} handleChange={(e) => setEmail(e.target.value)}/>
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
                    >Send Reset Link</motion.button>
                </form>
            }
            <div className="px-4 py-2 md:px-6 md:py-4 lg:px-8 lg:py-4
                bg-gray-900 opacity-50 flex justify-center
                rounded-b-2xl">
                    <p className="flex gap-1 md:gap-2 text-sm text-gray-400">
                        <ArrowLeft className="stroke-green-500 size-4 md:size-5"/>
                        <Link to={"/login"} className="text-green-400 hover:underline">
                        Back to Login
                        </Link>
                    </p>
                </div>
        </motion.div>
    )
}

export default ForgotPasswordPage;