/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import Link from "next/link";
import user from "@/public/user.svg";
import Image from "next/image";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import resizeFile from "@/utils/resizeFile";
import { MdOutlineCancel } from "react-icons/md";

export default function SignUp() {
  //   const [resizedImage, setResizedImage] = useState<string>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoBase64, setPhotoBase64] = useState<string>();
  //   const [message, setMessage] = useState("");
  const [isPasswordMarking, setIsPasswordMarking] = useState(true);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const image = await resizeFile(file);
        // setResizedImage(image);
        setPhotoBase64(image);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}register`, {
        name,
        email,
        password,
        photoBase64,
      });
      //   setMessage(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white h-screen pt-[130px] bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <div className="wrap w-[350px] mx-auto">
        <div className="border">
          <div className="text-[4rem] text-center my-[48px] font-sans">
            Sign up
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-[270px] mx-auto flex flex-col gap-[6px]"
            action=""
          >
            <input
              className="w-full border h-[38px] bg-[#fafafa] rounded-sm px-2"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <input
              className="w-full border h-[38px] bg-[#fafafa] rounded-sm px-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <div className="relative">
              <input
                className="w-full border h-[38px] bg-[#fafafa] rounded-sm px-2"
                type={`${isPasswordMarking ? "password" : "text"}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />

              <div
                className="absolute right-3 top-2"
                style={{ cursor: "pointer" }}
                onClick={() => setIsPasswordMarking(!isPasswordMarking)}
              >
                {isPasswordMarking ? (
                  <AiOutlineEye size={20} />
                ) : (
                  <AiOutlineEyeInvisible size={20} />
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center items-center relative">
              <label htmlFor="file">
                <Image
                  src={user}
                  className="rounded-full  my-8  border"
                  style={{
                    width: "120px",
                    height: "120px",
                    backgroundSize: "cover",
                  }}
                  alt=""
                />

                <div
                  className="absolute rounded-full border top-[32px]"
                  style={{
                    width: "120px",
                    height: "120px",
                    backgroundImage: `url(${photoBase64})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                />
              </label>
              {photoBase64 && (
                <div
                  className="absolute top-7 right-16 text-slate-500"
                  onClick={() => setPhotoBase64(undefined)}
                >
                  <MdOutlineCancel size={20} />
                </div>
              )}
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>

            <button
              type="submit"
              className="bg-[#6bb5f9] p-2 rounded-lg my-2 text-white font-bold text-center text-sm"
            >
              Sign up
            </button>
          </form>
          <div className="w-[270px] mx-auto flex items-center my-2">
            <div className="h-[0px] border-b w-full" />
            <div className="mx-4 opacity-50 font-bold text-sm">OR</div>
            <div className="h-[0px] border-b w-full" />
          </div>
          <div className="mx-auto text-center flex flex-col gap-6 my-6 text-sm text-[#385185]">
            <Link href="/auth/login" className="font-bold">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
