import { ButtonHTMLAttributes } from "react";

export default function Button({
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="border border-white p-3 rounded-md self-end" {...props}>
      Enviar
    </button>
  );
}
