import { useQuery } from "@tanstack/react-query";
import { PATH_KEYS } from "../services/appServices";
import { useItemsCrud } from "./common/useItemsCrud";
import { useItemService } from "./common/useServices";
import User from "@/models/user/User";

const useUsers = () => {
  /**** Services ****/
  const userService = useItemService((services) => services.users);

  const usersCrud = useItemsCrud<User>(
    [PATH_KEYS.companies],
    (services) => services.users
  );

  /**** Queries & Mutations ****/

  const useQueryMe = () =>
    useQuery({
      queryKey: ["users", "me"],
      queryFn: async () => await userService.me(),
    });

  /**** Value ****/
  return {
    ...usersCrud,
    userService,
    useQueryMe,
  };
};

export default useUsers;
