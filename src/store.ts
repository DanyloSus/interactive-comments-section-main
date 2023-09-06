import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./features/postsSlice";
import isReplySlice from "./features/isReplySlice";

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    isReply: isReplySlice,
  },
});
