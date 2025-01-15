/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserContext } from "@/utils/userContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { GoogleLogoColor } from "../svg/googleLogo-color";

declare global {
  interface Window {
    google: any;
  }
}

interface GoogleLoginProps {
  onGoogleLogin: (response: any) => Promise<void>;
}

const GoogleLogin = ({ onGoogleLogin }: GoogleLoginProps) => {
  const [loading, setLoading] = useState(false);
  const userData = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    const loadGoogleScript = () => {
      if (typeof window.google === "undefined") {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = initializeGoogleButton;
      } else {
        initializeGoogleButton();
      }
    };

    const handleGoogleLogin = async (response: any) => {
      try {
        setLoading(true);
        await onGoogleLogin(response);
        await userData?.fetchUser(); // 사용자 정보 갱신
        router.push("/todos"); // 로그인 성공 후 이동
        setLoading(false);
      } catch (error) {
        console.error("Login failed:", error);
        setLoading(false);
      }
    };

    const initializeGoogleButton = () => {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogleLogin,
      });
    };

    loadGoogleScript();
    userData?.fetchUser();
  }, [onGoogleLogin, userData, router]);

  const handleCustomGoogleLogin = () => {
    window.google.accounts.id.prompt();
  };

  return (
    <div className="wrap w-[350px] mx-auto">
      <div className="flex flex-col items-center">
        <div className="text-[4rem] text-center my-[48px] font-sans">
          Log in
        </div>
        <div className="w-64">
          {loading ? (
            <div className="spinner" />
          ) : (
            <button
              onClick={handleCustomGoogleLogin}
              className="w-full flex items-center justify-center gap-3 px-4 py-3  border rounded-full text-white hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors"
            >
              <GoogleLogoColor size={22} />
              <span>Continue with Google</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoogleLogin;
