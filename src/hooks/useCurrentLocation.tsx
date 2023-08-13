import { useEffect, useState } from "react";

export interface Location {
  lat: number;
  lng: number;
}

const defaultLocation: Location = {
  lat: 27.70085241460845,
  lng: 85.30017721565005,
};

const useCurrentLocation = () => {
  const [location, setLocation] = useState<Location>(defaultLocation);
  const [error, setError] = useState<any | null>(null);

  /**
   * Gets users current Location
   * @returns {void}
   */
  const getCurrentLocation = (): void => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { latitude } = position.coords;
          const { longitude } = position.coords;
          setLocation({
            lat: latitude,
            lng: longitude,
          });
        },
        (err: any) => {
          setError(err);
        }
      );
    } else {
      setError(new Error("Geolocation is not supported by your browser."));
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return {
    location,
    error,
  };
};

export default useCurrentLocation;
