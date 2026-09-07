"use client";

import { useState, useEffect } from "react";

export interface GeolocationState {
  lat: number | null;
  lng: number | null;
  accuracy: number | null;
  error: string | null;
  loading: boolean;
}

export interface UseGeolocationOptions {
  watch?: boolean;
}

export function useGeolocation(options: UseGeolocationOptions = {}): GeolocationState {
  const { watch = true } = options;

  const [state, setState] = useState<GeolocationState>({
    lat: null,
    lng: null,
    accuracy: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setState({
        lat: null,
        lng: null,
        accuracy: null,
        error: "Geolocation is not supported by this browser.",
        loading: false,
      });
      return;
    }

    const geoOptions: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 30000,
    };

    const handleSuccess = (pos: GeolocationPosition) => {
      setState({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
        error: null,
        loading: false,
      });
    };

    const handleError = (err: GeolocationPositionError) => {
      let message = "Location unavailable.";
      switch (err.code) {
        case err.PERMISSION_DENIED:
          message = "Location permission denied.";
          break;
        case err.POSITION_UNAVAILABLE:
          message = "Location position unavailable.";
          break;
        case err.TIMEOUT:
          message = "Location request timed out.";
          break;
        default:
          message = err.message || "Failed to get location.";
          break;
      }
      setState({
        lat: null,
        lng: null,
        accuracy: null,
        error: message,
        loading: false,
      });
    };

    setState((prev) => ({ ...prev, loading: true, error: null }));

    if (watch) {
      const watchId = navigator.geolocation.watchPosition(
        handleSuccess,
        handleError,
        geoOptions
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      navigator.geolocation.getCurrentPosition(
        handleSuccess,
        handleError,
        geoOptions
      );
    }
  }, [watch]);

  return state;
}

export default useGeolocation;
