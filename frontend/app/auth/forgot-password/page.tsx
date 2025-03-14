import ForgotPasswordForm from "@/app/components/auth/ForgotPasswordForm"
import type { Metadata } from "next"

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
    </>
  )
}
