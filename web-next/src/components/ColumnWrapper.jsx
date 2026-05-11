"use client";
import { ColumnList } from "./ColumnContent";
import { useRouter } from "next/navigation";

export const ColumnWrapper = () => {
  const router = useRouter();
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16">
      <h1 className="border-b-4 border-secondary/50 pb-2 mb-6 text-2xl md:text-3xl font-black text-text">
        お金のコラム一覧｜役立つ金融知識をわかりやすく解説
      </h1>
      <ColumnList onSelect={(id) => router.push(`/column/${id}`)} />
    </div>
  );
};
