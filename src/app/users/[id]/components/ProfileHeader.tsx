import Image from "next/image";
import React from "react";

export default function ProfileHeader() {
  return (
    <div className="flex items center justify-between">
      <div className="flex gap-10 items-center">
        <Image
          width={72}
          height={72}
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
          alt="Profile"
        />
        <div className="flex flex-col">
          <span className="text-lg font-semibold">Katherine James</span>
          <span className="text-gray-400 text-sm">Admin</span>
        </div>
      </div>
    </div>
  );
}
