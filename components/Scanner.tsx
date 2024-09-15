import { CameraProps, CameraView } from "expo-camera";
import { useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import { FAB, makeStyles } from "@rneui/themed";

const width = Dimensions.get("window").width;

export const Scanner = (props: CameraProps) => {
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
  cameraContainer: {
    borderColor: colors.divider,
    borderWidth: 1,
    borderRadius: spacing.xl,
    padding: spacing.lg,
  },
  cameraView: { flex: 1 },
}));
