import React, { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Eye, EyeOff, Loader, Lock } from 'lucide-react';

import Input from '../Components/Input';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

const ResetPasswordPage = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true)
    const { resetPassword, error, isLoading } = useAuthStore();
    const { token } = useParams();
    const navigate = useNavigate();

    const handleResetPassword = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await resetPassword(token, newPassword, confirmPassword);
            toast.success("Password has been reset successfully 🎉🎉🎉", {
                style: {
                    backgroundColor: '#1F2937',
                    color: "#F2F2F2"
                }
            });
            navigate('/');
        } catch (err) {
            console.error(error);
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
                    bg-gradient-to-r from-green-500 to-emerald-500">Reset Password</h1>
                </div>
                <form onSubmit={(event: FormEvent): void => {
                    handleResetPassword(event)
                }} className="px-4 md:px-6 lg:px-8">
                    
                    <Input 
                    type={showNewPassword ? "text" : "password"} icon={Lock} placeholder="New Password" 
                    value={newPassword} handleChange={(e) => setNewPassword(e.target.value)}
                    category='password' passwordVisibility={() => setShowNewPassword((prevState) => !prevState)}
                    passwordIcon={showNewPassword ? Eye : EyeOff} />
                    <Input 
                    type={showConfirmPassword ? "text" : "password"} icon={Lock} placeholder="Confirm Password" 
                    value={confirmPassword} handleChange={(e) => setConfirmPassword(e.target.value)}
                    category='password' passwordVisibility={() => setShowConfirmPassword((prevState): boolean => !prevState)}
                    passwordIcon={showConfirmPassword ? Eye : EyeOff} />

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
                    type="submit" disabled={isLoading}>{isLoading ? <Loader className="animate-spin mx-auto"/> : "Reset Password"}</motion.button>
                </form>
            </motion.div>
    )
}

export default ResetPasswordPage
