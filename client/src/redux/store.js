import { configureStore } from '@reduxjs/toolkit'
import CreateCommunityReducer from './Community/createCommunitySlice'

export default configureStore({
  reducer: {
    createCommunity: CreateCommunityReducer,
  },
})