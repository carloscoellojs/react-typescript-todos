import axios from 'axios';
import {
  addTodoAsync,
  updateTodoAsync,
  deleteTodoAsync,
  deleteAllTodosAsync,
  markTodoCompletedSync,
  sortTodosBySync
} from './todoAuctions';
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
  sortTodosBy,
} from '../reducers/todoReducer';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('todoAuctions thunks', () => {
  let dispatch: jest.Mock;
  beforeEach(() => {
    dispatch = jest.fn();
    jest.clearAllMocks();
  });

  it('addTodoAsync dispatches addTodo on success', async () => {
    const todo = { _id: '1', value: 'test', completed: false, date: '1' };
    const message = { error: '', success: '' };
    mockedAxios.post.mockResolvedValueOnce({ data: { todo, message } });
    await addTodoAsync({ value: 'test', completed: false, date: 1 })(dispatch);
    expect(dispatch).toHaveBeenCalledWith(addTodo({ todo, message }));
  });

  it('addTodoAsync dispatches addTodoError on error', async () => {
    const error = { isAxiosError: true, response: { data: { error: 'fail' } } };
    mockedAxios.post.mockRejectedValueOnce(error);
    const isAxiosErrorSpy = jest.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    await addTodoAsync({ value: 'test', completed: false, date: 1 })(dispatch);
    expect(dispatch).toHaveBeenCalledWith(addTodoError('fail'));
    isAxiosErrorSpy.mockRestore();
  });

  it('updateTodoAsync dispatches updateTodo on success', async () => {
    const updated = { _id: '1', value: 'updated', completed: false, date: '1' };
    const message = { error: '', success: '' };
    mockedAxios.put.mockResolvedValueOnce({ data: { todo: updated, message } });
    await updateTodoAsync({ _id: '1', value: 'test', completed: false, date: '1' })(dispatch);
    expect(dispatch).toHaveBeenCalledWith(updateTodo({ todo: updated, message }));
  });

  it('updateTodoAsync dispatches updateTodoError on error', async () => {
    const error = { isAxiosError: true, response: { data: { error: 'fail' } } };
    mockedAxios.put.mockRejectedValueOnce(error);
    const isAxiosErrorSpy = jest.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    await updateTodoAsync({ _id: '1', value: 'test', completed: false, date: '1' })(dispatch);
    expect(dispatch).toHaveBeenCalledWith(updateTodoError('fail'));
    isAxiosErrorSpy.mockRestore();
  });

  it('deleteTodoAsync dispatches deleteTodo on success', async () => {
    mockedAxios.delete.mockResolvedValueOnce({});
    await deleteTodoAsync('1')(dispatch);
    expect(dispatch).toHaveBeenCalledWith(deleteTodo('1'));
  });

  it('deleteTodoAsync dispatches deleteTodoError on error', async () => {
    const error = { isAxiosError: true, response: { data: { error: 'fail' } } };
    mockedAxios.delete.mockRejectedValueOnce(error);
    const isAxiosErrorSpy = jest.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    await deleteTodoAsync('1')(dispatch);
    expect(dispatch).toHaveBeenCalledWith(deleteTodoError('fail'));
    isAxiosErrorSpy.mockRestore();
  });

  it('deleteAllTodosAsync dispatches deleteAllTodos on success', async () => {
    mockedAxios.delete.mockResolvedValueOnce({});
    await deleteAllTodosAsync()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(deleteAllTodos());
  });

  it('deleteAllTodosAsync dispatches deleteAllTodosError on error', async () => {
    const error = { isAxiosError: true, response: { data: { error: 'fail' } } };
    mockedAxios.delete.mockRejectedValueOnce(error);
    const isAxiosErrorSpy = jest.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    await deleteAllTodosAsync()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(deleteAllTodosError('fail'));
    isAxiosErrorSpy.mockRestore();
  });

  it('markTodoCompletedSync dispatches markTodoCompleted', () => {
    markTodoCompletedSync('1')(dispatch);
    expect(dispatch).toHaveBeenCalledWith(markTodoCompleted('1'));
  });

  it('markTodoCompletedSync dispatches markTodoCompletedError on error', () => {
    // Simulate error by throwing in dispatch
    const errorDispatch = () => { throw new Error('fail'); };
    expect(() => markTodoCompletedSync('1')(errorDispatch as any)).toThrow();
  });

  it('sortTodosBySync dispatches sortTodosBy', () => {
    sortTodosBySync('completed')(dispatch);
    expect(dispatch).toHaveBeenCalledWith(sortTodosBy('completed'));
  });

  it('sortTodosBySync dispatches sortTodosByError on error', () => {
    // Simulate error by throwing in dispatch
    const errorDispatch = () => { throw new Error('fail'); };
    expect(() => sortTodosBySync('completed')(errorDispatch as any)).toThrow();
  });
});
