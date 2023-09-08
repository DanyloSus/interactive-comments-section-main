import { useDispatch, useSelector } from "react-redux";
import dataMain from "../data.json";
import {
  addScoreReply,
  deleteReplyPost,
  decreaseScoreReply,
} from "../features/postsSlice";

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
  replies: object;
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

interface RepliesProps {
  data: RepliesObject;
  commData: CommentObject;
}

const Replies = ({ data, commData }: RepliesProps) => {
  const dataMain: PostsObject = useSelector((state: any) => state.posts);

  const dispatch = useDispatch();

  const useOnDelete = (cId: string | number, rId: string | number) => {
    console.log(cId, rId);
    dispatch(deleteReplyPost({ cId, rId }));
  };

  const useOnAddScore = (commId: string | number, replId: string | number) => {
    dispatch(addScoreReply({ commId, replId }));
  };

  const useOnDecreaseScore = (
    commId: string | number,
    replId: string | number
  ) => {
    dispatch(decreaseScoreReply({ commId, replId }));
  };

  return (
    <div className="flex p-6 bg-very-light-gray rounded-lg gap-6">
      <div className="w-10 h-[100px] bg-light-grayish-blue rounded-xl flex flex-col justify-around text-center overflow-hidden">
        <button
          className={`text-xl text-grayish-blue w-full h-full hover:bg-grayish-blue hover:text-dark-blue  transition-colors ${
            dataMain.currentUser.liked.includes(data.id.toString())
              ? "bg-grayish-blue text-dark-blue"
              : "hover:bg-grayish-blue hover:text-dark-blue text-grayish-blue"
          }`}
          onClick={() => useOnAddScore(commData.id, data.id)}
        >
          +
        </button>
        <h2 className="font-bold text-xl w-full h-full">{data.score}</h2>
        <button
          className={`text-xl text-grayish-blue hover:bg-grayish-blue hover:text-dark-blue w-full h-full transition-colors ${
            dataMain.currentUser.disliked.includes(data.id.toString())
              ? "bg-grayish-blue text-dark-blue"
              : "hover:bg-grayish-blue hover:text-dark-blue text-grayish-blue"
          }`}
          onClick={() => useOnDecreaseScore(commData.id, data.id)}
        >
          -
        </button>
      </div>
      <div className="flex flex-col w-full gap-3">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <picture>
              <source src={data.user.image.webp} />
              <img
                src={data.user.image.png}
                alt={data.user.username}
                className="w-8 h-8 rounded-full"
              />
            </picture>
            <h3 className="font-bold">{data.user.username}</h3>
            {data.user.username === dataMain.currentUser.username && (
              <div className="bg-moderate-blue text-white rounded-[1px] px-1 text-xs">
                you
              </div>
            )}
            <p>{data.createdAt}</p>
          </div>
          {data.user.username === dataMain.currentUser.username ? (
            <div className="flex gap-3">
              <p
                className="text-soft-red flex items-center gap-2 font-bold cursor-pointer"
                onClick={() => useOnDelete(commData.id, data.id)}
              >
                <img src="./icon-delete.svg" alt="icon delete" /> Delete
              </p>
              <p className="text-moderate-blue flex items-center gap-2 font-bold cursor-pointer">
                <img src="./icon-edit.svg" alt="icon edit" /> Edit
              </p>
            </div>
          ) : (
            <p className="text-moderate-blue flex items-center gap-2 font-bold cursor-pointer">
              <img src="./icon-reply.svg" alt="icon reply" /> Reply
            </p>
          )}
        </div>
        <p className="text-[16.5px] leading-5">{data.content}</p>
      </div>
    </div>
  );
};

export default Replies;
