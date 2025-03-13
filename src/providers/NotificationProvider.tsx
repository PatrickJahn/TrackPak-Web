import { FC, PropsWithChildren, createContext, useContext } from "react";
import { ToastContainer } from "react-toastify";
import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NOTIFICATION_DURATION = 5000;

// Default options for the toast notifications
const defaultToastOptions: ToastOptions = {
  position: "top-right",
  autoClose: NOTIFICATION_DURATION,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  theme: "light",
};

// Function to show a toast notification

export type NotificationValueType = {
  notification: {
    success: (message: string) => void;
    error: (message: string) => void;
    warning: (message: string) => void;
    info: (message: string) => void;
  };
};

export const NotificationContext = createContext<NotificationValueType | null>(
  null
);

const NotificationProvider: FC<PropsWithChildren> = ({
  children,
  ...props
}) => {
  type ToastType = "success" | "error" | "warning" | "info";

  const showToast = (message: string, type: ToastType = "info") => {
    toast[type](message, defaultToastOptions);
  };

  const notificationValue: NotificationValueType = {
    notification: {
      success: (message: string) => showToast(message, "success"),
      error: (message: string) => showToast(message, "error"),
      warning: (message: string) => showToast(message, "warning"),
      info: (message: string) => showToast(message, "info"),
    },
  };

  return (
    <NotificationContext.Provider {...props} value={notificationValue}>
      <ToastContainer />
      {children}
    </NotificationContext.Provider>
  );
};

export function useNotifications(): NotificationValueType {
  const notification = useContext(NotificationContext);
  if (!notification)
    throw new Error(
      "useNotifications must be used within an NotificationContext"
    );
  return notification;
}

export default NotificationProvider;
