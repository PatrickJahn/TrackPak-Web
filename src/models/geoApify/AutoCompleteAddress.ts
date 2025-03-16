export type AutoCompleteAddress = {
  name: string; // Location name
  country: string; // Country component of the address
  country_code: string; // ISO 3166-1 alpha-2 country code
  state: string; // State component of the address
  state_code?: string; // State shortcode (optional)
  county: string; // County component of the address
  county_code?: string; // County shortcode (optional)
  postcode: string; // Postcode or ZIP code
  city: string; // City component of the address
  street: string; // Street component of the address
  formatted: string; //
};

export type GeoApifyFeatureArray = {
  features: {
    properties: AutoCompleteAddress;
  }[];
};
