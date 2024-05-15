import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const JWT_TOKEN = 'JWT-TOKEN';

type User = {
  user_id: number;
  user_email: string;
  user_username: string;
  user_is_active: string;
  user_profile_image: string;
  user_last_active_epoch: number;
  user_creation_epoch: number;
  user_is_new: string;
  user_token: string;
};
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

interface LoginCredentials {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (payload: LoginCredentials) => {
    try {
      const response = await axios.post('/api/Tests/scripts/user-login.php', {
        payload,
      });
      return response.data;
    } catch (error) {
      throw 'Wrong email and or password';
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOutUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;

      localStorage.removeItem(JWT_TOKEN);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem(JWT_TOKEN, action.payload.user.user_token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default authSlice.reducer;
