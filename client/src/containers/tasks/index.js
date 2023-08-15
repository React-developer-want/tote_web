/* eslint-disable react-hooks/exhaustive-deps */
import WelcomePage from "./welcome-page";
import './styles.scss';
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllBoards } from "../../services/tasks/taskBoards";
import { boardActions } from "../../redux/reducers/board";
import Loader from "../../components/loader";

const Task = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchBoards = async () => {
    const result = await getAllBoards();
    if(result.status === 'success'){
      const boards = result.response;
      dispatch(boardActions.setBoardsData(boards));
    }
    setIsLoading(false);
  }

  useEffect(()=>{
    fetchBoards();
  },[]);

  return ( isLoading ? <Loader/> :
    <div className="task-page">
      <WelcomePage fetchBoards={fetchBoards}/>
    </div>
  )
}

export default Task;