import { shuffle } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "./Task";
import { boardActions } from "../../redux/reducers/board";
import { dragTaskToNewCol } from "../../services/tasks/tasks";
import { sendErrorNotification, sendSuccessNotification } from "../../services/notifications";

const colors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-green-500",
  "bg-indigo-500",
  "bg-yellow-500",
  "bg-pink-500",
  "bg-sky-500",
];

const Column = ({ colId }) => {

  const dispatch = useDispatch();
  const [color, setColor] = useState(null)
  const board = useSelector((state) => state.boards.selectedBoard);
  const col = board.columns.find((col) => col._id === colId);
  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [dispatch]);

  const updateDraggedTask = async (boardId, taskId, { prevColId, colId }) => {
    const result = await dragTaskToNewCol(boardId, taskId, { prevColId, colId });
    if(result.status === 'success') {
      dispatch(boardActions.dragTask({ colId, prevColId, taskId, task: result.response }));
      sendSuccessNotification(result.message);
    }else{
      sendErrorNotification(result.message);
    }
  }

  const handleOnDrop = async (e) => {
    const { prevColId, taskId } = JSON.parse(e.dataTransfer.getData("text"));
    if (colId === prevColId) return;
    await updateDraggedTask(board._id, taskId, { prevColId, colId });
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      className="tasks-column"
    >
      <p className="column-title">
        <div className={`${color} `} />
        {col.name} ({col.tasks.length})
      </p>

      {col.tasks.map((task, index) => (
        <Task key={index} taskId={task._id} colId={colId} />
      ))}
    </div>
  );
}

export default Column;
