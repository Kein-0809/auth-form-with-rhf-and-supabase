import { z } from "zod";

// サインアップフォームのバリデーションのためのスキーマ
export const signupFormSchema = z.object({
  // ユーザー名のバリデーション
  username: z
    .string()
    .min(2, { message: "ユーザー名は2文字以上で入力してください。" }),
  // メールアドレスのバリデーション
  email: z.string().email({ message: "メールアドレスが正しくありません。" }),
  // パスワードのバリデーション
  password: z
    .string()
    .min(6, { message: "ユーザー名は6文字以上で入力してください。" })
    .max(10, { message: "パスワードは10文字以内で入力してください。" }),
});

// ログインフォームのバリデーションのためのスキーマ
export const loginFormSchema = z.object({
  // メールアドレスのバリデーション
  email: z.string().email({ message: "メールアドレスが正しくありません。" }),
  // パスワードのバリデーション
  password: z
    .string()
    .min(6, { message: "ユーザー名は6文字以上で入力してください。" })
    .max(10, { message: "パスワードは10文字以内で入力してください。" }),
});
