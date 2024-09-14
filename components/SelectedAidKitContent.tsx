import { Text } from "@/components/Text";
import { SafeAreaView, View } from "react-native";
import { AidKit } from "@/constants/AidKits";
import { makeStyles } from "@rneui/themed";

type Props = {
  aidKit: AidKit;
};

export const SelectedAidKitContent = ({ aidKit }: Props) => {
  const styles = useStyles();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text h1>{aidKit?.name}</Text>
      </View>
    </SafeAreaView>
  );
};

const useStyles = makeStyles(({ spacing }) => ({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: spacing.xl,
  },
}));
