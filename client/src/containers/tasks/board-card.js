import { useState } from "react";
import { useDispatch } from "react-redux";
import { boardActions } from "../../redux/reducers/board";
import DeleteModal from "../../components/delete-modal/DeleteModal";
import { deleteBoardById } from "../../services/tasks/taskBoards";
import { sendErrorNotification, sendSuccessNotification } from "../../services/notifications";

const BoardCard = ({ id, name, onClickEdit, onSelectBoard }) => {
  const [isTooltipActive, setIsTooltipActive] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsTooltipActive(false);
    onClickEdit(id);
  }

  const handleDelete = async () => {
    setIsDeleteLoading(true);
    const result = await deleteBoardById(id);
    if(result.status === 'success') {
      dispatch(boardActions.deleteBoard({id}));
      sendSuccessNotification(result.message);
    }else{
      sendErrorNotification(result.message);
    }
    setIsDeleteLoading(false);
    setIsDeleteModalOpen(false);
  }

  return (
    <div className="board-detail-container">
      {isDeleteModalOpen ? <DeleteModal onDeleteBtnClick={handleDelete} isDeleteLoading={isDeleteLoading} setIsDeleteModalOpen={setIsDeleteModalOpen} title={name} type="board" /> : null}
      <div className='board-card' onClick={() => onSelectBoard(id)}>
        <div className='name'>{name}</div>
      </div>
      <div className="actions">
        {isTooltipActive ? <div className='tooltip'>
          <span className='edit' onClick={handleEdit}>Edit board</span>
          <span className='delete' onClick={()=> setIsDeleteModalOpen(true)}>Delete board</span>
        </div> : null}
        <span className='dots' onClick={()=> setIsTooltipActive(prev => !prev)}></span>
      </div>
    </div>
  )
};

export default BoardCard;