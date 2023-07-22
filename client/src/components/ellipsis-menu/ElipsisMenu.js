import React from "react";
import './styles.scss';

const ElipsisMenu = ({ type, setOpenEditModal, setOpenDeleteModal }) => {
  return (
    <div
      className={
        type === "Boards"
          ? "board-elipsis-menu"
          : "task-elipsis-menu"
      }
    >
      <div className="elipsis-content">
        <div className="details">
          <p
            onClick={() => {
              setOpenEditModal();
            }}
            className="edit-type"
          >
            Edit {type}
          </p>

          <p
            onClick={() => setOpenDeleteModal()}
            className="delete-type"
          >
            Delete {type}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ElipsisMenu;
