import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginFormSchema } from "../lib/formSchema";
import { z } from "zod";
import { supabase } from "../lib/supabaseClient";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const useLoginForm = () => {
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof loginFormSchema>> = async (
    data
  ) => {
    const { email, password } = data;
    try {
      // ログイン
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        // "Email not confirmed"がエラーに含まれている場合
        // メールアドレスを確認してください。というエラーメッセージを表示
        if (signInError.message.includes("Email not confirmed")) {
          setError("メールアドレスを確認してください。");
        }
        // "Invalid login credentials"がエラーに含まれている場合
        // そのようなユーザーは存在しません。というエラーメッセージを表示
        if (signInError.message.includes("Invalid login credentials")) {
          setError("そのようなユーザーは存在しません。");
        }
        return;
      }

      router.push("/");
    } catch (err) {
      if (err instanceof Error) {
        // console.log(err.message);
      }
    }
  };

  return { form, onSubmit, error };
};
