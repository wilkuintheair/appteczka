import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { createTheme, ThemeProvider as RNUIThemeProvider } from "@rneui/themed";
import { useColorScheme } from "@/hooks/useColorScheme";
import { theme } from "@/constants/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "496173996804-ckmkcsgmdoo7nnqo7olt8qjlcphpkcce.apps.googleusercontent.com",
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const mode = colorScheme === "dark" ? "dark" : "light";

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      // @ts-ignore
      setUser(user);
      console.log("User state changed", user);
      if (initializing) setInitializing(false);
    });

    if (!auth().currentUser)
      auth()
        .signInAnonymously()
        .then(() => {
          console.log("User signed in anonymously");
        })
        .catch((error) => {
          if (error.code === "auth/operation-not-allowed") {
            console.log("Enable anonymous in your firebase console.");
          }

          console.error(error);
        });

    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    (async () => {
      const permissions = await Notifications.getPermissionsAsync();
      if (!permissions.granted) {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Brak uprawnień do powiadomień",
            "Aplikacja nie będzie działać poprawnie bez uprawnień do powiadomień.",
          );
        }
      }
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <RNUIThemeProvider theme={createTheme({ ...theme, mode })}>
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false, title: "" }}
            />
            <Stack.Screen
              name="call-help"
              options={{ title: "Wezwij pomoc" }}
            />
            <Stack.Screen
              name="report-issue"
              options={{ title: "Zgłoś zdarzenie" }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
        </RNUIThemeProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
