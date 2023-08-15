/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import TopSection from './top-section';
import './styles.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Column from './column';
import EmptyBoard from './empty-board';
import CreateBoardModal from '../../components/create-board-modal/create-board-modal';
import { getBoardById } from '../../services/tasks/taskBoards';
import { boardActions } from '../../redux/reducers/board';
import Loader from '../../components/loader';

const TasksBoard = () => {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { id } = useParams();
  const board = useSelector((state) => state.boards.selectedBoard);

  const fetchBoardDetails = async () => {
    const result = await getBoardById(id);
    if(result.status === 'success'){
      dispatch(boardActions.setSelectedBoard(result.response));
    }
    setIsLoading(false);
  };

  useEffect(()=> {
    fetchBoardDetails();
  }, [id]);

  return ( isLoading ? <Loader/> : 
    <div className='tasks-board-page'>
      <TopSection name={board?.name} id={id}/>
      <div className="tasks-container">
      {board?.columns.length > 0 ? (
        <>
          {board.columns.map((col, index) => (
            <Column key={index} colId={col._id} />
          ))}
          <div
            onClick={() => {
              setIsBoardModalOpen(true);
            }}
            className="new-column-btn"
          >
            + New Column
          </div>
        </>
      ) : (
        <>
          <EmptyBoard type="edit" id={id} refetchData={fetchBoardDetails}/>
        </>
      )}
      {isBoardModalOpen && (
        <CreateBoardModal
          type="edit"
          id={id}
          setIsBoardModalOpen={setIsBoardModalOpen}
          refetchData={fetchBoardDetails}
        />
      )}
      </div>
    </div>
  )
}

export default TasksBoard;