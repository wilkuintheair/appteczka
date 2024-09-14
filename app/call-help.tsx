import { SafeAreaView } from "react-native";
import { makeStyles, Text } from "@rneui/themed";

export default function CallHelpScreen() {
  const style = useStyles();
  return (
    <SafeAreaView style={style.container}>
      <Text>Call help</Text>
    </SafeAreaView>
  );
}

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    flex: 1,
  },
}));
