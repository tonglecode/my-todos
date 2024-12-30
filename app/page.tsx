"use client";

import GoogleLogin from "@/components/auth/googleLogin";
import Login from "@/components/auth/login";
import { handleGoogleLogin } from "@/utils/googleLoginHanedle";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <header className="text-center">
        <div className="flex gap-8 justify-center items-center">
          <div>
            <h1 className="text-5xl font-bold mb-4">Welcome to My-Todos</h1>
            <p className="text-xl max-w-lg">
              Organize your life with ease. Sign up today and start managing
              your tasks like a pro.
            </p>
          </div>
          <div>
            <Login />
            <GoogleLogin onGoogleLogin={handleGoogleLogin} />
          </div>
        </div>
      </header>
      <div className="mt-10 flex flex-col items-center gap-4"></div>
      <footer className="absolute bottom-4 text-sm text-white/70">
        &copy; 2024 My-Todos. All rights reserved.
      </footer>
    </div>
  );
}
