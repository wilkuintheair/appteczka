import {Alert, StyleSheet, View} from "react-native";
import MapView from "react-native-maps";
import {useLocalSearchParams} from "expo-router";
import {useEffect, useRef, useState} from "react";
import * as Location from "expo-location";

/**
 * This screen will contain a map with aids nearby
 * Also it will contain a FAB button to
 * - call emergency services
 * - plan trip
 *
 *
 * @constructor
 */

type Params = {
  nearest: string;
};

export default function MapScreen() {
  const { nearest } = useLocalSearchParams<Params>();
  const [userLocation, setUserLocation] =
    useState<Location.LocationObject | null>(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      if (nearest) {
        try {
          const permissions = await Location.getForegroundPermissionsAsync();
          if (!permissions.granted) {
            const { status } =
              await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
              throw new Error("Location permission not granted");
            }
          }
          const location = await Location.getCurrentPositionAsync();
          setUserLocation(location);

          if (location) {
            mapRef.current?.setCamera({
              center: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              },
              altitude: 1500,
              zoom: 18,
            });
            setTimeout(
              () =>
                mapRef.current?.animateCamera({
                  center: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  },
                  zoom: 200,
                }),
              100,
            );
          }
        } catch (e) {
          if (e instanceof Error) {
            Alert.alert("Error", e.message);
          }
        }
      }
    })();
  }, [nearest]);

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map} showsUserLocation />
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
