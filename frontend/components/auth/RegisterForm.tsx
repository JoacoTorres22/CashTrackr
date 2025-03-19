"use client"

import { register } from "@/actions/create-account-action"
import { useActionState } from "react"



export default function RegisterForm() {
    const [state, dispatch] = useActionState(register, {
        errors: []
    })

    console.log(state)

    return (

        <form
        className="mt-14 space-y-5"
        noValidate
        action={dispatch}
        >
            <div className="flex flex-col gap-2">
                <label
                    className="font-bold text-2xl"
                    htmlFor="email"
                    >Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="email"
                    />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    className="font-bold text-2xl"
                    >Name</label>
                <input
                    type="name"
                    placeholder="Name"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="name"
                    />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    className="font-bold text-2xl"
                    >Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="password"
                    />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    className="font-bold text-2xl"
                    >Repeat Password</label>
                <input
                    id="password_confirmation"
                    type="password"
                    placeholder="Repite Password de Registro"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="password_confirmation"
                    />
            </div>

            <input
                type="submit"
                value='Register'
                className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
            />
        </form>
    )
}