import { SafeAreaView } from "react-native";
import { makeStyles, Text } from "@rneui/themed";

export default function ReportIssueScreen() {
  const style = useStyles();
  return (
    <SafeAreaView style={style.container}>
      <Text>Report issue</Text>
    </SafeAreaView>
  );
}

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    flex: 1,
  },
}));
