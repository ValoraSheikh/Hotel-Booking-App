"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [processStatus, setStatus] = useState<"idle" | "submitting">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    // call next-auth
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/",
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push(res?.url || "/");
    }

    setStatus("idle");
  };

  return (
    <main className="w-full h-screen flex items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
          <Image
            src="/img/logo.png"
            alt="Logo"
            width={100}
            height={50}
            className="mx-auto"
          />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log in
            </h3>
            <p>
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {error && <p className="mt-4 text-center text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <input
            suppressHydrationWarning
              type="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={processStatus === "submitting"}
            className={`w-full px-4 py-2 text-white font-medium bg-indigo-600 rounded-lg transition ${
              processStatus === "submitting"
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-indigo-500 active:bg-indigo-700"
            }`}
          >
            {processStatus === "submitting" ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-x-3 py-2.5 mt-5 border rounded-lg text-sm font-medium hover:bg-gray-50 transition duration-150 active:bg-gray-100"
        >
          <Image
            src="https://raw.githubusercontent.com/sidiDev/remote-assets/7cd06bf1d8859c578c2efbfda2c68bd6bedc66d8/google-icon.svg"
            alt="Google"
            width={20}
            height={20}
          />
          Continue with Google
        </button>
      </div>
    </main>
  );
}
