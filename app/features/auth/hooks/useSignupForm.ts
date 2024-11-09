import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { signupFormSchema } from "../lib/formSchema";
import { z } from "zod";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useSignupForm = () => {
  // エラーメッセージを管理するstate
  const [error, setError] = useState<string>("");

  const router = useRouter();
  // signupFormSchemaを使用してバリデーションを行う
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof signupFormSchema>> = async (
    data
  ) => {
    // 分割代入でそれぞれの値をdataから取り出す
    const { username, email, password } = data;
    // signup (Supabaseのauth.signUp関数を使用)
    try {
      // ユーザーの新規登録
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        // console.log(signUpError);
        setError(signUpError.message);
        return;
      }

      const { error: userError } = await supabase
        // Supabaseで作った"User"テーブルにユーザー情報を挿入
        // Userテーブルを指定
        .from("User")
        // idはSupabaseが自動で生成するので、その他のユーザー情報を挿入
        .insert([{ id: data.user?.id, username, email }]);

      if (userError) {
        // console.log(userError.message);
        if (
          // "duplicate key value violates unique constraint"というエラーが含まれているかどうか
          // エラーが含まれている場合は、既に存在するユーザーであることを示すメッセージをセット
          userError.message.includes(
            "duplicate key value violates unique constraint"
          )
        ) {
          setError("既に存在するユーザーです。");
        }
        return;
      }

      router.push("/auth/email-confirm");
    } catch (err) {
      if (err instanceof Error) {
        // console.log(err.message);
      }
    }
  };

  return { form, onSubmit, error };
};
