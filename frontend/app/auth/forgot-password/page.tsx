import ForgotPasswordForm from "@/app/components/auth/ForgotPasswordForm"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata : Metadata = {
    title: "Cashtrackr - Forgot Password",
    description: "Cashtrackr - Forgot Password",
}

export default function ForgotPassword() {
  return (
    <>
        <h1 className="font-black text-6xl text-purple-950">Forgot Password?</h1>
        <p className="text-3xl font-bold"> here you can <span className="text-amber-500">restore it</span></p>

        <ForgotPasswordForm />

        <nav className="mt-10 flex flex-col space-y-4">
            <Link
                href="/auth/login"
                className="text-center text-gray-500"
            >
                Do you already have an account? Login
            </Link>
            <Link
                href="/auth/register"
                className="text-center text-gray-500"
            >
                You do not have an account? Create One
            </Link>
        </nav>
    </>
  )
}
