import { createSlice } from '@reduxjs/toolkit';

// Load user from LocalStorage
const loadUserFromStorage = () => {
  try {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error loading user from LocalStorage:", error);
    return null;
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState: loadUserFromStorage(), 
  reducers: {
    addUser: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload)); // Save to LocalStorage
      return action.payload;
    },
    removeUser: () => {
      localStorage.removeItem('user'); // Clear LocalStorage
      return null;
    }
  }
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;



