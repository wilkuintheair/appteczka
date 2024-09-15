import * as Location from "expo-location";
import { AidKit, AIDS_LIST } from "@/constants/AidKits";
import { getDistance } from "@/utils/mapUtils";
import { useRef, useState } from "react";
import { Region } from "react-native-maps";

export const useFindNearestAid = () => {
  const userLocationRef = useRef<Location.LocationObject | null>(null);
  const nearestRef = useRef<AidKit>();
  const [region, setRegion] = useState<Region>();

  const waitForUserLocation = async () => {
    if (userLocationRef.current) {
      return userLocationRef.current;
    }

    return new Promise<Location.LocationObject>((resolve, reject) => {
      const id = setTimeout(() => {
        reject(new Error("User location not found"));
      }, 10000);

      Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      }).then((value) => {
        resolve(value);
        clearTimeout(id);
      });
    });
  };

  const findNearestAid = async () => {
    if (!userLocationRef.current) {
      userLocationRef.current = await waitForUserLocation();
    }

    const userLocation = userLocationRef.current;
    if (userLocation) {
      AIDS_LIST.forEach((aid) => {
        const distance = getDistance(userLocation.coords, aid.marker);

        if (
          !nearestRef.current ||
          distance < getDistance(userLocation.coords, nearestRef.current.marker)
        ) {
          nearestRef.current = aid;
        }
      });

      if (!nearestRef.current) {
        return;
      }

      const minX = Math.min(
        userLocation.coords.latitude,
        nearestRef.current.marker.latitude,
      );
      const maxX = Math.max(
        userLocation.coords.latitude,
        nearestRef.current.marker.latitude,
      );
      const minY = Math.min(
        userLocation.coords.longitude,
        nearestRef.current.marker.longitude,
      );
      const maxY = Math.max(
        userLocation.coords.longitude,
        nearestRef.current.marker.longitude,
      );

      const region = {
        latitude: (minX + maxX) / 2,
        longitude: (minY + maxY) / 2,
        latitudeDelta: maxX - minX + 0.04,
        longitudeDelta: maxY - minY + 0.04,
      };

      setRegion(region);
      return { region, nearest: nearestRef.current };
    }
  };

  return { findNearestAid, region };
};
