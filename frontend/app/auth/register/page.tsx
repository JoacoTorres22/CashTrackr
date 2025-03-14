import RegisterForm from "@/app/components/auth/RegisterForm"
import type { Metadata } from "next"

export const metadata : Metadata = {
    title: "Cashtrackr - Register",
    description: "Register to Cashtrackr",
}

export default function RegisterPage() {
  return (
    <>
        <h1 className="font-black text-6xl text-purple-950">Create Account</h1>
        <p className="text-3xl font-bold"> and control your <span className="text-amber-500">finances</span></p>

        <RegisterForm />
    </>
  )
}
