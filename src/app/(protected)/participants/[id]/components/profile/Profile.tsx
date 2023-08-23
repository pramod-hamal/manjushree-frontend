import React from "react";
import { Divider } from "antd";
import ProfileTags from "./tags/Tags";
import ProfileAlerts from "./alerts/Alerts";
import EditProfile from "./form/EditProfile";

export default function Profile() {
  return (
    <div className="p-5 bg-white">
      {/* <ProfileTags />
      <Divider />
      <ProfileAlerts />
      <Divider /> */}
      <EditProfile />
    </div>
  );
}
