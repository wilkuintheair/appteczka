import { SafeAreaView } from "react-native";
import { makeStyles } from "@rneui/themed";
import { Text } from "@/components/Text";

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
