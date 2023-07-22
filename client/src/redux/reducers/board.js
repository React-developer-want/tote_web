import { createSlice } from "@reduxjs/toolkit";

const boardSlice = createSlice({
  name: "board",
  initialState: {
    boards: [],
    selectedBoard: {}
  },
  reducers: {
    setBoardsData: (state, action) => {
      state.boards = action.payload;
    },
    setSelectedBoard: (state, action) => {
      state.selectedBoard = action.payload;
    },
    addBoard: (state, action) => {
      const { board } = action.payload;
      state.boards.push(board);
    },
    editBoard: (state, action) => {
      const { name, newColumns } = action.payload;
      const board = state.selectedBoard;
      board.name = name;
      board.columns = newColumns;
    },
    deleteBoard: (state, action) => {
      const board = state.selectedBoard;
      state.boards.splice(state.boards.indexOf(board), 1);
    },
    setBoardActive: (state, action) => {
      state.boards.map((board, index) => {
        index === action.payload.index
          ? (board.isActive = true)
          : (board.isActive = false);
        return board;
      });
    },
    addTask: (state, action) => {
      const { newTask, columnId } =
        action.payload;
      const board = state.selectedBoard;
      const column = board.columns.find((col) => col._id === columnId);
      column.tasks.push(newTask);
    },
    editTask: (state, action) => {
      const { newTask, columnId } = action.payload;
      const board = state.selectedBoard;
      const newColumn = board.columns.find((col) => col._id === columnId);
      const taskIndex = newColumn.tasks.indexOf(newTask);
      if(taskIndex !== -1) {
        const task = newColumn[taskIndex];
        task.name = newTask.name;
        task.description = newTask.description;
        task.subtasks = newTask.subtasks;
        task.status = newTask.status;
      }else{
        // Find the task and its current column ID
        let task;
        let columnIndex;
        for (let i = 0; i < board.columns.length; i++) {
          task = board.columns[i].tasks.find(task => task._id === newTask._id);
          if (task) {
            columnIndex = i;
            break;
          }
        }
        board.columns[columnIndex].tasks = board.columns[columnIndex].tasks.filter(task => task._id !== newTask._id);
        newColumn.tasks.push(newTask);
      }
    },
    dragTask: (state, action) => {
      const { colId, prevColId, taskId, task } = action.payload;
      if(colId === prevColId) return;
      const board = state.selectedBoard;
      const prevCol = board.columns.find((col) => col._id === prevColId);
      prevCol.tasks = prevCol.tasks.filter(task => task._id !== taskId);
      board.columns.find((col) => col._id === colId).tasks.push(task);
    },
    setSubtaskCompleted: (state, action) => {
      const { colId, taskId, id } = action.payload;
      const board = state.selectedBoard;
      const col = board.columns.find((col) => col._id === colId);
      const task = col.tasks.find((task) => task._id === taskId);
      const subtask = task.subtasks.find((subtask) => subtask._id === id);
      subtask.isCompleted = !subtask.isCompleted;
    },
    setTaskStatus: (state, action) => {
      const { colIndex, newColIndex, status, taskIndex } = action.payload;
      const board = state.selectedBoard;
      const columns = board.columns;
      const col = columns.find((col, i) => i === colIndex);
      if (colIndex === newColIndex) return;
      const task = col.tasks.find((task, i) => i === taskIndex);
      task.status = status;
      col.tasks = col.tasks.filter((task, i) => i !== taskIndex);
      const newCol = columns.find((col, i) => i === newColIndex);
      newCol.tasks.push(task);
    },
    deleteTask: (state, action) => {
      const {colId, taskId} = action.payload;
      const board = state.selectedBoard;
      const col = board.columns.find((col) => col._id === colId);
      col.tasks = col.tasks.filter((task) => task._id !== taskId);
    },
  }
})

export const boardReducer = boardSlice.reducer;
export const boardActions = boardSlice.actions;