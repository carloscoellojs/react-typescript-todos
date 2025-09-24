import authReducer, {
  login,
  logout,
  createUser,
  loginError,
  createUserError,
  logOutError,
  revertMessageDetailsState
} from './authReducer';

describe('authReducer', () => {
  const initialState = {
    isAuthenticated: false,
    authenticatedUserDetails: { username: '', email: '' },
    message: { error: '', success: '' }
  };

  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('should handle login', () => {
    const user = { username: 'test', email: 'test@email.com' };
    const state = authReducer(initialState, login(user));
    expect(state.isAuthenticated).toBe(true);
    expect(state.authenticatedUserDetails).toEqual(user);
    expect(state.message.success).toBe('Login successful');
    expect(state.message.error).toBe('');
  });

  it('should handle loginError', () => {
    const state = authReducer(initialState, loginError('fail'));
    expect(state.message.error).toBe('fail');
    expect(state.message.success).toBe('');
  });

  it('should handle logout', () => {
    const loggedInState = {
      ...initialState,
      isAuthenticated: true,
      authenticatedUserDetails: { username: 'test', email: 'test@email.com' },
      message: { error: '', success: 'Login successful' }
    };
    const state = authReducer(loggedInState, logout());
    expect(state.isAuthenticated).toBe(false);
    expect(state.authenticatedUserDetails).toEqual({ username: '', email: '' });
    expect(state.message.success).toBe('');
    expect(state.message.error).toBe('');
  });

  it('should handle logOutError', () => {
    const state = authReducer(initialState, logOutError('logout fail'));
    expect(state.message.error).toBe('logout fail');
    expect(state.message.success).toBe('');
  });

  it('should handle createUser', () => {
    const state = authReducer(initialState, createUser('created'));
    expect(state.message.success).toBe('created');
  });

  it('should handle createUserError', () => {
    const state = authReducer(initialState, createUserError('create fail'));
    expect(state.message.error).toBe('create fail');
    expect(state.message.success).toBe('');
  });

  it('should handle revertMessageDetailsState', () => {
    const stateWithMessages = {
      ...initialState,
      message: { error: 'err', success: 'ok' }
    };
    const state = authReducer(stateWithMessages, revertMessageDetailsState());
    expect(state.message.error).toBe('');
    expect(state.message.success).toBe('');
  });
});
