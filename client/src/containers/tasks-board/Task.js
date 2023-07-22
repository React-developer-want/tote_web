import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskModal from "./task-modal";

const Task = ({ colId, taskId }) => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const board = useSelector((state) => state.boards.selectedBoard);
  const columns = board.columns;
  const col = columns.find((col) => col._id === colId);
  const task = col.tasks.find((task) => task._id === taskId);

  let completed = 0;
  let subtasks = task.subtasks;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskId, prevColId: colId })
    );
  };

  return (
    <div>
      <div
        onClick={()=> setIsTaskModalOpen(true)}
        draggable
        onDragStart={handleOnDrag}
        className="task"
      >
        <p className="title">{task.title}</p>
        <p className="details">
          {completed} of {subtasks.length} completed tasks
        </p>
      </div>
      {isTaskModalOpen && (
        <TaskModal
          colId={colId}
          taskId={taskId}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </div>
  );
}

export default Task;
