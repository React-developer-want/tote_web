import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { boardActions } from "../../redux/reducers/board";
import Dropdown from "../../components/dropdown";
import Subtask from "./subtask";
import { ThreeDots } from "../../components/icons";
import ElipsisMenu from "../../components/ellipsis-menu/ElipsisMenu";
import DeleteModal from "../../components/delete-modal/DeleteModal";
import AddEditTaskModal from "./AddEditTaskModal";
import { deleteTask, updateTask } from "../../services/tasks/tasks";
import { sendErrorNotification, sendSuccessNotification } from "../../services/notifications";

const TaskModal = ({ taskId, colId, setIsTaskModalOpen }) => {
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const dispatch = useDispatch();
  const board = useSelector((state) => state.boards.selectedBoard);
  const columns = board.columns;
  const col = columns.find((col) => col._id === colId);
  const task = col.tasks.find((task) => task._id === taskId);
  const subtasks = task.subtasks;

  let completed = 0;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const [status, setStatus] = useState(task.status);
  const [newColIndex, setNewColIndex] = useState(colId);
  const onChange = (value, selectedIndex) => {
    setIsChanged(true);
    setStatus(value);
    setNewColIndex(columns[selectedIndex]._id);
  };

  const updateTaskStatus = async (boardId, taskId, columnId, newTask) => {
    const result = await updateTask(boardId, taskId, columnId, newTask);
    if(result.status === 'success') {
      sendSuccessNotification(result.message);
      dispatch(boardActions.editTask({ newTask: result.response, columnId }));
    }else{
      sendErrorNotification(result.message);
    }
  }

  const onClose = async (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    if(isChanged){  
      await updateTaskStatus(board._id, taskId, newColIndex, task);
    }
    setIsTaskModalOpen(false);
  };

  const onDeleteTask = async (boardId, taskId) => {
    const result = await deleteTask(boardId, taskId);
    if(result.status === 'success') {
      sendSuccessNotification(result.message);
      dispatch(boardActions.deleteTask({ taskId, colId }));
    }else{
      sendErrorNotification(result.message);
    }
  }

  const onDeleteBtnClick = async (e) => {
    if (e.target.textContent === "Delete") {
      onDeleteTask(board._id, taskId);
      setIsTaskModalOpen(false);
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };


  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsElipsisMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="task-modal" onClick={onClose}>
      {/* MODAL SECTION */}

      <div className="content">
        <div className="header">
          <h1 className="title">{task.title}</h1>
          <span className="dots" onClick={()=> setIsElipsisMenuOpen(prev=> !prev)}><ThreeDots/></span>
          {isElipsisMenuOpen && (
            <ElipsisMenu
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              type="Task"
            />
          )}
        </div>
        <p className="description">
          {task.description}
        </p>

        <p className="subtask-details">
          Subtasks ({completed} of {subtasks.length})
        </p>

        {/* subtasks section */}

        <div className="subtask-container">
          {subtasks.map((subTask, index) => {
            return (
              <Subtask
                id={subTask._id}
                taskId={taskId}
                colId={colId}
                key={index}
                setIsChanged={setIsChanged}
              />
            );
          })}
        </div>

        {/* Current Status Section */}

        <div className="status">
          <Dropdown 
            defaultValue={'Select a status -'}
            label='Current Status'
            value={status}
            onChange={onChange}
            items={columns.map(column => column.name)}
          />
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          onDeleteBtnClick={onDeleteBtnClick}
          type="task"
          title={task.title}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}

      {isAddTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsAddTaskModalOpen}
          setIsTaskModalOpen={setIsTaskModalOpen}
          type="edit"
          taskId={taskId}
          prevColIndex={colId}
        />
      )}
    </div>
  );
}

export default TaskModal;