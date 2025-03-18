import {
  AutoCompleteAddress,
  GeoApifyFeatureArray,
} from "@/models/geoApify/AutoCompleteAddress";
import { RestClient } from "./restClient";

export type GeoApiServiceType = {
  searchForAddress: (search: string) => Promise<AutoCompleteAddress[]>;
};

const apiKey = "b586677a97174c7a91c489303b69ea13";
const url = "https://api.geoapify.com/v1/geocode/autocomplete?";

export const GeoApiService = (client: RestClient): GeoApiServiceType => ({
  searchForAddress: async (search: string) => {
    return await client
      .get<GeoApifyFeatureArray>(`${url}text=${search}&apiKey=${apiKey}`)
      .then((res) => {
        return res?.data?.features?.flatMap((x) => x.properties) ?? [];
      });
  },
});

export default GeoApiService;
