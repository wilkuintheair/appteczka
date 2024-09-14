import { SafeAreaView, View } from "react-native";
import { Button, makeStyles } from "@rneui/themed";
import { Link } from "expo-router";

export default function HomeScreen() {
  const styles = useStyles();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Button size={"lg"}>Zgłoś zdarzenie</Button>
        <Button size={"lg"}>Wezwij pomoc</Button>
        <Link href={"/map?nearest=true"} asChild>
          <Button size={"lg"}>Znajdź najbliższą apteczkę</Button>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: "space-evenly",
  },
  map: {
    flex: 1,
  },
}));
