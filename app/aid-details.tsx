import { makeStyles, Text } from "@rneui/themed";
import { SafeAreaView } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function AidDetailsScreen() {
  const style = useStyles();

  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaView style={style.container}>
      <Text>Aid details</Text>
      <Text>Aid id: {id}</Text>
    </SafeAreaView>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
  },
}));
