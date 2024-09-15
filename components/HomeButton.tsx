import { Href, useRouter } from "expo-router";
import { Button, Icon, makeStyles } from "@rneui/themed";
import { ReactNode } from "react";
import { Pressable } from "react-native";

type Props = {
  href: Href<string>;
  children: ReactNode;
  icon: string;
  type?: string;
};

export const HomeButton = ({ href, children, icon, type }: Props) => {
  const styles = useStyles();
  const router = useRouter();
  const onPress = () => {
    router.navigate(href);
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Icon type={type ?? "font-awesome"} size={64} name={icon} />
      <Button size={"lg"}>{children}</Button>
    </Pressable>
  );
};

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    gap: spacing.md,
  },
}));
