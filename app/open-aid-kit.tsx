import { FAB, makeStyles } from "@rneui/themed";
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { getAidKit } from "@/constants/AidKits";
import { AidKitHeader } from "@/components/AidKitHeader";
import {
  BarcodeScanningResult,
  CameraProps,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { Text } from "@/components/Text";
import { useEffect, useRef, useState } from "react";

const width = Dimensions.get("window").width;

export default function OpenAidKitScreen() {
  const styles = useStyles();
  const { aidId } = useLocalSearchParams<{ aidId: string }>();
  const aidKit = getAidKit(aidId);

  const [validated, setValidated] = useState(false);

  const navigation = useNavigation();
  navigation.setOptions({
    title: aidKit.name,
  });

  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission().then((result) => {
        if (result) {
          console.log("Permission granted");
        } else {
          console.log("Permission denied");
        }
      });
    }
  }, []);

  if (!permission) {
    return <ActivityIndicator />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <Text h3>Potrzebujemy dostępu do kamery, żeby zeskanować kod QR</Text>
      </SafeAreaView>
    );
  }

  const onBarcodeScanned = (data: BarcodeScanningResult) => {
    if (data) {
      // TODO: Validate the scanned data
      setValidated(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AidKitHeader image={aidKit.image} description={aidKit.description} />
        <View style={styles.separator} />
        {!validated && <Scanner onBarcodeScanned={onBarcodeScanned} />}
      </View>
    </SafeAreaView>
  );
}

const Scanner = (props: CameraProps) => {
  const styles = useStyles();
  const cameraRef = useRef<CameraView>(null);
  const [torch, setTorch] = useState(false);

  const toggleTorch = () => setTorch((prev) => !prev);

  return (
    <View
      style={[
        { width: width - 48, height: width - 48 },
        styles.cameraContainer,
      ]}
    >
      <CameraView
        ref={cameraRef}
        enableTorch={torch}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        {...props}
        style={[styles.cameraView, props.style]}
      />
      <FAB
        icon={{
          name: torch ? "lightbulb" : "lightbulb-outline",
          color: "white",
        }}
        style={{ position: "absolute", bottom: -24, left: 16, right: 16 }}
        onPress={toggleTorch}
      />
    </View>
  );
};

const useStyles = makeStyles(({ colors, spacing }) => ({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: spacing.xl,
    gap: spacing.xl,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.divider,
  },
  cameraContainer: {
    borderColor: colors.divider,
    borderWidth: 1,
    borderRadius: spacing.xl,
    padding: spacing.lg,
  },
  cameraView: { flex: 1 },
}));
