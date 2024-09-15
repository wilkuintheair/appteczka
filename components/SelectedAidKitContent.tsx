import { Text } from "@/components/Text";
import { Image, SafeAreaView, View } from "react-native";
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
        <View style={styles.header}>
          {aidKit.image && (
            <Image source={{ uri: aidKit.image }} style={styles.image} />
          )}
          <View style={styles.headerText}>
            <Text h2>{aidKit?.name}</Text>
            <Text>{aidKit?.description}</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <Text h4>Zawartość</Text>
        <View style={styles.contentContainer}>
          {aidKit.content.map((item, index) => (
            <View
              style={[index % 2 ? styles.oddRow : null, styles.contentRow]}
              key={index}
            >
              <Text>
                <QuantityIndicator
                  quantity={item.quantity}
                  full={item.fullQuantity}
                />
                {item.name}
              </Text>
              <Text>{item.quantity}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const QuantityIndicator = ({
  quantity,
  full,
}: {
  quantity: number;
  full: number;
}) => {
  const lowQuantity = "🔴 ";
  const mediumQuantity = "🟡 ";
  const highQuantity = "🟢 ";
  const levels = [0.1, 0.5, 0.8];

  return quantity / full <= levels[0]
    ? lowQuantity
    : quantity / full <= levels[1]
      ? mediumQuantity
      : highQuantity;
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
  header: {
    flexDirection: "row",
    gap: spacing.lg,
  },
  headerText: {
    flex: 1,
    gap: spacing.sm,
  },
  image: {
    width: 64,
    height: 64,
    resizeMode: "cover",
  },
  contentContainer: {},
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
