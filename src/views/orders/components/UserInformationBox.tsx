import { FC } from "react";
import useUsers from "@/hooks/useUsers";

type Props = {
  userId: string;
};

const UserInformationBox: FC<Props> = ({ userId }) => {
  const { useQuerySingle } = useUsers();
  const { data: user, error } = useQuerySingle(userId);

  if (error)
    return (
      <div className="w-full rounded p-6 min-h-44 bg-white space-y-6">
        <h1 className="text-xl font-semibold">Customer Details</h1>
        <p>Could not find user</p>
      </div>
    );

  return (
    <div className="w-full rounded p-6 min-h-44 bg-white space-y-6">
      <h1 className="text-xl font-semibold">Customer Details</h1>

      {user ? (
        <div className="space-y-4">
          <div>
            <div className="text-sm text-muted-foreground">Full Name</div>
            <div className="text-md font-medium">
              {user.displayName || `${user.lastName} (No Display Name)`}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="text-md">{user.email}</div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground">Phone</div>
              <div className="text-md">{user.phoneNumber}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-muted-foreground">Could not find user</div>
      )}
    </div>
  );
};

export default UserInformationBox;
