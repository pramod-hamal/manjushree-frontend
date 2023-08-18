import React, { useContext } from "react";
import { notification } from "antd";
import type {
  NotificationInstance,
  NotificationPlacement,
} from "antd/es/notification/interface";

export type NotificationType =
  | "success"
  | "info"
  | "danger"
  | "error"
  | "warning";

export interface ContextValue {
  openNotification: any;
  api?: NotificationInstance | null;
}

export interface OpenNotification {
  placement?: NotificationPlacement;
  type: NotificationType;
  title: string;
  description?: string;
}

const ToastContext = React.createContext({ openNotification: () => {} });

export const ToastContextComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = ({
    placement,
    type,
    title,
    description,
  }: OpenNotification): void => {
    switch (type) {
      case "success":
        return api.success({
          message: title,
          description: description ?? "",
          placement: placement ?? "topRight",
        });
      case "error":
        return api.error({
          message: title,
          description: description ?? "",
          placement: placement ?? "topRight",
        });
      case "info":
        return api.info({
          message: title,
          description: description ?? "",
          placement: placement ?? "topRight",
        });
      case "warning":
        return api.warning({
          message: title,
          description: description ?? "",
          placement: placement ?? "topRight",
        });
      default:
        break;
    }
  };

  const contextValue: ContextValue = {
    openNotification,
    api,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {contextHolder}
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const { openNotification, api }: ContextValue = useContext(ToastContext);

  const showToast = (props: OpenNotification) => openNotification(props);

  return showToast;
};
