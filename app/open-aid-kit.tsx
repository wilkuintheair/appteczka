import { Button, makeStyles } from "@rneui/themed";
import {
  ActivityIndicator,
  Alert,
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
import { AidKitSponsorView } from "@/components/AidKitSponsorView";
import { AidKitContentTable } from "@/components/AidKitContentTable";

export default function OpenAidKitScreen() {
  const styles = useStyles();
  const { aidId } = useLocalSearchParams<{ aidId: string }>();
  const aidKit = getAidKit(aidId);
  const [step, setStep] = useState<"scan" | "makeReport" | "choose">("choose");

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
    void scheduleOpenAidKitSequence();
    setStep("choose");
  };

  const onBarcodeScanned = (data: BarcodeScanningResult) => {
    if (data) {
      openAidKit();
      setStep("choose");
      Alert.alert("Możesz skorzystać z Apteczki");
    }
  };

  const onNeedToUse = () => {
    setStep("scan");
  };

  const onWantToHelp = () => {
    setStep("makeReport");
  };

  const onReportMake = () => {
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
          score: firestore.FieldValue.increment(1),
        });
    }
    Alert.alert(
      "Dziękujemy za zgłoszenie braku nożyczek!",
      "Na Twoje konto wylądowało parę punktów",
    );
    setStep("choose");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AidKitHeader image={aidKit.image} description={aidKit.description} />
        {aidKit.sponsor && step !== "scan" && (
          <>
            <View style={styles.separator} />
            <AidKitSponsorView sponsor={aidKit.sponsor} />
          </>
        )}
        <View style={styles.separator} />
        <Text h4>Zawartość</Text>
        <AidKitContentTable content={aidKit.content} />
        {step === "choose" && (
          <View style={styles.choiceContainer}>
            <Button onPress={onNeedToUse}>
              Potrzebuję skorzystać z apteczki
            </Button>
            <Button onPress={onWantToHelp}>Chcę pomóc Apteczce</Button>
          </View>
        )}
        {step === "scan" && (
          <Pressable onLongPress={openAidKit}>
            <Scanner onBarcodeScanned={onBarcodeScanned} />
          </Pressable>
        )}
        {step === "makeReport" && (
          <Button onPress={onReportMake}>Zgłoś brak nożyczek</Button>
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
  choiceContainer: {
    gap: spacing.xl,
  },
}));
