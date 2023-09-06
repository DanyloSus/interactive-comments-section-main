import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = "";

const isReplySlice = createSlice({
  name: "isReply",
  initialState,
  reducers: {
    setIsReply(state, action: PayloadAction<{ replyTo: string }>) {
      state = action.payload.replyTo;
    },
    deleteReply(state) {
      state = "";
    },
  },
});

export const { setIsReply, deleteReply } = isReplySlice.actions;

export default isReplySlice.reducer;
