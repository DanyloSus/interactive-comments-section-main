import Comment from "./Elements/Comment";
import Form from "./Elements/Form";
import Replies from "./Elements/Replies";

import data from "./data.json";

import { useSelector } from "react-redux";

data.comments;

interface RepliesObject {
  id: number;
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
  id: number;
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
  comments: {
    id: number;
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
  }[];
  currentUser: {
    image: { png: string; webp: string };
    username: string;
    liked: string[];
    disliked: string[];
  };
}

const App = () => {
  const posts = useSelector((state: any) => state.posts) as PostsObject;

  return (
    <main className="py-16 max-w-[732px] w-full flex flex-col mx-auto gap-5">
      {posts.comments.map((comment: CommentObject) => (
        <div className="flex flex-col gap-5">
          <Comment data={comment} key={comment.id} />
          {comment.replies.length > 0 && (
            <div className="flex items-stretch">
              <div
                className=" bg-light-grayish-blue w-[1px] mx-auto"
                id="line"
              ></div>
              <div className="max-w-[642px] w-full flex flex-col gap-5">
                {comment.replies.map((replie) => (
                  <Replies key={replie.id} commData={comment} data={replie} />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
      <Form />
    </main>
  );
};

export default App;
