import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";

const Draggable = dynamic(
  () => import("@hello-pangea/dnd").then((res) => res.Draggable),
  { ssr: false }
);

export default function CardItem(props: any) {
  const { data, index, className, key } = props;
  return (
    <Draggable draggableId={data.id.toString()} key={key} index={index}>
      {(provided, snapshot) => (
        <div
          className={`bg-white rounded-lg shadow-md px-4 py-2 mb-2 flex flex-col  justify-between ${className}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="w-full text-sm font-medium">{data.title}</div>
          <div className="text-xs text-gray-400 py-2 text-left">
            Date : {Date()}
          </div>
          <div className="flex items-end justify-between w-full pt-2">
            <div className="flex flex-col gap-2">
              <label className="text-xs">Employee</label>
              <Image
                width={100}
                height={100}
                alt="asd"
                className=" rounded-full w-5 h-5"
                src={data?.assignees[0]?.avt}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs">Participants</label>
              <Image
                width={100}
                height={100}
                alt="asd"
                className=" rounded-full w-5 h-5"
                src={data?.assignees[0]?.avt}
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
