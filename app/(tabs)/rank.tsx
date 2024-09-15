import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Button, Icon, makeStyles, useTheme } from "@rneui/themed";
import ParallaxScrollView from "@/components/ParallaxScrollView";

export default function RankScreen() {
  const styles = useStyles();
  const { colors } = useTheme().theme;

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { data } = await GoogleSignin.signIn();
    const idToken = data?.idToken;

    if (!idToken) {
      return;
    }
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <ParallaxScrollView
      headerImage={
        <Icon
          size={256}
          style={{ marginTop: 64 }}
          type={"ionicon"}
          name={"podium"}
          color={colors.secondary}
        />
      }
      headerBackgroundColor={{ dark: "#000000", light: "#FFFFFF" }}
    >
      <Button
        title="Google Sign-In"
        onPress={() =>
          onGoogleButtonPress().then(() =>
            console.log("Signed in with Google!"),
          )
        }
      />
    </ParallaxScrollView>
  );
}

const useStyles = makeStyles(({ spacing }) => ({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: spacing.xl,
  },
}));
