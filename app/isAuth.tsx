"use client";

import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}

const IsAuth: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  if (typeof window !== "undefined") {
    console.log(localStorage.getItem("qid") ? "ok" : "false");
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("qid")) {
        router.replace("/todos");
      } else {
        router.replace("/");
      }
    }
  }, [router]);

  return <div>{children}</div>;
};

export default IsAuth;
