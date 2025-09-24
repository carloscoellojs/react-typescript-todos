import axios from "axios";
import {
  addTodo,
  addTodoError,
  updateTodo,
  updateTodoError,
  deleteTodo,
  deleteTodoError,
  deleteAllTodos,
  deleteAllTodosError,
  markTodoCompleted,
  markTodoCompletedError,
  sortTodosBy,
  sortTodosByError
} from "../reducers/todoReducer";
import type { Todo } from "../../types/types";

export const addTodoAsync = (todo: { value: string; completed: boolean; date: number }) => async (dispatch: any) => {
  try {
    const response = await axios.post("/todo/add", todo);
    dispatch(addTodo(response.data));
  } catch (error: unknown) {
    if(axios.isAxiosError(error)) {
      dispatch(addTodoError(error.response?.data.error));
    }
  }
};

export const updateTodoAsync = (todo: Todo) => async (dispatch: any) => {
  try {
    const response = await axios.put(`/todo/update/${todo._id}`, todo);
    dispatch(updateTodo(response.data));
  } catch (error: unknown) {
    if(axios.isAxiosError(error)) {
      dispatch(updateTodoError(error.response?.data.error));
    }
  }
};

export const deleteTodoAsync = (id: string) => async (dispatch: any) => {
  try {
    await axios.delete(`/todo/delete/${id}`);
    dispatch(deleteTodo(id));
  } catch (error: unknown) {
    if(axios.isAxiosError(error)) {
      dispatch(deleteTodoError(error.response?.data.error));
    }
  }
};

export const deleteAllTodosAsync = () => async (dispatch: any) => {
  try {
    await axios.delete("/todo/delete");
    dispatch(deleteAllTodos());
  } catch (error: unknown) {
    if(axios.isAxiosError(error)) {
      dispatch(deleteAllTodosError(error.response?.data.error));
    }
  }
};

export const markTodoCompletedSync = (id: string) => (dispatch: any) => {
  try {
    dispatch(markTodoCompleted(id));
  } catch (error) {
    dispatch(markTodoCompletedError("Failed to mark todo as completed"));
  }
};

export const sortTodosBySync = (criteria: string) => (dispatch: any) => {
  try {
    dispatch(sortTodosBy(criteria));
  } catch (error) {
    dispatch(sortTodosByError("Failed to sort todos"));
  }
};
