import axios from 'axios';
import {
  loginUser,
  registerUser,
  logoutUser,
  revertMessageDetailsStateAsync
} from './authAuctions';
import {
  login,
  loginError,
  createUser,
  createUserError,
  logout,
  revertMessageDetailsState
} from '../reducers/authReducer';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('authAuctions thunks', () => {
  let dispatch: jest.Mock;
  beforeEach(() => {
    dispatch = jest.fn();
    jest.clearAllMocks();
  });

  it('loginUser dispatches login on success', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { user: { email: 'test@email.com' } } });
    const user = { username: 'test', password: 'pass' };
    await loginUser(user)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(login({ username: 'test', email: 'test@email.com' }));
  });

  it('loginUser dispatches loginError on error', async () => {
    const error = { isAxiosError: true, response: { data: { error: 'fail' } } };
    mockedAxios.post.mockRejectedValueOnce(error);
    const isAxiosErrorSpy = jest.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    const user = { username: 'test', password: 'pass' };
    await loginUser(user)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(loginError('fail'));
    isAxiosErrorSpy.mockRestore();
  });

  it('registerUser dispatches createUser on success', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { message: 'created' } });
    const user = { username: 'test', email: 'test@email.com', password: 'pass' };
    await registerUser(user)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(createUser('created'));
  });

  it('registerUser dispatches createUserError on error', async () => {
    const error = { isAxiosError: true, response: { data: { error: 'fail' } } };
    mockedAxios.post.mockRejectedValueOnce(error);
    const isAxiosErrorSpy = jest.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    const user = { username: 'test', email: 'test@email.com', password: 'pass' };
    await registerUser(user)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(createUserError('fail'));
    isAxiosErrorSpy.mockRestore();
  });

  it('revertMessageDetailsStateAsync dispatches revertMessageDetailsState after delay', async () => {
    jest.useFakeTimers();
    const promise = revertMessageDetailsStateAsync()(dispatch);
    jest.advanceTimersByTime(2000);
    await promise;
    expect(dispatch).toHaveBeenCalledWith(revertMessageDetailsState());
    jest.useRealTimers();
  });
});
