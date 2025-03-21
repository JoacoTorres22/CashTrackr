"use client"
import { useActionState, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { confirmAccount } from "@/actions/confirm-account-action"
import { PinInput, PinInputField } from "@chakra-ui/pin-input" 

export default function ConfirmAccountForm() {

    const router = useRouter()
    const [isComplete, setIsComplete] = useState(false)
    const [token, setToken] = useState('')
    const confirmAccountWithToken = confirmAccount.bind(null, token)
    const [state, dispatch] = useActionState(confirmAccountWithToken, {
        errors: [],
        success: ''
    })


    useEffect(() => {
        if (isComplete) {
            dispatch()
        }
    }, [isComplete])


    useEffect(() => {
        if (state.errors) {
            state.errors.forEach(error => {
                toast.error(error)
            })
        }
        if (state.success) {
            toast.success(state.success, {
                onClose: () => {
                    router.push('/auth/login')
                }
            })
        }
    }, [state])


    const handleChange = (token: string) => {
        setToken(token)
    }

    const handleComplete = () => {
        setIsComplete(true)
    }
    return (
        <>
            <div className="flex flex-col gap-5 my-10">
                <div className="flex gap-2">
                    <label htmlFor="code" className="text-lg font-semibold">Code</label>
                    <PinInput
                        value={token}
                        onChange={handleChange}
                        onComplete={handleComplete}
                        >
                        <PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white"/>
                        <PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white"/>
                        <PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white"/>
                        <PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white"/>
                        <PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white"/>
                        <PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white"/>
                    </PinInput>
                </div>
            </div>
        </>
    )
}
