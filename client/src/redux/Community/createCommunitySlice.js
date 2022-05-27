import { createSlice } from "@reduxjs/toolkit";

export const createCommunitySlice = createSlice({
	name: "CreateCommunity",
	initialState: {
		membershipType: null,
		communityDetails: {
			name: "",
			ticker: "",
			description: "",
			beneficiary: "",
			image: "",
			owner: "",
			subscriptionPeriod: "",
			subscriptionFee: "",
			memberLimit: 4200000000000,
			price: 0,
		},
		minted: false,
	},
	reducers: {
		SET_MEMBERSHIP_TYPE: (state, action) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			console.log(action.payload);
			state.membershipType = action.payload;
		},
		SET_COMMUNITY_DETAILS: (state, action) => {
			state.communityDetails = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { SET_MEMBERSHIP_TYPE, SET_COMMUNITY_DETAILS } =
	createCommunitySlice.actions;

export default createCommunitySlice.reducer;
