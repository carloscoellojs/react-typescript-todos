import todoReducer, {
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
} from './todoReducer';

describe('todoReducer', () => {
  const initialState = {
    todos: [],
    message: { error: 'false', success: '' }
  };

  const todo = { _id: '1', value: 'Test', completed: false, date: '2025-09-23' };
  const todo2 = { _id: '2', value: 'Test2', completed: true, date: '2025-09-24' };
  const message = { error: '', success: 'ok' };

  it('should return the initial state', () => {
    expect(todoReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('should handle addTodo', () => {
    const state = todoReducer(initialState, addTodo({ todo, message }));
    expect(state.todos).toContainEqual(todo);
    expect(state.message.success).toBe('ok');
    expect(state.message.error).toBe('');
  });

  it('should handle addTodoError', () => {
    const state = todoReducer(initialState, addTodoError('fail'));
    expect(state.message.error).toBe('fail');
    expect(state.message.success).toBe('');
  });

  it('should handle updateTodo', () => {
    const prevState = { ...initialState, todos: [todo] };
    const updated = { ...todo, value: 'Updated' };
    const state = todoReducer(prevState, updateTodo({ todo: updated, message }));
    expect(state.todos[0].value).toBe('Updated');
    expect(state.message.success).toBe('ok');
    expect(state.message.error).toBe('');
  });

  it('should handle updateTodoError', () => {
    const state = todoReducer(initialState, updateTodoError('fail'));
    expect(state.message.error).toBe('fail');
    expect(state.message.success).toBe('');
  });

  it('should handle deleteTodo', () => {
    const prevState = { ...initialState, todos: [todo, todo2] };
    const state = todoReducer(prevState, deleteTodo('1'));
    expect(state.todos).toEqual([todo2]);
    expect(state.message.success).toBe('Todo deleted successfully');
    expect(state.message.error).toBe('');
  });

  it('should handle deleteTodoError', () => {
    const state = todoReducer(initialState, deleteTodoError('fail'));
    expect(state.message.error).toBe('fail');
    expect(state.message.success).toBe('');
  });

  it('should handle deleteAllTodos', () => {
    const prevState = { ...initialState, todos: [todo, todo2] };
    const state = todoReducer(prevState, deleteAllTodos());
    expect(state.todos).toEqual([]);
    expect(state.message.success).toBe('All todos deleted successfully');
    expect(state.message.error).toBe('');
  });

  it('should handle deleteAllTodosError', () => {
    const state = todoReducer(initialState, deleteAllTodosError('fail'));
    expect(state.message.error).toBe('fail');
    expect(state.message.success).toBe('');
  });

  it('should handle markTodoCompleted', () => {
    const prevState = { ...initialState, todos: [todo] };
    const state = todoReducer(prevState, markTodoCompleted('1'));
    expect(state.todos[0].completed).toBe(true);
    expect(state.message.success).toBe('Todo marked as completed');
    expect(state.message.error).toBe('');
  });

  it('should handle markTodoCompletedError', () => {
    const state = todoReducer(initialState, markTodoCompletedError('fail'));
    expect(state.message.error).toBe('fail');
    expect(state.message.success).toBe('');
  });

  it('should handle sortTodosBy completed', () => {
    const prevState = { ...initialState, todos: [todo, todo2] };
    const state = todoReducer(prevState, sortTodosBy('completed'));
    expect(state.todos[0].completed).toBe(true);
    expect(state.todos[1].completed).toBe(false);
  });

  it('should handle sortTodosBy active', () => {
    const prevState = { ...initialState, todos: [todo2, todo] };
    const state = todoReducer(prevState, sortTodosBy('active'));
    expect(state.todos[0].completed).toBe(false);
    expect(state.todos[1].completed).toBe(true);
  });

  it('should handle sortTodosBy default', () => {
    const prevState = { ...initialState, todos: [todo2, todo] };
    const state = todoReducer(prevState, sortTodosBy('default'));
    expect(state.todos[0].date < state.todos[1].date).toBe(true);
  });

  it('should handle sortTodosByError', () => {
    const state = todoReducer(initialState, sortTodosByError('fail'));
    expect(state.message.error).toBe('fail');
    expect(state.message.success).toBe('');
  });
});
