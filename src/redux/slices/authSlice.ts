import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';

const USER = 'USER';

type User = {
  user_id: number;
  user_email: string;
  user_username: string;
  user_is_active: number; // Changed from string to number
  user_profile_image: string;
  user_last_active_epoch: number;
  user_creation_epoch: number;
  user_is_new: number; // Changed from string to number
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
      // const response = await axios.post('/api/Tests/scripts/user-login.php', {
      //   payload,
      // });

      const { email, password } = payload;

      if (email === 'test@rapptrlabs.com' && password === 'Test123') {
        const response: User = {
          user_id: 16,
          user_email: 'test@rapptrlabs.com',
          user_username: 'testuser',
          user_is_active: 1,
          user_profile_image:
            'http://dev.rapptrlabs.com/Tests/images/taylor_avatar.png',
          user_last_active_epoch: 1544680026,
          user_creation_epoch: 1544713200,
          user_is_new: 1,
          user_token:
            '6dd4737a8b7ec61313ae5e900420d46815e1d13b2902be71b97a8fbf1f421a3e',
        };

        localStorage.setItem('USER', JSON.stringify(response));

        return response;
      } else {
        throw new Error('Wrong email and or password'); // Throwing an Error object
      }
    } catch (error) {
      throw new Error('Wrong email and or password'); // Throwing an Error object
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getUser: (state) => {
      const user = localStorage.getItem(USER) || null;

      if (user) {
        state.user = JSON.parse(user) as User;
      } else {
        state.user = null;
      }
    },
    logOutUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;

      localStorage.removeItem(USER);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem(USER, JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const { getUser, logOutUser } = authSlice.actions;

export default authSlice.reducer;
