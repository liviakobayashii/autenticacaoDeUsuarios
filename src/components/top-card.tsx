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
  titleMob: ReactNode;
  icon: string;
  description: string;
  content: number | string;
};

export default function TopCard({
  title,
  titleMob,
  icon,
  description,
  content,
}: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-3">
        <CardTitle>
          <div className="flex gap-2 items-center">
            <Icon icon={icon} className="text-blue-600 font-bold text-xl" />
            <h1 className=" sm:hidden text-sm text-gray-900 font-normal">
              {titleMob}
            </h1>
            <h1 className=" text-gray-900 font-bold max-sm:font-normal max-sm:hidden lg:text-xl ">
              {title}
            </h1>
            <Icon
              icon={icon}
              className="hidden text-blue-600 font-bold text-xl"
            />
          </div>
        </CardTitle>
        <CardDescription className="max-sm:hidden">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <p className="text-2xl font-bold">{content}</p>
      </CardContent>
    </Card>
  );
}
