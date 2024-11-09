import React from "react";
import { UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  // react-hook-formのUseFormRegister関数を使用してフィールドを登録
  register: UseFormRegister<any>;
}

// フォームのそれぞれの項目を表す入力フィールドのコンポーネント
// このコンポーネントはフォームのそれぞれの項目を表す入力フィールドを生成する
const InputFiled = ({
  name,
  label,
  type,
  placeholder,
  register,
}: InputFieldProps) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-gray-700 text-sm font-bold mb-1 block mt-4"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        className="border rounded w-full shadow py-3 px-4 text-gray-700 leading-tight focus:outline-none"
        {...register(name, { required: "この項目は必須です。" })}
      />
    </div>
  );
};

export default InputFiled;
