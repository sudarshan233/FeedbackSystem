import {create} from 'zustand';
import { AxiosError } from 'axios';

import api from "../lib/axios.ts"

type AuthStore = {
    user: any,
    isAuthenticated: boolean,
    error: string | null,
    isLoading: boolean,
    isCheckingAuth: boolean,
    signup: (name: string, email: any, password: string) => Promise<void>,
    verifyEmail: (code: string) => Promise<void>
    checkAuth: () => Promise<void>
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    forgotPassword: (email: string) => Promise<void>
    resetPassword: (token: string | undefined, newPassword: string, confirmPassword: string) => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    signup: async(name, email, password) => {
        set({
            isLoading: true,
            error: null
        })
        try {
            const response = await api.post("auth/signup", {
                name,
                email,
                password,
                role: "user"
            });
            set ({
                user: response.data.user,
                isAuthenticated: true,
                isLoading: false
            })
        } catch(err: unknown){
            const error = err as AxiosError<{ message?: string }>;

            const message: string = error.response?.data?.message || "Error signing up";
            set({
                error: message, isLoading: false
            });
            throw error;
        }
    },
    verifyEmail: async(code) => {
        set({
            isLoading: true,
            error: null
        });
        try {
            const response = await api.post("auth/verify-email", {
                code
            });
            set ({
                user: response.data.user,
                isAuthenticated: true,
                isLoading: false
            })
        } catch(err: unknown){
            const error = err as AxiosError<{ message?: string }>;

            const message: string = error.response?.data?.message || "Error verifying email";
            set({
                error: message, isLoading: false
            });
            throw error;
        }
    },

    checkAuth: async() => {
        set({
            isCheckingAuth: true,
            error: null
        });
        try {
            const response = await api.get("auth/check-auth");
            set ({
                user: response.data.user,
                isAuthenticated: true,
                isCheckingAuth: false
            })
        } catch(err: unknown){
            set({
                error: null, 
                isCheckingAuth: false,
                isAuthenticated: false
            });
            
        }
    },

    login: async(email, password) => {
        set({
            isLoading: true,
            error: null
        });
        try {
            const response = await api.post('auth/login', {
                email,
                password
            });
            set({
                isAuthenticated: true,
                user: response.data.user,
                error: null,
                isLoading: false
            });
        } catch(err: unknown){
            const error = err as AxiosError<{ message?: string }>;

            const message: string = error.response?.data?.message || "Error logging in";
            set({
                error: message, isLoading: false
            });
            throw error;
        }
    },

    logout: async () => {
        set({
            isLoading: true,
            error: null
        });
        try {
            await api.post('auth/logout');
            set({
                isAuthenticated: false,
                user: null,
                error: null,
                isLoading: false
            });
        } catch(err: unknown){
            const error = err as AxiosError<{ message?: string }>;

            const message: string = error.response?.data?.message || "Error logging out";
            set({
                error: message, isLoading: false
            });
            throw error;
        }
    },
    
    forgotPassword: async(email) => {
        set({
            isLoading: true,
            error: null
        });
        try {
            await api.post('auth/forgot-password', {
                email
            });
            set({
                isLoading: false,
                error: null
            })
        } catch(err: unknown){
            const error = err as AxiosError<{ message?: string }>;

            const message: string = error.response?.data?.message || "Error in forgot password";
            set({
                error: message, isLoading: false
            });
            throw error;
        }
    },
    
    resetPassword: async(token, newPassword, confirmPassword) => {
        set({
            isLoading: true,
            error: null
        });
        try {
            if(confirmPassword !== newPassword) {
                throw new Error("The confirmed password does not match the new password. Try Again!!!");
            }
                
            await api.post(`auth/reset-password/${token}`, {
                newPassword,
            });
            set({
                isLoading: false,
                error: null
            })
        } catch(err: unknown){
            const error = err as AxiosError<{ message?: string }>;

            const message: string = error.response?.data?.message || "Error in reset password";
            set({
                error: message, isLoading: false
            });
            throw error;
        }
    }
}))