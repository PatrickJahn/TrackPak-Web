import User from "@/models/user/User";
import { CrudServiceType, crudService } from "./crudService";
import { RestClient } from "./restClient";
import { PATHS } from "./appServices";

export type UserServiceType = CrudServiceType<User> & {
  me: () => Promise<User>;
};

export const UserServices = (
  client: RestClient,
  path: string
): UserServiceType => ({
  ...crudService<User>(client, path),

  me: async () => {
    return await client
      .get<User>(PATHS.users + "/me")
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  },
});

export default UserServices;
