import { Alert, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { AidKit, AIDS_LIST } from "@/constants/AidKits";
import { useFindNearestAid } from "@/hooks/useFindNearestAid";
import BottomSheet from "@gorhom/bottom-sheet";
import { SelectedAidKitContent } from "@/components/SelectedAidKitContent";
import { makeStyles } from "@rneui/themed";

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

  const onMarkerPress = (aid: AidKit) => {
    bottomSheetRef.current?.snapToIndex(0);
    setSelectedAidKit(aid);
  };

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map} showsUserLocation>
        {AIDS_LIST.map((aid, index) => (
          <Marker
            key={index}
            coordinate={aid.marker}
            title={aid.name}
            description={aid.shortDescription}
            onPress={() => onMarkerPress(aid)}
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
    </View>
  );
}

const useStyles = makeStyles(({ colors }) => ({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  bottomSheetBackground: {
    backgroundColor: colors.grey5,
  },
}));
