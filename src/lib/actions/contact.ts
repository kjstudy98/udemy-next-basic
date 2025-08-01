"use server";

import { redirect } from "next/navigation";
import { ContactSchema } from "@/validations/contact";
import { prisma } from "../prisma";

// ActionStateの型定義
type ActionState = {
  success: boolean;
  errors: {
    name?: string[];
    email?: string[];
  };
  serverError?: string;
};

export async function submitContactForm(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const name = formData.get("name");
  const email = formData.get("email");

  // バリデーション
  const validationResult = ContactSchema.safeParse({ name, email });
  if (!validationResult.success) {
    const errors = validationResult.error.flatten().fieldErrors;
    console.log("サーバ側でエラー", errors);
    return {
      success: false,
      errors: {
        name: errors.name ?? [],
        email: errors.email ?? [],
      },
    };
  }

  // DB登録
  const existingRecord = await prisma.contact.findUnique({
    where: { email },
  });
  // メアドの存在チェック
  if (existingRecord) {
    return {
      success: false,
      errors: {
        name: [],
        email: ["このメールアドレスは登録されています"],
      },
    };
  }

  // データ登録
  await prisma.contact.create({
    data: {
      name,
      email,
    },
  });

  console.log("送信されたデータ：", { name, email });
  redirect("/contacts/complete");
}
