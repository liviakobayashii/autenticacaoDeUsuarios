import { ButtonHTMLAttributes } from "react";

export default function Button({
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="bg-blue-700 hover:bg-blue-900 duration-200 border border-white p-3 rounded-md self-end"
      {...props}
    >
      Enviar
    </button>
  );
}
