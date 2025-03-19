import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function AvatarIcon() {
  return (
    <Avatar>
      <AvatarImage src="user-img.jpg" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
