import { AidKitContent } from "@/constants/AidKits";
import { View } from "react-native";
import { Text } from "@/components/Text";
import { makeStyles } from "@rneui/themed";

export const AidKitContentTable = ({ content }: { content: AidKitContent }) => {
  const styles = useStyles();

  return (
    <View>
      {content.map((item, index) => (
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
