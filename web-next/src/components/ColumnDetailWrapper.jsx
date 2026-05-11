"use client";
import { ColumnDetail } from "./ColumnContent";
import { useRouter } from "next/navigation";

export const ColumnDetailWrapper = ({ id }) => {
  const router = useRouter();
  return (
    <ColumnDetail 
      columnId={id} 
      onBack={() => router.push("/column")} 
    />
  );
};
