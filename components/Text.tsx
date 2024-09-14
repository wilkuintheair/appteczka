import { makeStyles } from "@rneui/themed";
import { Text as RNText, TextProps } from "react-native";

export const Text = (props: TextProps) => {
  const style = useStyles();

  return <RNText {...props} style={[style.text, props.style]} />;
};

const useStyles = makeStyles(({ colors }) => ({
  text: {
    color: colors.black,
  },
}));
