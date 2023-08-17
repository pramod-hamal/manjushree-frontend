import { memo, useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { MoreOutlined, PlusCircleOutlined } from "@ant-design/icons";

import { kanbanData } from "@/constants/data/kanbanleanq_support_coordinator";
import CardItem from "./CardItems";

function KanbanBoard() {
  const [ready, setReady] = useState<boolean>(false);
  const [boardData, setBoardData] = useState<any>();

  /**
   * Drag items from one board to another
   * @param {any} re:any
   * @returns {void}
   */
  const onDragEnd = (re: any): void => {
    if (!re.destination) return;
    let newBoardData = boardData;
    var dragItem =
      newBoardData[parseInt(re.source.droppableId)]?.items[re.source.index];
    newBoardData[parseInt(re.source.droppableId)]?.items.splice(
      re.source.index,
      1
    );
    newBoardData[parseInt(re.destination.droppableId)]?.items.splice(
      re.destination.index,
      0,
      dragItem
    );
    setBoardData(newBoardData);
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      setReady(true);
      setBoardData(kanbanData);
    }
  }, []);

  return (
    <div className=" flex flex-col rounded-md ">
      {/* Board columns */}
      {ready && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-3 gap-5 py-2 ">
            {boardData.map((board: any, boardIndex: number) => {
              return (
                <div
                  key={board.name}
                  className="bg-background my-2 overflow-auto"
                >
                  <KanbanHeader title={board.name} />
                  <Droppable droppableId={boardIndex.toString()}>
                    {(provided: any, snapshot: any) => (
                      <div
                        className="h-[70VH]"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        <div
                          className={` rounded-md flex flex-col relative overflow-hidden h-full ${
                            snapshot.isDraggingOver && "bg-white"
                          }`}
                        >
                          <div className="overflow-y-auto overflow-x-hidden   py-2">
                            {board.items.length > 0 &&
                              board.items.map(
                                (item: any, cardIndex: number) => {
                                  return (
                                    <CardItem
                                      key={item.id.toString()}
                                      data={item}
                                      index={cardIndex}
                                      className="m-3"
                                    />
                                  );
                                }
                              )}
                          </div>
                        </div>
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      )}
    </div>
  );
}

const KanbanHeader = ({ title }: any) => {
  return (
    <div className="flex items-center justify-between">
      <h4 className=" p-3 flex justify-between items-center ">
        <span className="text-md font-semibold  text-gray-600"> {title} </span>
      </h4>
      <div className="flex gap-2 flex-row-reverse">
        <MoreOutlined className="w-5 h-5 text-gray-500" onClick={() => {}} />
        <PlusCircleOutlined
          className="w-5 h-5 text-gray-500"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default memo(KanbanBoard);
