import React from "react";
import './styles.scss';

const DeleteModal = ({ type, title, onDeleteBtnClick, setIsDeleteModalOpen, isDeleteLoading }) => {

  const onClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    setIsDeleteModalOpen(false);
  }

  return (
    // Modal Container
    <div
      onClick={onClose}
      className="delete-modal"
    >
      {/* Delete Modal  */}

      <div className="content">
        <h3 className="title">
          Delete this {type}?
        </h3>
        {type === "task" ? (
          <p className="description">
            Are you sure you want to delete the "{title}" task and its subtasks?
            This action cannot be reversed.
          </p>
        ) : (
          <p className="description">
            Are you sure you want to delete the "{title}" board? This action
            will remove all columns and tasks and cannot be reversed.
          </p>
        )}

        <div className="btns">
          <button
            onClick={onDeleteBtnClick}
            className="delete-btn"
            disabled={isDeleteLoading}
          >
            {isDeleteLoading ? '...Loading' : 'Delete'}
          </button>
          <button
            onClick={() => {
              setIsDeleteModalOpen(false)
            }}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
