import React, { useState } from 'react';
import BoardCard from './board-card';
import { useDispatch, useSelector } from 'react-redux';
import { boardActions } from '../../redux/reducers/board';
import CreateBoardModal from '../../components/create-board-modal/create-board-modal';
import { useNavigate } from 'react-router-dom';

const WelcomePage = ({ fetchBoards }) => {
  const { boards } = useSelector(state => state.boards);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState({ type: 'add', status: false });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickEdit = (id) => {
    dispatch(boardActions.setSelectedBoard(boards.find(board => board._id === id)));
    setIsBoardModalOpen({ type: 'edit', status: true, id });
  }

  const onSelectBoard = (id) => {
    dispatch(boardActions.setSelectedBoard({id}));
    navigate(`/tasks/board/${id}`);
  }

  return (
    <div className='tasks-welcome-page'>
      {isBoardModalOpen.status ? <CreateBoardModal
        setIsBoardModalOpen={(status)=> setIsBoardModalOpen(prev => ({ ...prev, status}))}
        type={isBoardModalOpen.type}
        refetchData={fetchBoards}
      /> : null}
      {boards.length !== 0 ? (
        <>
        <div className="boards-container">
          {boards.map((board, index)=> {
            return <BoardCard
              key={board.name + index} 
              name={board.name} 
              id={board._id}
              onClickEdit={onClickEdit}
              onSelectBoard={onSelectBoard}
            />
          })}
        </div>
        <div className="create-btn" onClick={()=> setIsBoardModalOpen({ type: 'add', status: true })}>
          + Create new board
        </div>
        </>
      ) : 
      <div className='empty-board' onClick={()=> setIsBoardModalOpen({ type: 'add', status: true })}>
        Click to create new
      </div>}
    </div>
  )
}

export default WelcomePage
