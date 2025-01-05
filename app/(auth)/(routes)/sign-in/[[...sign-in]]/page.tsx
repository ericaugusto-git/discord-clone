import { SignInForm } from "@/components/auth/sign-in-form"
import Link from "next/link"

export default function SignIn() {
  return (
    <div className="flex flex-col space-y-6 w-full max-w-96 md:min-w-96 mx-auto p-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to sign in
        </p>
      </div>
      <SignInForm />
      <p className="text-sm text-center text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  )
}