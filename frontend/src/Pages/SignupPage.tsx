import { motion } from "framer-motion"; 
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState, type JSX } from "react";

import Input from "../Components/Input.tsx";
import { PasswordCriteria, PasswordStrengthBar } from "../Components/PasswordStrengthBar.tsx";
import { Link, useNavigate } from "react-router-dom";
import {useAuthStore} from "../../store/authStore.ts";
import toast from "react-hot-toast";

const SignupPage = ():JSX.Element => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { signup, error, isLoading } = useAuthStore();

    const handleSignup = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await signup(name, email, password);
            toast.success("Signed up successfully 🎉🎉🎉", {
                style: {
                    backgroundColor: '#1F2937',
                    color: "#F2F2F2"
                }
            })
            navigate('/verify-email');
        } catch (error) {
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
                <h1 className="text-2xl md:text-3xl font-bold text-center text-transparent bg-clip-text
                bg-gradient-to-r from-green-500 to-emerald-500">Create Account</h1>
            </div>
            <form onSubmit={(event:React.FormEvent):void => {
                handleSignup(event)
            }} className="px-4 md:px-6 lg:px-8">
                <Input icon={User} placeholder="Full Name" value={name} handleChange={(e) => setName(e.target.value)}/>
                <Input icon={Mail} placeholder="Email Address" value={email} handleChange={(e) => setEmail(e.target.value)}/>
                <Input icon={Lock} placeholder="Password" value={password} handleChange={(e) => setPassword(e.target.value)}/>
                
                {error && <p className="text-red-700 text-sm md:text-base
                mt-2 mb-2 md:mt-4 md:mb-4 lg:mt-6 lg:mb-6">{error}</p>}
                
                <PasswordStrengthBar password={password} />
                <PasswordCriteria password={password} />
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
                disabled={isLoading}>{isLoading ? <Loader className="animate-spin mx-auto"/> : "Sign Up"}</motion.button>
            </form>
            <div className="px-4 py-2 md:px-6 md:py-4 lg:px-8 lg:py-4
            bg-gray-900 opacity-50 flex justify-center
            rounded-b-2xl">
                <p className="text-sm text-gray-400">
                    Already have an account {" "}
                    <Link to={"/login"} className="text-green-400 hover:underline">
                    Login
                    </Link>
                </p>
            </div>
        </motion.div>
    )
}

export default SignupPage;