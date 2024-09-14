import { makeStyles, Text as RNText, TextProps } from "@rneui/themed";

export const Text = (props: TextProps) => {
  const style = useStyles();

  return <RNText {...props} style={[style.text, props.style]} />;
};

const useStyles = makeStyles(({ colors }) => ({
  text: {
    color: colors.black,
  },
}));
