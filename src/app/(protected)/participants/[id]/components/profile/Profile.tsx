import React from "react";
import ProfileTags from "./tags/Tags";
import ProfileAlerts from "./alerts/Alerts";
import { Divider } from "antd";

export default function Profile() {
  return (
    <div className="p-5 bg-white">
      <ProfileTags />
      <Divider />
      <ProfileAlerts />
      <Divider />
    </div>
  );
}
