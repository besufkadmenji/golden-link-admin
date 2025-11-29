/* eslint-disable @typescript-eslint/no-explicit-any */

export interface LocationResult {
  lat: number;
  lng: number;
  streetAddress: string;
}

const getGoogleMaps = (): any => {
  if (typeof window === "undefined") {
    return null;
  }
  return (window as any).google?.maps || null;
};

export const searchLocation = async (
  query: string,
  limit: number = 5,
): Promise<LocationResult[]> => {
  if (!query || query.trim().length === 0) {
    return [];
  }

  try {
    const googleMaps = getGoogleMaps();
    if (!googleMaps) {
      throw new Error("Google Maps is not loaded");
    }

    const geocoder = new googleMaps.Geocoder();

    const result = await geocoder.geocode({ address: query });

    if (result.results && result.results.length > 0) {
      const results = result.results.slice(0, limit).map((item: any) => {
        const location = item.geometry.location;
        return {
          lat: location.lat(),
          lng: location.lng(),
          streetAddress: item.formatted_address,
        };
      });

      return results;
    }

    return [];
  } catch (error) {
    console.error("Google Maps Geocoding error:", error);
    throw new Error("Failed to search location");
  }
};

export const reverseSearchLocation = async (
  lat: number,
  lng: number,
): Promise<LocationResult | null> => {
  try {
    const googleMaps = getGoogleMaps();
    if (!googleMaps) {
      throw new Error("Google Maps is not loaded");
    }

    const geocoder = new googleMaps.Geocoder();

    const result = await geocoder.geocode({
      location: { lat, lng },
    });

    if (result.results && result.results.length > 0) {
      const firstResult = result.results[0];

      return {
        lat,
        lng,
        streetAddress: firstResult.formatted_address,
      };
    }

    return null;
  } catch (error) {
    console.error("Google Maps Reverse Geocoding error:", error);
    throw new Error("Failed to reverse search location");
  }
};
