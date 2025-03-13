import Identifiable from "../models/base/Identifyable";
import createRestClient, { RestClient } from "./restClient";
import { ApiResponse } from "./restClient"; // Assuming `ApiResponse<T>` is defined in `restClient.ts`

export type RequestFunction<Request> = {
  (element: Partial<Request>): ApiResponse<Request>;
};

export type GetManyRequestFunction<T> = {
  (): ApiResponse<T[]>;
};

export type IdListRequestFunction<T> = {
  (id: string): ApiResponse<T[]>;
};

export type IdRequestFunction<Response> = {
  (id: string): ApiResponse<Response>;
};

export type BindOneFunction<Response> = {
  (relationId: string, elementId: string): ApiResponse<Response>;
};

// export type PaginationRequestFunction<Response> = {
//   (token?: ContinuationToken): ApiResponse<Pagination<Response>>;
// };

export type CrudServiceType<Request extends Partial<Identifiable>> = {
  path: string;
  queryMany: GetManyRequestFunction<Required<Request>>;
  // queryPagination: PaginationRequestFunction<Request>;
  querySingle: IdRequestFunction<Request>;
  create: RequestFunction<Request>;
  update: RequestFunction<Request>;
  delete: RequestFunction<{ id?: string } | string>;
};

export function crudService<Request extends Partial<Identifiable>>(
  client: RestClient,
  path: string
): CrudServiceType<Request> {
  const elementPath = (id: string) => `${path}/${id}`;

  return {
    path,

    queryMany: async () => {
      return client.get<Required<Request>[]>(path);
    },

    // queryPagination: async (token?: ContinuationToken) => {
    //   return client.get<Pagination<Request>>(path, {
    //     continuationToken: token?.continuationToken,
    //     page: token?.page,
    //   });
    // },

    querySingle: async (id: string) => {
      if (!id) throw Error("No id provided");
      return client.get<Request>(elementPath(id));
    },

    create: async (element: Partial<Request>) => {
      return client.post<Request>(path, element);
    },

    update: async (element: Partial<Request>) => {
      if (!element.id) throw Error("No id provided");
      return client.put<Request>(elementPath(element.id), element);
    },

    delete: async (value: { id?: string } | string) => {
      const id = typeof value === "string" ? value : value.id;
      if (!id) throw Error("No id provided");
      return client.delete(elementPath(id));
    },
  };
}
