import { z } from "zod";

export const ContactSchema = z.object({
  name: z
    .string()
    .min(3, "名前は3文字以上で入力してください")
    .max(20, "名前は20文字以下で入力してください"),
  email: z
    .string()
    .min(1, "メールアドレスは必須です")
    .email("eメールの形式で入力してください"),
});

// 型を定義
export type ContactType = z.infer<typeof ContactSchema>;
