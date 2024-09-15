import { makeStyles } from "@rneui/themed";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { getAidKit } from "@/constants/AidKits";
import { AidKitHeader } from "@/components/AidKitHeader";
import { BarcodeScanningResult, useCameraPermissions } from "expo-camera";
import { Text } from "@/components/Text";
import { useEffect, useState } from "react";
import { Scanner } from "@/components/Scanner";
import { scheduleOpenAidKitSequence } from "@/utils/scheduleOpenAidKitSequence";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

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

  const openAidKit = () => {
    setValidated(true);
    const user = auth().currentUser;
    if (user) {
      firestore()
        .collection("Users")
        .doc(user.uid)
        .update({
          aidKits: firestore.FieldValue.arrayUnion({
            id: aidId,
            timestamp: new Date().getTime(),
          }),
        });
    }
    void scheduleOpenAidKitSequence();
  };

  const onBarcodeScanned = (data: BarcodeScanningResult) => {
    if (data) {
      // TODO: Validate the scanned data
      openAidKit();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AidKitHeader image={aidKit.image} description={aidKit.description} />
        <View style={styles.separator} />
        {!validated && (
          <Pressable onLongPress={openAidKit}>
            <Scanner onBarcodeScanned={onBarcodeScanned} />
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

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
}));
