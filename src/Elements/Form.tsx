import { Form as Formes, Formik, Field } from "formik";

import data from "../data.json";

import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import { addPost } from "../features/postsSlice";
import { deleteReply } from "../features/isReplySlice";

const Form = () => {
  const isReply = useSelector((state: any) => state.isReply);

  const dispatch = useDispatch();

  const deleteReply = () => {};

  const onSavePostClicked = (value: { content: string }) => {
    if (!isReply) {
      if (value.content) {
        dispatch(
          addPost({
            id: nanoid(),
            content: value.content,
            createdAt: "now",
            score: 0,
            user: {
              image: {
                png: "./images/avatars/image-juliusomo.png",
                webp: "./images/avatars/image-juliusomo.webp",
              },
              username: "juliusomo",
            },
            replies: [],
          })
        );
      }
    }
  };

  return (
    <div className="rounded-xl bg-very-light-gray p-6 w-full flex gap-4">
      <picture>
        <source src={data.currentUser.image.webp} />
        <img
          src={data.currentUser.image.png}
          alt={data.currentUser.username}
          className="w-8 h-8 rounded-full"
        />
      </picture>
      <Formik
        initialValues={{ content: "" }}
        onSubmit={async (values) => {
          onSavePostClicked(values);
          values.content = "";
        }}
      >
        {({ isSubmitting }) => (
          <Formes className="flex w-full gap-4">
            <Field
              className="w-full h-[96px] flex items-start rounded-lg justify-start"
              as="textarea"
              name="content"
              placeholder="Add a comment..."
            />
            <button
              type="submit"
              className="max-w-[104px] w-full h-12 text-white bg-moderate-blue font-bold uppercase rounded-lg"
              disabled={isSubmitting}
            >
              Send
            </button>
          </Formes>
        )}
      </Formik>
    </div>
  );
};

export default Form;
