import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  customDateFormatter,
  capitalizeFirstWord
} from "../../util/formatters";
import type { RootState, AppDispatch } from "../../store"; 
import type { Todo, FilterType } from "../../types/types";
import {
  CANCEL_EDIT,
  CREATE_TODO,
  EDIT_TODO,
  SORT_BY,
  TODO_LIST
} from "../constants";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { List } from "../List/List";
import { Label } from "../label/Label";
import { Select } from "../Select/Select";
import {
  addTodoAsync,
  deleteAllTodosAsync,
  deleteTodoAsync,
  markTodoCompletedSync,
  sortTodosBySync,
  updateTodoAsync
} from "../../store/actions/todoAuctions";
import { Modal } from "../Modal/Modal";

const initialTodo: Todo = {
  _id: "",
  value: "",
  completed: false,
  date: ""
};

export function Todos() {
  const [todo, setTodo] = useState<Todo>(initialTodo);
  const [todoEdit, setTodoEdit] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const auth = useSelector((state: RootState) => state.auth);
  const todosState = useSelector((state: RootState) => state.todo);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setTodo(initialTodo);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTodo({ ...todo, value });
  };

  const handleClickActivateTodoEdit = (data: Todo) => {
    setTodoEdit(true);
    setTodo(data);
  };

  const handleClickTodoEditCancel = () => {
    setTodoEdit(false);
    setTodo(initialTodo);
  };

  const handleClickDeleteTodo = (data: Todo) => {
    dispatch(deleteTodoAsync(data._id));
  };

  const handleClickDeleteAllTodos = () => dispatch(deleteAllTodosAsync());

  const handleChangeInputCheckbox = (data: Todo) => {
    dispatch(markTodoCompletedSync(data._id));
  };

  const handleChangeSortTodosBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as FilterType;
    dispatch(sortTodosBySync(value));
  };

  const handleSubmitTodoCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!auth.isAuthenticated && todosState.todos.length >= 3) {
      setAlertMessage(
        "You can only create up to 3 todos. Please login or register to create more."
      );
      return;
    }
    if (todoEdit) {
      // Update existing todo
      dispatch(
        updateTodoAsync({ ...todo, value: capitalizeFirstWord(todo.value) })
      );
      setTodoEdit(false);
    } else {
      // Create new todo
      const { _id, ...todoWithoutId } = todo; // Remove id to let backend generate it
      dispatch(
        addTodoAsync({
          ...todoWithoutId,
          value: capitalizeFirstWord(todo.value),
          date: Date.now()
        })
      );
    }
    setTodo(initialTodo);
  };

  return (
    <div className="container mt-10">
      {alertMessage ? (
        <Modal
          message={alertMessage}
          link1={{ to: "/login", label: "Login" }}
          link2={{ to: "/signup", label: "Signup" }}
          onClose={() => setAlertMessage("")}
        />
      ) : null}
      <form className="flex my-5" onSubmit={handleSubmitTodoCreate}>
        <Input
          type="text"
          onChange={handleInputChange}
          placeholder="Create your todo list :)"
          value={todo.value}
          className="input-text flex-3"
        />
        <Button
          type="submit"
          className="primary-button flex-1"
          hidden={todoEdit}
          disabled={!todo.value}
        >
          {CREATE_TODO}
        </Button>
        <Button
          type="submit"
          className="primary-button"
          hidden={!todoEdit}
          disabled={!todo.value}
        >
          {EDIT_TODO}
        </Button>
        <Button
          className="cancel-button"
          type="button"
          onClick={handleClickTodoEditCancel}
          hidden={!todoEdit}
        >
          {CANCEL_EDIT}
        </Button>
      </form>
      <div className="my-6">
        <div hidden={!todosState.todos.length}>
          <div hidden={!(todosState.todos.length > 1)}>
            <Label htmlFor="sortBy" className="block mb-1 font-medium text-licorice-light">
              {SORT_BY}
            </Label>
            <Select
              id="filterBy"
              name="filterBy"
              className="border px-3 py-2 rounded w-full text-raspberry border-licorice"
              onChange={handleChangeSortTodosBy}
            >
              <option value="default">default</option>
              <option value="completed">Completed</option>
              <option value="active">Active</option>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg text-licorice-light font-semibold my-2">
              {TODO_LIST}
            </h3>
            <button className="text-raspberry cursor-pointer hover:underline" onClick={handleClickDeleteAllTodos}>
              delete all
            </button>
          </div>
        </div>
        <ul className="space-y-2">
          {todosState.todos.length > 0 &&
            todosState.todos.map((el) => (
              <List
                keyProp={el.date}
                className={`list ${
                  el.completed ? "bg-gray-200 opacity-60" : ""
                }`}
              >
                <div className="w-full flex items-center justify-between">
                  <span className="text-licorice">{el.value}</span>
                  <div className="space-x-2">
                    <Button
                      className="text-licorice hover:text-raspberry cursor-pointer"
                      onClick={() => handleClickActivateTodoEdit(el)}
                      hidden={el.completed}
                    >
                      <span className="material-icons">edit</span>
                    </Button>
                    <Button
                      className="text-licorice hover:text-raspberry cursor-pointer"
                      onClick={() => handleClickDeleteTodo(el)}
                      hidden={el.completed}
                    >
                      <span className="material-icons">delete</span>
                    </Button>
                  </div>
                </div>
                <div className="my-2 text-sm text-gray-500 w-full text-left">{`created: ${customDateFormatter.format(
                  el.date
                )}`}</div>
                <div className="flex items-center w-full">
                  <Input
                    id={`checkbox-${el.date}`}
                    type="checkbox"
                    checked={el.completed}
                    onChange={() => handleChangeInputCheckbox(el)}
                    className="input-checkbox"
                  />
                  <span className="absolute ml-1 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M6 10l3 3 5-5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <Label
                    htmlFor={`checkbox-${el.date}`}
                    className={`ml-2 select-none ${
                      el.completed ? "text-raspberry" : "text-licorice"
                    }`}
                  >
                    {el.completed
                      ? "Todo complete"
                      : "You can mark this todo as complete"}
                  </Label>
                </div>
              </List>
            ))}
        </ul>
      </div>
    </div>
  );
}
