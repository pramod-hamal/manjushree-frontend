import React from "react";
import ProfileTags from "./tags/Tags";
import ProfileAlerts from "./alerts/Alerts";
import ParticipantForm from "@/app/participants/add/components/ParticipantFormleanq_support_coordinator";
import { Divider } from "antd";

export default function Profile() {
  return (
    <div className="bg-white p-5">
      <ProfileTags />
      <Divider />
      <ProfileAlerts />
      <Divider />
      {/* <div className="bg-white p-5 shadow">
        <ParticipantForm />
      </div> */}
    </div>
  );
}
