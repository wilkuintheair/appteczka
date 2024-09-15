import { AidKitSponsor } from "@/constants/AidKits";
import { View } from "react-native";
import { Text } from "@/components/Text";
import { makeStyles } from "@rneui/themed";

export const AidKitSponsorView = ({ sponsor }: { sponsor: AidKitSponsor }) => {
  const styles = useStyles();
  return (
    <View style={styles.sponsorContainer}>
      <Text style={styles.text} h4>
        Dumnie wspierana przez
      </Text>
      <Text style={styles.text} h2>
        {sponsor.name}
      </Text>
    </View>
  );
};

const useStyles = makeStyles(({ spacing }) => ({
  sponsorContainer: {
    padding: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
}));
