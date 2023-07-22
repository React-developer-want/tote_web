import React, { useState } from "react";
import CreateBoardModal from "../../components/create-board-modal/create-board-modal";


const EmptyBoard = ({ type, id, refetchData }) => {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  return (
    <div className="empty-board">
      <h3 className="title">
        {type === "edit"
          ? "This board is empty. Create a new column to get started."
          : "There are no boards available. Create a new board to get started"}
      </h3>
      <button
        onClick={() => {
          setIsBoardModalOpen(true);
        }}
      >
        {type === "edit" ? "+ Add New Column" : "+ Add New Board"}
      </button>
      {isBoardModalOpen && (
        <CreateBoardModal
          type={type}
          id={id}
          setIsBoardModalOpen={setIsBoardModalOpen}
          refetchData={refetchData}
        />
      )}
    </div>
  );
}

export default EmptyBoard;
