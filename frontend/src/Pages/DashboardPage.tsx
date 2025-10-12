import type { JSX, FormEvent } from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
 import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../store/authStore";

const DashboardPage = (): JSX.Element => {
    const { isLoading, logout} = useAuthStore();
    const navigate = useNavigate()

    const handleLogout = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await logout();
            toast.success("Logged out successfully 🎉🎉🎉", {
                style: {
                    backgroundColor: '#1F2937',
                    color: "#F2F2F2"
                }
            });
            navigate('/login');
        } catch(error) {
            console.error(error)
        }
    }
    return(
        <form onSubmit={(event:React.FormEvent):void => {
                handleLogout(event)
            }} className="px-4 md:px-6 lg:px-8">
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
                disabled={isLoading}>{isLoading ? <Loader className="animate-spin mx-auto"/> : "Logout"}
        </motion.button>
            </form>
        
    )

}

export default DashboardPage