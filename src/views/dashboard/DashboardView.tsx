import { useNotifications } from "../../providers/NotificationProvider";
import { FiPlus } from "react-icons/fi";

const DashboardView = () => {
  const { notification } = useNotifications();
  function test() {
    notification.success("TEst");
    notification.warning("TEst");
    notification.error("TEst");
    notification.info("TEst");
  }
  return (
    <div onClick={test} className="">
      <div className="flex justify-end">
        <button className="bg-primary text-white p-2 flex gap-2 items-center rounded">
          <FiPlus size={18} />
          Create New order
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default DashboardView;
