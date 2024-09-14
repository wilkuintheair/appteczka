import { Alert, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import * as Location from "expo-location";
import { AidKit, AIDS_LIST } from "@/constants/AidKits";
import { useFindNearestAid } from "@/hooks/useFindNearestAid";

type Params = {
  nearest: string;
};

export default function MapScreen() {
  const { nearest } = useLocalSearchParams<Params>();
  const mapRef = useRef<MapView>(null);
  const userLocationRef = useRef<Location.LocationObject | null>(null);
  const router = useRouter();

  const { findNearestAid } = useFindNearestAid();

  useEffect(() => {
    if (nearest) {
      findNearestAid().then(
        (region) => region && mapRef.current?.animateToRegion(region, 1000),
      );
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

  const onCalloutPress = (aid: AidKit) => {
    router.push({
      pathname: "/aid-details",
      params: {
        id: aid.id,
      },
    });
  };

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map} showsUserLocation>
        {AIDS_LIST.map((aid, index) => (
          <Marker
            key={index}
            coordinate={aid.marker}
            title="Apteczka"
            description="Opis apteczki"
            onCalloutPress={() => onCalloutPress(aid)}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
