import { SignUpForm } from "@/components/auth/sign-up-form"
import Link from "next/link"

export default function SignUp() {
  return (
    <div className="flex flex-col space-y-6 w-full max-w-md mx-auto p-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your details to sign up
        </p>
      </div>
      <SignUpForm />
      <p className="text-sm text-center text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}