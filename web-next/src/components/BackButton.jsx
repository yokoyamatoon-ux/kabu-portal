"use client";
import { useRouter } from "next/navigation";

export const BackButton = ({ children, className }) => {
  const router = useRouter();
  return (
    <button onClick={() => router.push("/column")} className={className}>
      {children}
    </button>
  );
};
