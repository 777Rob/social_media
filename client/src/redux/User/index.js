import { createSlice } from "@reduxjs/toolkit";
const setAuthenticationToken = token => {
	localStorage.setItem("auth_token", token);
	localStorage.setItem("refresh_token", token);
};

export const userDataSlice = createSlice({
	name: "userDataSlice",
	initialState: {
		defaultLensProfileAddress: "",
		moralisUser: null,
		loaded: false,
		signedInWithLens:
			localStorage.getItem("auth_token") === null ? false : true,
		xAuthToken: localStorage.getItem("auth_token"),
		participatesInRewards: false,
	},
	reducers: {
		LOAD_USER_DATA: (state, action) => {
			state.moralisUser = action.payload;
			state.loaded = true;
			console.log(state);
		},
		UPDATE_VARIABLE: (state, action) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			let { key, value } = action.payload;
			state[key] = value;
		},
		UPDATE_VARIABLES: (state, action) => {
			let { keys, values } = action.payload;
			for (let i = 0; i < keys.length; i++) {
				state[keys[i]] = values[i];
			}
		},
		UPDATE_DEFAULT_LENS_PROFILE_ADDRESS: (state, action) => {
			state.user.defaultLensProfileAddress = action.payload;
		},
		LENS_SIGN_IN: (state, action) => {
			state.signedInWithLens = true;
			state.xAuthToken = action.payload;
			setAuthenticationToken(action.payload);
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	UPDATE_VARIABLES,
	UPDATE_VARIABLE,
	UPDATE_DEFAULT_LENS_PROFILE_ADDRESS,
	LENS_SIGN_IN,
	LOAD_USER_DATA,
} = userDataSlice.actions;

export default userDataSlice.reducer;
