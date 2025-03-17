import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Children, ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function CustomCard({ title, description, children }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{children}</p>
      </CardContent>
    </Card>
  );
}
