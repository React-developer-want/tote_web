import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { boardActions } from "../../redux/reducers/board";

const Subtask = ({ id, taskId, colId, setIsChanged }) => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.boards.selectedBoard);
  const col = board.columns.find((col) => col._id === colId);
  const task = col.tasks.find((task) => task._id === taskId);
  const subtask = task.subtasks.find((subtask) => subtask._id === id);
  const checked = subtask.isCompleted;

  const onChange = (e) => {
    dispatch(
      boardActions.setSubtaskCompleted({ id, taskId, colId })
    );
    setIsChanged(true);
  };

  return (
    <div className="subtask">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <p className={`${checked ? 'checked': ''}`}>
      {subtask.title}
      </p>
    </div>
  );
}

export default Subtask;
