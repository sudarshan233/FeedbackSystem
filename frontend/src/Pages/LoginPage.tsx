import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Loader, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import Input from "../Components/Input";
import { useAuthStore } from "../../store/authStore";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();
    const { login, isLoading, error } = useAuthStore();

    const handleLogin = async (event:React.FormEvent):Promise<void> => {
        event.preventDefault();

        try {
            await login(email, password);
            toast.success("Logged in successfully 🎉🎉🎉", {
                style: {
                    backgroundColor: '#1F2937',
                    color: "#F2F2F2"
                }
            });
            navigate('/');
            
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
                bg-gradient-to-r from-green-500 to-emerald-500">Welcome Back</h1>
            </div>
            <form onSubmit={(event:React.FormEvent):void => {
                handleLogin(event)
            }} className="px-4 md:px-6 lg:px-8">
                
                <Input 
                icon={Mail} placeholder="Email Address" 
                value={email} handleChange={(e) => setEmail(e.target.value)}
                />
                <Input 
                icon={Lock} placeholder="Password" 
                value={password} handleChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"} category="password"
                passwordIcon={showPassword ? Eye : EyeOff} 
                passwordVisibility={() => setShowPassword((prevState: boolean) => !prevState)}/>
                
                <p className="text-sm text-gray-400 mb-2 md:mb-6">
                    <Link to={"/forgot-password"} className="text-green-400 hover:underline">
                    Forgot password?
                    </Link>
                </p>

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
                type="submit" disabled={isLoading}>{isLoading ? <Loader className="animate-spin mx-auto"/> : "Login"}</motion.button>
            </form>
            <div className="px-4 py-2 md:px-6 md:py-4 lg:px-8 lg:py-4
            bg-gray-900 opacity-50 flex justify-center
            rounded-b-2xl">
                <p className="text-sm text-gray-400">
                    Don't have an account {" "}
                    <Link to={"/signup"} className="text-green-400 hover:underline">
                    Signup
                    </Link>
                </p>
            </div>
        </motion.div>
    ) 
}

export default LoginPage;