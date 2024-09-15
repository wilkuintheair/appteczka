import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Button, Icon, makeStyles, useTheme } from "@rneui/themed";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Image, View } from "react-native";
import { Text } from "@/components/Text";

export default function RankScreen() {
  const styles = useStyles();
  const { colors } = useTheme().theme;

  const user = auth().currentUser;

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
      headerBackgroundColor={{ dark: colors.grey5, light: colors.grey5 }}
    >
      {!user ? (
        <Button
          title="Google Sign-In"
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log("Signed in with Google!"),
            )
          }
        />
      ) : (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            {user.photoURL ? (
              <Image
                source={{ uri: user.photoURL }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
            ) : null}
            <Text h3>{user.displayName}</Text>
          </View>
          <Button title="Sign Out" onPress={() => auth().signOut()} />
        </View>
      )}
    </ParallaxScrollView>
  );
}

const useStyles = makeStyles(({ spacing }) => ({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
}));
