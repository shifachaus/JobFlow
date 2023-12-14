import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { logoutUser } from "./userSlice";
import { clearAllJobsState } from "../allJobs/allJobSlice";
import { clearValues } from "../job/jobSlice";

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const res = await customFetch.post(url, user);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.msg);
  }
};

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.patch(url, user);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    // logout user
    thunkAPI.dispatch(logoutUser(message));
    // clear jobs value
    thunkAPI.dispatch(clearAllJobsState());
    // clear job input values
    thunkAPI.dispatch(clearValues());
    return Promise.resolve();
  } catch (error) {
    // console.log(error);
    return Promise.reject();
  }
};
