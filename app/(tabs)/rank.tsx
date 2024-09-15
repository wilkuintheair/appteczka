import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Button, Icon, makeStyles, useTheme } from "@rneui/themed";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Image, View } from "react-native";
import { Text } from "@/components/Text";
import firestore from "@react-native-firebase/firestore";
import { useState } from "react";

type User = {
  displayName: string | null;
  photoURL: string | null;
  email: string | null;
  uid: string;
  score: number | null;
  aidKits?: object[];
};

export default function RankScreen() {
  const styles = useStyles();
  const { colors } = useTheme().theme;
  const [rank, setRank] = useState<any[]>([]);

  const user = auth().currentUser;
  const usersCollection = firestore().collection<User>("Users");

  usersCollection.get().then((querySnapshot) => {
    const query = querySnapshot.query.orderBy("score", "desc");
    query.get().then((querySnapshot) => setRank(querySnapshot.docs));
  });

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
      {!user || user.isAnonymous ? (
        <View style={styles.inviteContainer}>
          <Text style={styles.inviteText} h3>
            Dołącz do zabawy
          </Text>
          <Text style={styles.inviteText} h4>
            Co miesiąc nagradzamy najaktywniejszych użytkowników
          </Text>
          <Text style={styles.inviteText} h1>
            🎉
          </Text>
          <Text style={styles.inviteText} h4>
            Wraz z naszymi partnerami przygotowaliśmy dla Was wiele atrakcyjnych
            nagród. Wystarczy, że zalogujesz się za pomocą konta Google, a już
            jesteś w grze!
          </Text>
          <Text style={styles.inviteText} h1>
            ⛳
          </Text>
          <Button
            style={styles.signInButton}
            title="Zaloguj się z Google"
            onPress={() =>
              onGoogleButtonPress().then((result) => {
                const user = result?.user;
                if (!user) {
                  return;
                }

                usersCollection
                  .doc(user.uid)
                  .set({
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    email: user.email,
                    uid: user.uid,
                    score: 1,
                  })
                  .catch((error) => console.error(error));
              })
            }
          />
        </View>
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
          <View style={styles.separator} />
          <Text h3>Ranking</Text>
          {rank.map((doc, index) => (
            <View style={styles.rankRow} key={doc.data().uid}>
              <Text h4>{index + 1}</Text>
              <Image
                source={{ uri: doc.data().photoURL }}
                style={styles.rowImage}
              />
              <Text h4>{doc.data().displayName}</Text>
              <Text h4>{doc.data().aidKits?.length}</Text>
            </View>
          ))}
        </View>
      )}
    </ParallaxScrollView>
  );
}

async function onGoogleButtonPress() {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const { data } = await GoogleSignin.signIn();
  const idToken = data?.idToken;

  if (!idToken) {
    return;
  }
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  return auth().signInWithCredential(googleCredential);
}

const useStyles = makeStyles(({ colors, spacing }) => ({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    gap: spacing.xl,
  },
  signInButton: {
    alignSelf: "stretch",
  },
  separator: {
    height: 1,
    backgroundColor: colors.divider,
  },
  inviteContainer: {
    flex: 1,
    alignItems: "center",
    gap: spacing.xl,
  },
  inviteText: {
    textAlign: "center",
  },
  rankRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  rowImage: {
    width: spacing.xl,
    height: spacing.xl,
    borderRadius: spacing.xl / 2,
  },
  break: {
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
}));
