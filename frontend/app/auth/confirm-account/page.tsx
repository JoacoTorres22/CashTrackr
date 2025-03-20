import ConfirmAccountForm from "@/components/auth/ConfirmAccountForm";


export default function ConfirmAccountPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Confirm Account</h1> 
      <p className="text-3xl font-bold">Check your email and put the code that you received 
        <span className="text-amber-500"> by email</span>
      </p>
      <ConfirmAccountForm />
    </>
  )
}
