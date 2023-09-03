import Comment from "./Elements/Comment";
import Form from "./Elements/Form";
import Replies from "./Elements/Replies";

import data from "./data.json";

const App = () => {
  return (
    <main className="py-16 max-w-[732px] w-full flex flex-col mx-auto gap-5">
      {data.comments.map((comment) => (
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
                  <Replies key={replie.id} data={replie} />
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
