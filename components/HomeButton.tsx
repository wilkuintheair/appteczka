import { Href, useRouter } from "expo-router";
import { Button } from "@rneui/themed";
import { ReactNode } from "react";

type Props = { href: Href<string>; children: ReactNode };

export const HomeButton = ({ href, children }: Props) => {
  const router = useRouter();
  const onPress = () => {
    router.navigate(href);
  };

  return (
    <Button onPress={onPress} size={"lg"}>
      {children}
    </Button>
  );
};
