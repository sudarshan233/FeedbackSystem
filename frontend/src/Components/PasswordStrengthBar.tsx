import { Check, X } from "lucide-react";
import type { JSX } from "react";

type PasswordCriteria = {
    label: string
    met: boolean
}

export const PasswordCriteria = ({password}: {password: string}):JSX.Element => {
    const criteria: PasswordCriteria[] = [
        { label: "At least 8 characters", met: password.length >= 6 },
        { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
        { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
        { label: "Contains number", met: /[0-9]/.test(password) },
        { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) }
    ]

    return (
        <div className="w-full h-max flex flex-col gap-1 mb-6">
            {criteria.map((criterion: PasswordCriteria, index: number): JSX.Element => {
                return (
                    <div key={index} className="flex items-center gap-2 text-sm">
                        {criterion.met ? <Check className="size-5 bg-green-500"/> : <X className="size-5 bg-gray-500"/>}
                        <span className={`transition-colors ease-linear duration-700 ${criterion.met ? "text-green-500" : "text-gray-500"}`}>{criterion.label}</span>
                    </div>
                )
            })}
        </div>
    )
}

export const PasswordStrengthBar = ({password}: {password: string}):JSX.Element => {
    const getStrength = (password: string):number => {
        let strength = 0;
        if(password.length >= 6) strength++;
        if(password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
        if(password.match(/\d/)) strength++;
        if(password.match(/[^a-zA-Z\d]/)) strength++;
        return strength;
    }

    const strength:number = getStrength(password);

    const getStrengthText = (strength:number):string => {
        if(strength === 0 ) return "Very Weak";
        if(strength === 0 ) return "Weak";
        if(strength === 0 ) return "Fair";
        if(strength === 0 ) return "Good";
        return "Strong";
    }

    const strengthText = getStrengthText(strength);
    return (
        <div className="w-full h-max flex flex-col gap-1 mb-2 md:mb-4 lg:mb-6">
            <div className="flex justify-between items-center w-full mb-1">
                <p className="text-xs text-gray-400">Password Strength</p>
                <p className="text-xs text-gray-400">{strengthText}</p>
            </div>
            <div className="w-full h-1 bg-gray-700 flex gap-1 overflow-hidden">
                <div className={`w-1/4 h-1 rounded transition-colors ease-linear duration-500 ${strength >= 1 ? "bg-red-600":"bg-gray-500"}`}></div>
                <div className={`w-1/4 h-1 rounded transition-colors ease-linear duration-500 ${strength >= 2 ? "bg-orange-600":"bg-gray-500"}`}></div>
                <div className={`w-1/4 h-1 rounded transition-colors ease-linear duration-500 ${strength >= 3 ? "bg-yellow-600":"bg-gray-500"}`}></div>
                <div className={`w-1/4 h-1 rounded transition-colors ease-linear duration-500 ${strength >= 4 ? "bg-green-600":"bg-gray-500"}`}></div>
            </div>
        </div>
    )
}