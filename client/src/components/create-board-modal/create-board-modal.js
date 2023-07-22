import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { boardActions } from '../../redux/reducers/board';
import './styles.scss';
import { createBoard, updateBoardById } from '../../services/tasks/taskBoards';
import { sendErrorNotification, sendSuccessNotification } from '../../services/notifications';

const CreateBoardModal = ({ setIsBoardModalOpen, type, refetchData }) => {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [name, setName] = useState("");
  const [newColumns, setNewColumns] = useState([
    { name: "Todo", tasks: [], id: uuidv4() },
    { name: "Doing", tasks: [], id: uuidv4() },
  ]);
  const boards = useSelector((state) => state.boards);
  const board = type === "edit" ? boards.selectedBoard : {};
  
  if (type === "edit" && isFirstLoad) {
    setNewColumns(
      board?.columns?.map((col) => {
        return { ...col, id: uuidv4() };
      }) || []
    );
    setName(board.name);
    setIsFirstLoad(false);
  }

  const validate = () => {
    if (!name.trim()) {
      return false;
    }
    for (let i = 0 ; i < newColumns.length ; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }
    return true;
  };

  const onChange = (id, newValue) => {
    setNewColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  };

  const onDelete = (id) => {
    setNewColumns((prevState) => prevState.filter((el) => el.id !== id));
  };

  const addBoard = async () => {
    const result = await createBoard({ name, columns: newColumns });
    if(result.status === "success") {
      dispatch(boardActions.addBoard({ board: result.response }));
      sendSuccessNotification(result.message);
    }else{
      sendErrorNotification(result.message);
    }
    refetchData();
  }

  const editBoard = async () => {
    const result = await updateBoardById(board._id, { name, columns: newColumns });
    if(result.status === "success") {
      dispatch(boardActions.editBoard({ name, newColumns }));
      sendSuccessNotification(result.message);
    }else{
      sendErrorNotification(result.message);
    }
    refetchData();
  }

  const onSubmit = async (type) => {
    setIsBtnLoading(true);
    if (type === "add") {
      await addBoard();
    } else {
      await editBoard();
    }
    setIsBtnLoading(false);
    setIsBoardModalOpen(false);
  };

  return (
    <div className="create-board-modal" 
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsBoardModalOpen(false);
      }}
    >
      <div className="content">
        <h3 className="title">
          {type === "edit" ? "Edit" : "Add New"} Board
        </h3>

        {/* Task Name */}

        <div className="board-name">
          <label>
            Board Name
          </label>
          <input
            placeholder=" e.g Web Design"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="board-name-input"
          />
        </div>

        {/* Board Columns */}

        <div className="board-columns">
          <label>
            Board Columns
          </label>

          {newColumns?.map((column, index) => (
            <div key={index} className="column">
              <input
                onChange={(e) => {
                  onChange(column.id, e.target.value);
                }}
                type="text"
                value={column.name}
              />
              <span onClick={()=> onDelete(column.id)}>&times;</span>
            </div>
          ))}
          <div className='btns'>
            <button
              className="column-btn btn"
              onClick={() => {
                setNewColumns((state) => [
                  ...state,
                  { name: "", tasks: [], id: uuidv4() },
                ]);
              }}
            >
              + Add New Column
            </button>
            <button
              onClick={() => {
                const isValid = validate();
                if (isValid === true) onSubmit(type);
              }}
              className="save-btn btn"
              disabled={isBtnLoading}
            >
              {isBtnLoading ? '...Loading' : type === "add" ? "Create New Board" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBoardModal;
