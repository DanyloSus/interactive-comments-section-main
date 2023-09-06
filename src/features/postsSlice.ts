import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import data from "../data.json";

interface RepliesObject {
  id: number | string;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
}

interface CommentObject {
  id: number | string;
  content: string;
  createdAt: string;
  score: number;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replies: RepliesObject[];
}

interface PostsObject {
  comments: CommentObject[];
  currentUser: {
    image: { png: string; webp: string };
    username: string;
    liked: string[];
    disliked: string[];
  };
}

const initialState = data as PostsObject;

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addScore(state, action) {
      if (state.currentUser.liked.includes(action.payload.toString())) {
        const commentId = state.comments.findIndex(
          (comment) => comment.id === action.payload
        );

        state.currentUser.liked.splice(
          state.currentUser.liked.indexOf(action.payload.toString()),
          1
        );
        state.comments[commentId].score -= 1;
      } else if (
        state.currentUser.disliked.includes(action.payload.toString())
      ) {
        const commentId = state.comments.findIndex(
          (comment) => comment.id === action.payload
        );

        state.currentUser.liked.push(action.payload.toString());
        state.currentUser.disliked.splice(
          state.currentUser.disliked.indexOf(action.payload.toString()),
          1
        );
        state.comments[commentId].score += 2;
      } else {
        const commentId = state.comments.findIndex(
          (comment) => comment.id === action.payload
        );

        state.currentUser.liked.push(action.payload.toString());
        state.currentUser.disliked.splice(
          state.currentUser.liked.indexOf(action.payload.toString()),
          1
        );
        state.comments[commentId].score += 1;
      }
    },
    decreaseScore(state, action) {
      if (state.currentUser.disliked.includes(action.payload.toString())) {
        const commentId = state.comments.findIndex(
          (comment) => comment.id === action.payload
        );

        state.currentUser.disliked.splice(
          state.currentUser.disliked.indexOf(action.payload.toString()),
          1
        );
        state.comments[commentId].score += 1;
      } else if (state.currentUser.liked.includes(action.payload.toString())) {
        console.log("splice");
        const commentId = state.comments.findIndex(
          (comment) => comment.id === action.payload
        );

        state.currentUser.disliked.push(action.payload.toString());
        state.currentUser.liked.splice(
          state.currentUser.liked.indexOf(action.payload.toString()),
          1
        );
        state.comments[commentId].score -= 2;
      } else {
        const commentId = state.comments.findIndex(
          (comment) => comment.id === action.payload
        );

        state.currentUser.disliked.push(action.payload.toString());
        state.comments[commentId].score -= 1;
      }
    },
    addScoreReply(
      state,
      action: PayloadAction<{
        commId: string | number;
        replId: string | number;
      }>
    ) {
      const commentId = state.comments.findIndex(
        (comm) => comm.id === action.payload.commId
      );
      const replyId = state.comments[commentId].replies.findIndex(
        (reply) => reply.id === action.payload.replId
      );

      if (state.currentUser.liked.includes(action.payload.replId.toString())) {
        state.currentUser.liked.splice(
          state.currentUser.liked.indexOf(action.payload.toString()),
          1
        );
        state.comments[commentId].replies[replyId].score -= 1;
      } else if (
        state.currentUser.disliked.includes(action.payload.replId.toString())
      ) {
        state.currentUser.liked.push(action.payload.toString());
        state.currentUser.disliked.splice(
          state.currentUser.disliked.indexOf(action.payload.toString()),
          1
        );
        state.comments[commentId].replies[replyId].score += 2;
      } else {
        state.currentUser.liked.push(action.payload.replId.toString());
        state.currentUser.disliked.splice(
          state.currentUser.liked.indexOf(action.payload.toString()),
          1
        );
        state.comments[commentId].replies[replyId].score += 1;
      }
    },
    decreaseScoreReply(
      state,
      action: PayloadAction<{
        commId: string | number;
        replId: string | number;
      }>
    ) {
      const commentId = state.comments.findIndex(
        (comm) => comm.id === action.payload.commId
      );
      const replyId = state.comments[commentId].replies.findIndex(
        (reply) => reply.id === action.payload.replId
      );

      if (
        state.currentUser.disliked.includes(action.payload.replId.toString())
      ) {
        state.currentUser.disliked.splice(
          state.currentUser.disliked.indexOf(action.payload.toString()),
          1
        );
        state.comments[commentId].replies[replyId].score += 1;
      } else if (state.currentUser.liked.includes(action.payload.toString())) {
        state.currentUser.disliked.push(action.payload.replId.toString());
        state.currentUser.liked.splice(
          state.currentUser.liked.indexOf(action.payload.replId.toString()),
          1
        );
        state.comments[commentId].replies[replyId].score -= 2;
      } else {
        state.currentUser.disliked.push(action.payload.replId.toString());
        state.comments[commentId].replies[replyId].score -= 1;
      }
    },
    addPost(state, action) {
      state.comments.push(action.payload);
    },
    addReply(
      state,
      action: PayloadAction<{
        commId: string | number;
        content: string;
        replyingTo: string;
      }>
    ) {
      const item = state.comments.findIndex(
        (comment) => comment.id === action.payload.commId
      );
      const content = action.payload.content;
      const replyingTo = action.payload.replyingTo;
      state.comments[item].replies.push({
        id: nanoid(),
        content: content,
        createdAt: "now",
        score: 0,
        replyingTo,
        user: {
          image: {
            png: "./images/avatars/image-juliusomo.png",
            webp: "./images/avatars/image-juliusomo.webp",
          },
          username: "juliusomo",
        },
      });
    },
    deletePost: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
    },
    deleteReplyPost: (
      state: PostsObject,
      action: PayloadAction<{ cId: string | number; rId: string | number }>
    ) => {
      const item = state.comments.find(
        (comment) => comment.id === action.payload.cId
      );
      if (item) {
        const replie = item.replies.findIndex(
          (replie) => replie.id === action.payload.rId
        );
        item.replies.splice(replie, 1);
      }
    },
  },
});

export const {
  addPost,
  deletePost,
  deleteReplyPost,
  addReply,
  addScore,
  addScoreReply,
  decreaseScore,
  decreaseScoreReply,
} = postsSlice.actions;

export default postsSlice.reducer;
