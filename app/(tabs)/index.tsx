import { SafeAreaView, View } from "react-native";
import { makeStyles } from "@rneui/themed";
import { HomeButton } from "@/components/HomeButton";

export default function HomeScreen() {
  const styles = useStyles();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <HomeButton href={"/report-issue"}>Zgłoś zdarzenie</HomeButton>
        <HomeButton href={"/call-help"}>Wezwij pomoc</HomeButton>
        <HomeButton href={"/map?nearest=true"}>
          Znajdź najbliższą apteczkę
        </HomeButton>
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
