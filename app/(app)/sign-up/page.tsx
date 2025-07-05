"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignUpPage() {
  const { status } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [processStatus, setStatus] = useState<
    "idle" | "creating" | "logging-in"
  >("idle");

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/"); // redirect to home or dashboard
    }
  }, [status, router]);

  // Optional: render nothing while checking
  if (status === "loading") return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus("creating");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setStatus("logging-in");

      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      console.log(signInRes);

      if (signInRes?.ok) {
        router.push("/");
      } else {
        setError("Auto-login failed. Please login manually.");
        router.push("/sign-in");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setStatus("idle");
    }
  };

  return (
    <main className="w-full flex min-h-screen">
      {/* Left Section - Hidden on mobile */}
      <div className="relative flex-1 hidden lg:block h-screen">
        <Image
          src=" https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Signup"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Section - Form */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
          <div>
            <Image src="/img/logo.png" alt="Logo" width={90} height={40} />
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl text-center">
                Sign up
              </h3>
              <p className="text-center">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>

          {/* OAuth buttons (e.g. Google) */}
          <div className="grid grid-cols-3 gap-x-3">
            <button
              type="button"
              className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 transition"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              <Image
                src="https://raw.githubusercontent.com/sidiDev/remote-assets/7cd06bf1d8859c578c2efbfda2c68bd6bedc66d8/google-icon.svg"
                alt="Google"
                width={20}
                height={20}
              />
            </button>
          </div>

          <div className="relative">
            <span className="block w-full h-px bg-gray-300"></span>
            <p className="absolute inset-x-0 mx-auto w-fit bg-white px-2 -top-2 text-sm">
              Or continue with
            </p>
          </div>

          {error && <p className="text-center text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-medium">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full mt-2 px-3 py-2 bg-transparent border rounded-lg focus:border-indigo-600 outline-none text-gray-700"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-2 px-3 py-2 bg-transparent border rounded-lg focus:border-indigo-600 outline-none text-gray-700"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-2 px-3 py-2 bg-transparent border rounded-lg focus:border-indigo-600 outline-none text-gray-700"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={processStatus !== "idle"}
              className={`w-full px-4 py-2 text-white font-medium bg-indigo-600 rounded-lg transition ${
                processStatus !== "idle"
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-indigo-500"
              }`}
            >
              {
                {
                  idle: "Create account",
                  creating: "Creating account…",
                  "logging-in": "Logging in…",
                }[processStatus]
              }
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
