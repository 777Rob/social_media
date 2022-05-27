import { configureStore } from "@reduxjs/toolkit";
import CreateCommunityReducer from "./Community/createCommunitySlice";
import UserDataReducer from "./User";

export default configureStore({
	reducer: {
		createCommunity: CreateCommunityReducer,
		user: UserDataReducer,
	},
});
