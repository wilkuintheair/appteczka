import { Href, Link } from "expo-router";
import { Button } from "@rneui/themed";

type Props = { href: Href<string>; children: React.ReactNode };

export const HomeButton = ({ href, children }: Props) => {
  return (
    <Link href={href} asChild>
      <Button size={"lg"}>{children}</Button>
    </Link>
  );
};
