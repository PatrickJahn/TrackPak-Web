import { KeyedItem } from "../base/Item";

export type Company = KeyedItem & {
  cvr: string;
  brandId: string;
  name: string;
  locationId?: string | null;
};
