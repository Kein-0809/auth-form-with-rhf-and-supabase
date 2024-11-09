"use client";

import Link from "next/link";
import { supabase } from "./features/auth/lib/supabaseClient";
import Button from "./features/auth/components/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // "ブログ投稿"ボタンが押された時に実行される関数
  // ログインしているかどうかを確認して、ログインしている場合はブログ投稿ページに遷移、ログインしていない場合はログインページに遷移
  // 一般的にはログインしているかどうかのsessionやToken情報は、状態管理といわれてるライブラリやuseContextなどのグローバルでデータの値を管理することができるやつを使用する
  const handleBlogPost = async () => {
    // sessionを取得 (ログインしているかどうかを確認するトークンのようなもの)
    const { data } = await supabase.auth.getSession();
    console.log(data);
    if (data.session) {
      // ログインしている場合はブログ投稿ページに遷移
      router.push("/create-post");
    } else {
      // ログインしていない場合はログインページに遷移
      router.push("/auth/login");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h2 className="font-medium mb-5 text-3xl">Hello RHF & Zod</h2>
      <div className="flex gap-3">
        <Link
          href={"/auth/signup"}
          className="bg-red-500 py-3 px-5 rounded-md text-white hover:bg-red-600 duration-200"
        >
          新規登録
        </Link>
        <Link
          href={"/auth/login"}
          className="bg-blue-500 py-3 px-5 rounded-md text-white hover:bg-blue-600 duration-200"
        >
          ログイン
        </Link>
      </div>
      <Button
        colorClass="bg-slate-500 mt-4"
        // ログアウトボタンが押された時に実行される関数
        // Supabaseのauth.signOut関数を使用してログアウト
        onClick={async () => await supabase.auth.signOut()}
        type="button"
      >
        ログアウト
      </Button>
      {/* ブログ投稿ボタン */}
      <Button
        colorClass="bg-green-500 mt-4"
        onClick={handleBlogPost}
        type="button"
      >
        ブログ投稿
      </Button>
    </main>
  );
}
