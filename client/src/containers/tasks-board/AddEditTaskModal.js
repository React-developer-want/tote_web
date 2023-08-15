import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { boardActions } from "../../redux/reducers/board";
import Dropdown from "../../components/dropdown";
import { sendErrorNotification, sendSuccessNotification } from "../../services/notifications";
import { createTask, updateTask } from "../../services/tasks/tasks";

const AddEditTaskModal = ({
  type,
  device,
  setIsTaskModalOpen,
  setIsAddTaskModalOpen,
  taskId,
  prevColIndex = 0
}) => {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const board = useSelector((state) => state.boards.selectedBoard);

  const columns = board.columns;
  const col = columns.find((col) => col._id === prevColIndex);
  const task = col ? col.tasks.find((task) => task._id === taskId) : [];
  const [status, setStatus] = useState(task.status || '');
  const [newColIndex, setNewColIndex] = useState(prevColIndex);
  const [subtasks, setSubtasks] = useState([
    { title: "", isCompleted: false },
    { title: "", isCompleted: false },
  ]);

  const onChangeSubtasks = (id, newValue, index) => {
    setSubtasks((prevState) => {
      const newState = [...prevState];
      let subtask;
      if(type === 'edit'){  
        subtask = newState.find((subtask) => subtask._id === id);
      } else {
        subtask = newState.find((_, idx) => idx === index);
      }
      subtask.title = newValue;
      return newState;
    });
  };

  const onChangeStatus = (value, selectedIndex) => {
    setStatus(value);
    setNewColIndex(columns[selectedIndex]._id);
  };

  const validate = () => {
    if (!title.trim()) {
      return false;
    }
    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        return false;
      }
    }
    return true;
  };

  if (type === "edit" && isFirstLoad) {
    setSubtasks(
      task.subtasks.map((subtask) => {
        return { ...subtask };
      })
    );
    setTitle(task.title);
    setDescription(task.description);
    setIsFirstLoad(false);
  }

  if (type === "add" && isFirstLoad) {
    setNewColIndex(columns[0]._id);
    setStatus(columns[0].name);
    setIsFirstLoad(false);
  }

  const onDelete = (id, index) => {
    if(type === 'edit'){  
      setSubtasks((prevState) => prevState.filter((el) => el._id !== id));
    }else {
      setSubtasks((prevState) => prevState.filter((_, idx) => idx !== index));
    }
  };

  const addTask = async (newTask, columnId, boardId) => {
    setIsSaveLoading(true);
    const result = await createTask(boardId, columnId, newTask);
    if(result.status === 'success'){
      sendSuccessNotification(result.message);
      dispatch(boardActions.addTask({newTask: result.response, columnId}));
    }else{
      sendErrorNotification(result.message);
    }
    setIsSaveLoading(false);
  }

  const editTask = async (boardId, taskId, columnId, newTask) => {
    setIsSaveLoading(true);
    const result = await updateTask(boardId, taskId, columnId, newTask);
    if(result.status === 'success') {
      sendSuccessNotification(result.message);
      dispatch(boardActions.editTask({ newTask: result.response, columnId }));
    }else{
      sendErrorNotification(result.message);
    }
  }

  const onSubmit = async (type) => {
    const newTask = { title, description, subtasks, status };
    if (type === "add") {
      await addTask(newTask, newColIndex, board._id);
    } else {
      await editTask(board._id, task._id, newColIndex, newTask);
    }
  };

  return (
    <div
      className={`add-task-modal modal ${device === 'mobile' ? 'mobile-modal': ''}`}
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsAddTaskModalOpen(false);
      }}
    >
      {/* Modal Section */}

      <div
        className="content"
      >
        <h3 className="title">
          {type === "edit" ? "Edit" : "Add New"} Task
        </h3>

        {/* Task Name */}

        <div className="task-name">
          <label>
            Task Name
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="task-name-input"
            type="text"
            placeholder=" e.g Take coffee break"
          />
        </div>

        {/* Description */}
        <div className="task-desc">
          <label>
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="task-description-input"
            placeholder="e.g. It's always good to take a break. This 
            15 minute break will  recharge the batteries 
            a little."
          />
        </div>

        {/* Subtasks */}

        <div className="subtasks-container">
          <label className="title">
            Subtasks
          </label>

          {subtasks.map((subtask, index) => (
            <div key={index} className="subtask">
              <input
                onChange={(e) => {
                  onChangeSubtasks(subtask._id, e.target.value, index);
                }}
                type="text"
                value={subtask.title}
                placeholder=" e.g Take coffee break"
              />
              <span onClick={()=> onDelete(subtask._id, index)}>&times;</span>
            </div>
          ))}

          <button
            className="add-new-task-btn"
            onClick={() => {
              setSubtasks((state) => [
                ...state,
                { title: "", isCompleted: false },
              ]);
            }}
          >
            + Add New Subtask
          </button>
        </div>

        {/* current Status  */}
        <div className="status">
          <Dropdown
            defaultValue={'Select a status -'}
            label='Current Status'
            value={status}
            onChange={onChangeStatus}
            items={columns.map(column => column.name)}
          />
          <button
            onClick={() => {
              const isValid = validate();
              if (isValid) {
                onSubmit(type);
                setIsAddTaskModalOpen(false);
                type === "edit" && setIsTaskModalOpen(false);
              }
            }}
            className="save-btn"
          >
           {isSaveLoading ? '...Loading' : type === "edit" ? " save edit" : "Create task"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditTaskModal;
