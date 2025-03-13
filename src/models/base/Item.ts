export type KeyedItem = {
  id: string;
  deleted?: Date | null;
  deletedBy?: string | null;
  createdAt: Date;
  createdBy?: string | null;
  lastModifiedAt?: Date | null;
  lastModifiedBy?: string | null;
};

export default KeyedItem;
