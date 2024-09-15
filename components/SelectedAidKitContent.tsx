import { Text } from "@/components/Text";
import { SafeAreaView, View } from "react-native";
import { AidKit } from "@/constants/AidKits";
import { makeStyles } from "@rneui/themed";
import { AidKitHeader } from "@/components/AidKitHeader";
import { AidKitContentTable } from "@/components/AidKitContentTable";
import { AidKitSponsorView } from "@/components/AidKitSponsorView";

type Props = {
  aidKit: AidKit;
};

export const SelectedAidKitContent = ({ aidKit }: Props) => {
  const styles = useStyles();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AidKitHeader
          title={aidKit.name}
          image={aidKit.image}
          description={aidKit.description}
        />
        {aidKit.sponsor && (
          <>
            <View style={styles.separator} />
            <AidKitSponsorView sponsor={aidKit.sponsor} />
          </>
        )}
        <View style={styles.separator} />
        <Text h4>Zawartość</Text>
        <AidKitContentTable content={aidKit.content} />
      </View>
    </SafeAreaView>
  );
};

const useStyles = makeStyles(({ colors, spacing }) => ({
  separator: {
    height: 1,
    backgroundColor: colors.divider,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: spacing.xl,
    gap: spacing.xl,
  },
  contentRow: {
    padding: spacing.sm,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  oddRow: {
    backgroundColor: colors.grey4,
  },
}));
