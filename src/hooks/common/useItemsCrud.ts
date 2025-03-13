import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { CrudServiceType } from "@/services/crudService";
import { AppItemRestServicesType } from "@/services/appServices";
import { useItemService } from "./useServices";
import KeyedItem from "@/models/base/Item";

export type ItemsFunctions<T extends Partial<KeyedItem>> = {
  useQuerySingle: (id: string) => UseQueryResult<T | undefined, unknown>;
  useQueryMany: () => UseQueryResult<T[], string>;
  // queryPagination: () => UseQueryResult<Pagination<T>, Error>;
  create: UseMutationResult<void, unknown, Partial<T>, unknown>;
  update: UseMutationResult<void, unknown, T, unknown>;
  remove: UseMutationResult<void, unknown, string, unknown>;
};

export const useItemsCrud = <T extends Partial<KeyedItem>>(
  key: string[],
  selector: (services: AppItemRestServicesType) => CrudServiceType<T>
): ItemsFunctions<T> => {
  /**** Hooks ****/
  const queryClient = useQueryClient();
  // const { useQueryPagination: paginationQuery } = usePagination(key);

  /**** Services ****/
  const service = useItemService(selector);

  /**** Queries & Mutations ****/

  // Queries item by id
  const useQuerySingle = (id: string) =>
    useQuery<T | undefined, unknown, T | undefined, string[]>({
      queryKey: [...key, id],
      queryFn: async () => {
        const response = await service.querySingle(id);
        if (response.data) return response.data;
        return undefined;
      },
    });

  //Query many with Filter and Pagination
  // const queryPagination = () =>
  //   paginationQuery(async (_args, token) => {
  //     const response = await service.queryPagination(token);

  //     if (response.success) return response.value;
  //     return { ...emptyPagination };
  //   });

  //Query many
  const useQueryMany = () =>
    useQuery<T[], string>({
      queryKey: key,
      queryFn: async () => {
        const response = await service.queryMany();
        if (response.data) return response.data;
        return [];
      },
    });

  // Creates item
  const create = useMutation({
    mutationKey: [...key, "create"],
    mutationFn: async (request: Partial<T>) => {
      await service.create(request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key, exact: false });
    },
    onError: () => {
      throw new Error("Create item failed");
    },
  });

  // Updates item
  const update = useMutation({
    mutationKey: [...key, "update"],
    mutationFn: async (request: T) => {
      await service.update(request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key, exact: true });
    },
    onError: () => {
      throw new Error("Update item failed");
    },
  });

  //Removes Item
  const remove = useMutation({
    mutationKey: [...key, "remove"],
    mutationFn: async (id: string) => {
      await service.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
    onError: () => {
      throw new Error("Remove item failed");
    },
  });

  /**** Value ****/
  return {
    useQuerySingle,
    // queryPagination,
    useQueryMany,
    create,
    update,
    remove,
  };
};
