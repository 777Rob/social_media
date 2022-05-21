import { configureStore } from '@reduxjs/toolkit'
import CreateCommunityReducer from './Community/createCommunitySlice'
import AppUtilsReducer from './Community/appUtilsSlice'

export default configureStore({
  reducer: {
    createCommunity: CreateCommunityReducer,
    appUtils:AppUtilsReducer
  },
})