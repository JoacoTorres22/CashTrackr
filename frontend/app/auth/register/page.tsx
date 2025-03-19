import type { Metadata } from "next"
import Link from "next/link"
import RegisterForm from "@/components/auth/RegisterForm"

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

        <nav className="mt-10 flex flex-col space-y-4">
            <Link
                href="/auth/login"
                className="text-center text-gray-500"
            >
                Do you already have an account? Login
            </Link>
            <Link
                href="/auth/forgot-password"
                className="text-center text-gray-500"
            >
                Do you forget your password? Reset it
            </Link>
        </nav>
    </>
  )
}
