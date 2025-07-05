"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "creating" | "logging-in">(
    "idle"
  );

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
      <div className="relative flex-1 hidden items-center justify-center bg-gray-900 lg:flex">
        <div
          className="absolute inset-0 my-auto h-[500px]"
          style={{
            background:
              "linear-gradient(152.92deg, rgba(192,132,252,0.2) 4.54%, rgba(232,121,249,0.26) 34.2%, rgba(192,132,252,0.1) 77.55%)",
            filter: "blur(118px)",
          }}
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
              onClick={() => signIn("google")}
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
              disabled={status !== "idle"}
              className={`w-full px-4 py-2 text-white font-medium bg-indigo-600 rounded-lg transition ${
                status !== "idle"
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-indigo-500"
              }`}
            >
              {
                {
                  idle: "Create account",
                  creating: "Creating account…",
                  "logging-in": "Logging in…",
                }[status]
              }
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
