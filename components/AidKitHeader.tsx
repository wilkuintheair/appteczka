import { Image, View } from "react-native";
import { Text } from "@/components/Text";
import { makeStyles } from "@rneui/themed";

type Props = {
  title?: string;
  image?: string;
  description?: string;
};

export const AidKitHeader = ({ title, image, description }: Props) => {
  const styles = useStyles();

  return (
    <View style={styles.header}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <View style={styles.headerText}>
        {title && <Text h2>{title}</Text>}
        <Text>{description}</Text>
      </View>
    </View>
  );
};

const useStyles = makeStyles(({ spacing }) => ({
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
}));
