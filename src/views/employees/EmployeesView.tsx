import { useEffect } from "react";
import { useNotifications } from "../../providers/NotificationProvider";
import { FiPlus } from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";

const EmployeesView = () => {
  const { notification } = useNotifications();
  const { logout } = useAuth0();

  function test() {
    notification.success("TEst");
    notification.warning("TEst");
    notification.error("TEst");
    notification.info("TEst");
  }
  useEffect(() => {
    logout();
  }, []);
  return (
    <div onClick={test} className="">
      <div className="flex justify-end">
        <button className="bg-primary text-white p-2 flex gap-2 items-center rounded">
          <FiPlus size={18} />
          Create New Employee
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default EmployeesView;
