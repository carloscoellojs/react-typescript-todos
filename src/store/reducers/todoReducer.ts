import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AddOrUpdateTodoPayload, TodoState } from "../../types/types";

const initialState: TodoState = {
    todos: [],
    message: {
        error: "false",
        success: ""
    }
}

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<AddOrUpdateTodoPayload>) {
      state.todos.push(action.payload.todo);
      state.message.success = action.payload.message.success;
      state.message.error = action.payload.message.error;
    },
    addTodoError(state, action: PayloadAction<string>) {
      state.message.error = action.payload;
      state.message.success = "";
    },
    updateTodo(state, action: PayloadAction<AddOrUpdateTodoPayload>) {
      const index = state.todos.findIndex(todo => todo._id === action.payload.todo._id);
      if (index !== -1) {
        state.todos[index] = action.payload.todo;
        state.message.success = action.payload.message.success;
        state.message.error = action.payload.message.error;
      }
    },
    updateTodoError(state, action: PayloadAction<string>) {
      state.message.error = action.payload;
      state.message.success = "";
    },
    deleteTodo(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter(todo => todo._id !== action.payload);
      state.message.success = "Todo deleted successfully";
      state.message.error = "";
    },
    deleteTodoError(state, action: PayloadAction<string>) {
      state.message.error = action.payload;
      state.message.success = "";
    },
    deleteAllTodos(state) {
      state.todos = [];
      state.message.success = "All todos deleted successfully";
      state.message.error = "";
    },
    deleteAllTodosError(state, action: PayloadAction<string>) {
      state.message.error = action.payload;
      state.message.success = "";
    },
    markTodoCompleted(state, action: PayloadAction<string>) {
      const todo = state.todos.find(todo => todo._id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        state.message.success = "Todo marked as completed";
        state.message.error = "";
      }
    },
    markTodoCompletedError(state, action: PayloadAction<string>) {
      state.message.error = action.payload;
      state.message.success = "";
    },
    sortTodosBy(state, action: PayloadAction<string>) {
      const sortBy = action.payload;
      if (sortBy === "completed") {
        state.todos.sort((a, b) => Number(b.completed) - Number(a.completed));
      } else if (sortBy === "active") {
        state.todos.sort((a, b) => Number(a.completed) - Number(b.completed));
      } else if (sortBy === "default") {
        state.todos.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
      }
    },
    sortTodosByError(state, action: PayloadAction<string>) {
      state.message.error = action.payload;
      state.message.success = "";
    }
  }
});

export const {
  addTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodos,
  addTodoError,
  updateTodoError,
  deleteTodoError,
  deleteAllTodosError,
  markTodoCompleted,
  markTodoCompletedError,
  sortTodosBy,
  sortTodosByError
} = todoSlice.actions;
export default todoSlice.reducer;
