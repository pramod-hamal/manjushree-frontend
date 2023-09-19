"use client";

import React, { memo, useCallback, useEffect, useState } from "react";
import {
  Autocomplete,
  GoogleMap,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";

import FormInput from "../form/FormInput";
import axios from "axios";

export interface MapComponentProps {
  center: LatLng;
  getLocation: (location: LatLng) => void;
}

export interface LatLng {
  lat: number;
  lng: number;
}

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: true,
};

const libraries: any = ["places"];

function MapComponent({ center: mapCenter, getLocation }: MapComponentProps) {
  const [center, setCenter] = useState<LatLng>({
    lat: -3.745,
    lng: -38.523,
  });
  const [searchedAddress, setSearchedAddress] = useState<string>("");

  const [map, setMap] = useState(null);

  /**
   * Map Loader
   * @param {any} {id:"google-map-script-1"
   * @param {any} googleMapsApiKey:"AIzaSyCw10y2Ncvk6XpZirQHbf0VUvZZF35rvbg"
   * @param {any} libraries
   * @param {any} }
   * @returns {any}
   */
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script-1",
    googleMapsApiKey: "AIzaSyCw10y2Ncvk6XpZirQHbf0VUvZZF35rvbg",
    libraries,
  });

  /**
   * Set New Location for Map Marker
   * @param {google.maps.MapMouseEvent} e:google.maps.MapMouseEvent
   * @returns {void}
   */
  const handleLocationChange = (e: google.maps.MapMouseEvent): void => {
    if (e) {
      const { latLng } = e;
      const newLatLng: LatLng = {
        lat: latLng?.lat() ?? center.lat,
        lng: latLng?.lng() ?? center.lng,
      };
      setCenter(newLatLng);
      getLocation(newLatLng)
    }
  };

  /**
   * Handle name search of location and get -set location of as per name
   * @param {any} e:any
   * @returns {Promise<void>}
   */
  const handleSearch = async (e: any): Promise<void> => {
    if (e.key === "Enter") {
      const position = await getLatLngByName(e.target.value);
      if (position !== null) {
        setSearchedAddress(e.target.value);
        setCenter(position);
        getLocation(position)
      }
      e.preventDefault();
    }
  };

  /**
   * Initially Load map and set map data
   * @param {any} functioncallback(map:any
   * @returns {any}
   */
  const onLoad = useCallback(
    function callback(map: any) {
      const bounds = new window.google.maps.LatLngBounds(mapCenter);
      map.fitBounds(bounds);
      setMap(map);
    },
    [center]
  );

  /**
   * Remove map data when unmounted
   * @param {any} functioncallback(map:any
   * @returns {any}
   */
  const onUnmount = useCallback(function callback(_: any) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (mapCenter !== null) {
      setCenter(mapCenter);
    }
  }, [mapCenter]);

  const SearchBar = (
    <div className="absolute w-[90%] mx-5 top-5">
      <Autocomplete>
        <FormInput
          value={searchedAddress}
          errors={""}
          name="address"
          onKeyDown={handleSearch}
          onChange={(e: any) => {
            setSearchedAddress(e.target.value);
          }}
        />
      </Autocomplete>
    </div>
  );

  if (!isLoaded) return <>Loading Map</>;

  return (
    <GoogleMap
      mapContainerClassName="w-full h-[360px] relative"
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={mapOptions}
      onClick={handleLocationChange}
    >
      {SearchBar}
      <MarkerF
        draggable
        onLoad={() => { }}
        onDragEnd={handleLocationChange}
        position={formatCenter(center)}
      />
    </GoogleMap>
  );
}

export default memo(MapComponent);

/**
 * Format position to LatLng
 * @param {any} data:any
 * @returns {LatLng}
 */
const formatCenter = (data: any): LatLng => {
  const location: LatLng = {
    lat: Number(data.lat),
    lng: Number(data.lng),
  };
  return location;
};

/**
 * Get Lat Lang position of a location based on name
 * @param {any} name:string
 * @returns {any}
 */
const getLatLngByName = async (name: string): Promise<LatLng | null> => {
  try {
    const geocoder: google.maps.Geocoder = new window.google.maps.Geocoder();
    const response: google.maps.GeocoderResponse = await geocoder.geocode({
      address: name,
    });
    const { results } = response;
    const latitude: number = results[0].geometry.location.lat();
    const longitude: number = results[0].geometry.location.lng();
    return {
      lat: latitude,
      lng: longitude,
    } as LatLng;
  } catch (err: any) {
    return null;
  }
};

export const getNameByLatLang = async (geoLocation: LatLng) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${geoLocation.lat},${geoLocation.lng}&key=AIzaSyCw10y2Ncvk6XpZirQHbf0VUvZZF35rvbg`
    );

    const result = response.data.results[0];
    if (result) {
      return result.formatted_address;
    }
  } catch (error) {
    console.error("Error fetching location data:", error);
    return null;
  }
};
