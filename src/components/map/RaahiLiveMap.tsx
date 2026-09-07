"use client";

import { useEffect, useRef, useState } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import useGeolocation from "@/hooks/useGeolocation";
import { Star, MapPin, X, Compass, ArrowSquareOut, Spinner } from "@phosphor-icons/react";

interface PlaceResult {
  id: string;
  displayName?: {
    text: string;
    languageCode?: string;
  };
  formattedAddress?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  rating?: number;
  userRatingCount?: number;
  priceLevel?: string;
  primaryType?: string;
  photos?: Array<{
    name: string;
    widthPx: number;
    heightPx: number;
  }>;
  googleMapsUri?: string;
}

export default function RaahiLiveMap() {
  const { lat, lng, loading: geoLoading, error: geoError } = useGeolocation();
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [places, setPlaces] = useState<PlaceResult[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<PlaceResult | null>(null);
  const [loadingPlaces, setLoadingPlaces] = useState(false);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const userMarkerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapRef.current || lat === null || lng === null) return;

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY || "";
    const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || "DEMO_MAP_ID";

    setOptions({
      key: apiKey,
      v: "weekly",
    });

    Promise.all([
      importLibrary("maps"),
      importLibrary("marker"),
    ])
      .then(([mapsLib, markerLib]) => {
        if (!mapRef.current) return;

        const { Map } = mapsLib;
        const { AdvancedMarkerElement, PinElement } = markerLib;

        const mapOptions: google.maps.MapOptions = {
          center: { lat, lng },
          zoom: 14,
          mapId: mapId,
          disableDefaultUI: true,
          zoomControl: true,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#0a1628" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#0a1628" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#112233" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#1f293d" }],
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [{ color: "#111827" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#060d17" }],
            },
          ],
        };

        const newMap = new Map(mapRef.current, mapOptions);
        setMap(newMap);

        // Create User Marker (Amber)
        const userPin = new PinElement({
          background: "#f59e0b",
          borderColor: "#ffffff",
          glyphColor: "#000000",
          scale: 1.2,
        });

        const userMarker = new AdvancedMarkerElement({
          map: newMap,
          position: { lat, lng },
          title: "You",
          content: userPin.element,
        });

        userMarkerRef.current = userMarker;
      })
      .catch((err: unknown) => {
        console.error("Error loading Google Maps:", err);
      });
  }, [lat, lng]);

  // Fetch Nearby Places
  useEffect(() => {
    if (lat === null || lng === null) return;

    setLoadingPlaces(true);
    fetch("/api/places/nearby", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lat, lng, radius: 4000 }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.places) {
          setPlaces(data.places);
        }
      })
      .catch((err: unknown) => console.error("Error fetching places:", err))
      .finally(() => setLoadingPlaces(false));
  }, [lat, lng]);

  // Render Place Markers
  useEffect(() => {
    if (!map || !places.length) return;

    // Clear old markers
    markersRef.current.forEach((marker) => {
      marker.map = null;
    });
    markersRef.current = [];

    importLibrary("marker").then((markerLib) => {
      const { AdvancedMarkerElement, PinElement } = markerLib;

      places.forEach((place) => {
        if (!place.location) return;

        const pin = new PinElement({
          background: "#0f172a",
          borderColor: "#f59e0b",
          glyphColor: "#f59e0b",
          scale: 0.9,
        });

        const marker = new AdvancedMarkerElement({
          map,
          position: {
            lat: place.location.latitude,
            lng: place.location.longitude,
          },
          title: place.displayName?.text || "Location",
          content: pin.element,
        });

        marker.addListener("click", () => {
          setSelectedPlace(place);
        });

        markersRef.current.push(marker);
      });
    });
  }, [map, places]);

  return (
    <div className="relative w-full h-[600px] md:h-[700px] rounded-3xl overflow-hidden border border-white/10 bg-slate-950 shadow-2xl">
      {/* Geolocation Loading / Error Overlays */}
      {geoLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md">
          <Spinner className="animate-spin text-amber-400 mb-4" size={36} />
          <p className="text-sm font-semibold tracking-wide text-white">Locating you on the live radar…</p>
        </div>
      )}

      {geoError && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/90 p-6 text-center">
          <Compass size={48} className="text-rose-400 mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Location Required for Live Map</h3>
          <p className="text-xs text-white/60 max-w-sm">
            {geoError}. Please enable location permissions to scan nearby verified heritage, artisan, and cultural spots.
          </p>
        </div>
      )}

      {/* Map Canvas */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Top Left Badge & Quick Stats */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-950/80 border border-white/10 backdrop-blur-md text-xs font-semibold text-white/90">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active Spatial Map</span>
          {loadingPlaces && <Spinner className="animate-spin text-amber-400 ml-1" size={14} />}
        </div>
      </div>

      {/* Selected Place Details Floating Sheet / Card */}
      {selectedPlace && (
        <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-[380px] z-20 bg-neutral-950/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl transition-all">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                {selectedPlace.primaryType?.replace(/_/g, " ") || "Attraction"}
              </span>
              <h3 className="text-base font-bold text-white leading-snug">
                {selectedPlace.displayName?.text || "Unknown Place"}
              </h3>
            </div>
            <button
              onClick={() => setSelectedPlace(null)}
              className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {selectedPlace.photos && selectedPlace.photos.length > 0 && (
            <div className="w-full h-32 rounded-lg overflow-hidden mb-3 bg-slate-900 border border-white/5">
              <img
                src={`/api/places/photo?name=${encodeURIComponent(selectedPlace.photos[0].name)}&w=400`}
                alt={selectedPlace.displayName?.text || "Photo"}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="space-y-2 mb-4">
            {selectedPlace.formattedAddress && (
              <div className="flex items-start gap-2 text-xs text-white/60">
                <MapPin size={14} className="text-amber-400 shrink-0 mt-0.5" />
                <span className="line-clamp-2">{selectedPlace.formattedAddress}</span>
              </div>
            )}

            {selectedPlace.rating && (
              <div className="flex items-center gap-1.5 text-xs text-white/80">
                <Star size={14} weight="fill" className="text-amber-400" />
                <span className="font-semibold">{selectedPlace.rating}</span>
                <span className="text-white/40">({selectedPlace.userRatingCount || 0} reviews)</span>
              </div>
            )}
          </div>

          {selectedPlace.googleMapsUri && (
            <a
              href={selectedPlace.googleMapsUri}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
            >
              <span>Open in Google Maps</span>
              <ArrowSquareOut size={14} weight="bold" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
