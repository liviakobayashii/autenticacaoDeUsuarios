import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReactNode } from "react";
import { Icon } from "@iconify/react";

type Props = {
  title: ReactNode;
  icon: string;
  description: string;
  content: number | string;
};

export default function TopCard({ title, icon, description, content }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">
            <h1>{title}</h1>
            <Icon icon={icon} className="text-blue-600 font-bold text-xl" />
          </div>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
    </Card>
  );
}
