import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, { payload }) => {
			state.user = payload;
		},
		reset: () => initialState,
	},
});

export const { login, reset } = userSlice.actions;

export default userSlice.reducer;
