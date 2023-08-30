import { useEffect, useState } from "react";
import { Location } from "./interface/currentLocation.interface";

const defaultLocation: Location = {
  lat: 27.70085241460845,
  lng: 85.30017721565005,
};

const useCurrentLocation = () => {
  const [location, setLocation] = useState<Location>(defaultLocation);
  const [error, setError] = useState<any | null>(null);

  /**
   * Retrieves the user's current location using the geolocation API.
   * If successful, updates the `location` state with the retrieved coordinates.
   * If there is an error, updates the `error` state with the error message.
   */
  const getCurrentLocation = (): void => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (error: GeolocationPositionError) => {
          setError(error);
        }
      );
    } else {
      setError(new Error("Geolocation is not supported by your browser."));
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return { location, error };
};

export default useCurrentLocation;
