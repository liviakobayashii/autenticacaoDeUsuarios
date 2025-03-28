import { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function MobileCard({ title, description, children }: Props) {
  return (
    <div className="flex flex-col md:hidden m-4">
      <h1 className="text-3xl text-blue-600 font-bold">{title}</h1>
      <div className="text-gray-700 mb-8">{description}</div>
      {children}
    </div>
  );
}
