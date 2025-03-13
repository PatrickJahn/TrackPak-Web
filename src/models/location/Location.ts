import KeyedItem from "../base/Item";

// GeoLocation Type
export type GeoLocation = {
  latitude: number;
  longitude: number;
};

// Location Type
export type Location = KeyedItem & {
  country: string;
  city: string;
  addressLine: string;
  postalCode: string;
  geoLocation?: GeoLocation | null;
};
