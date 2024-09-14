import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { createTheme, ThemeProvider as RNUIThemeProvider } from "@rneui/themed";
import { useColorScheme } from "@/hooks/useColorScheme";
import { theme } from "@/constants/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const mode = colorScheme === "dark" ? "dark" : "light";

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

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
