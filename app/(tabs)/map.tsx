import { Alert, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { AidKit, AIDS_LIST } from "@/constants/AidKits";
import { useFindNearestAid } from "@/hooks/useFindNearestAid";
import BottomSheet from "@gorhom/bottom-sheet";
import { SelectedAidKitContent } from "@/components/SelectedAidKitContent";
import { FAB, makeStyles } from "@rneui/themed";

type Params = {
  nearest: string;
};

export default function MapScreen() {
  const styles = useStyles();
  const { nearest } = useLocalSearchParams<Params>();

  const mapRef = useRef<MapView>(null);
  const userLocationRef = useRef<Location.LocationObject | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [selectedAidKit, setSelectedAidKit] = useState<AidKit | null>(null);

  const { findNearestAid } = useFindNearestAid();

  useEffect(() => {
    if (nearest) {
      findNearestAid().then((result) => {
        if (result) {
          result.region && mapRef.current?.animateToRegion(result.region, 1000);
          result.nearest && setSelectedAidKit(result.nearest);
          bottomSheetRef.current?.snapToIndex(0);
        }
      });
    }
  }, [nearest]);

  useEffect(() => {
    (async () => {
      try {
        const permissions = await Location.getForegroundPermissionsAsync();
        if (!permissions.granted) {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            throw new Error("Location permission not granted");
          }
        }

        const location = await Location.getCurrentPositionAsync();
        userLocationRef.current = location;

        if (location && !nearest) {
          setTimeout(
            () =>
              mapRef.current?.animateCamera(
                {
                  center: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  },
                  zoom: 15,
                  altitude: 2000,
                },
                { duration: 2000 },
              ),
            100,
          );
        }
      } catch (e) {
        if (e instanceof Error) {
          Alert.alert("Error", e.message);
        }
      }
    })();
  }, []);

  const onMapPress = () => {
    bottomSheetRef.current?.close();
    setSelectedAidKit(null);
  };

  const onMarkerPress = (aid: AidKit) => {
    setSelectedAidKit(aid);
    bottomSheetRef.current?.snapToIndex(0);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation
        onPress={onMapPress}
      >
        {AIDS_LIST.map((aid, index) => (
          <Marker
            key={index}
            coordinate={aid.marker}
            title={aid.name}
            description={aid.shortDescription}
            onPress={(event) => {
              event.stopPropagation();
              onMarkerPress(aid);
            }}
          />
        ))}
      </MapView>
      <BottomSheet
        index={-1}
        snapPoints={["35%", "100%"]}
        backgroundStyle={styles.bottomSheetBackground}
        enablePanDownToClose
        enableDynamicSizing={false}
        ref={bottomSheetRef}
      >
        {selectedAidKit ? (
          <SelectedAidKitContent aidKit={selectedAidKit} />
        ) : (
          <View />
        )}
      </BottomSheet>
      {selectedAidKit && <AidKitFAB aidKit={selectedAidKit} />}
    </View>
  );
}

const AidKitFAB = ({ aidKit }: { aidKit: AidKit }) => {
  const router = useRouter();

  return (
    <FAB
      placement={"right"}
      icon={{ name: "lock-open", color: "white" }}
      onPress={() => {
        router.navigate({
          pathname: "/open-aid-kit",
          params: { aidId: aidKit.id },
        });
      }}
    />
  );
};

const useStyles = makeStyles(({ colors, spacing }) => ({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  bottomSheetBackground: {
    backgroundColor: colors.grey5,
  },
  fabContainer: {
    position: "absolute",
    justifyContent: "flex-end",
    gap: spacing.lg,
    top: spacing.lg,
    bottom: spacing.lg,
    right: spacing.lg,
  },
}));
