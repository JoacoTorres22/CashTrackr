import LoginForm from "@/app/components/auth/LoginForm"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata : Metadata = {
    title: "Cashtrackr - Login",
    description: "Login to Cashtrackr",
}

export default function Login() {
  return (
    <>
        <h1 className="font-black text-6xl text-purple-950">Login</h1>
        <p className="text-3xl font-bold"> and control your <span className="text-amber-500">finances</span></p>

        <LoginForm />

        <nav className="mt-10 flex flex-col space-y-4">
            <Link
                href="/auth/register"
                className="text-center text-gray-500"
            >
                You do not have an account? Create One
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
