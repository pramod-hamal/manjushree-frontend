import React from "react";
import { notification } from "antd";
import { ContextValue, OpenNotification } from "./interface/toastProvider.interface";


export const ToastContext = React.createContext({ openNotification: () => { } });

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

