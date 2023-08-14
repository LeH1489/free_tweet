import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Button from "./Button";
import Avatar from "./Avatar";
import usePost from "@/hooks/usePost";

interface FomrProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FomrProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  //lấy user hien tai
  const { data: currentUser } = useCurrentUser();

  const { mutate: mutatePosts } = usePosts();

  //mutate 1 post theo id
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      //check xem đang post 1 bài mới hay là đang comment 1 post nào đó
      const url = isComment ? `/api/comments?postId=${postId}` : "/api/posts";

      await axios.post(url, { body });

      toast.success("Tweet Created");

      setBody("");
      mutatePosts(); //tạo posts xong thì fetch data lại
      mutatePost();
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts, isComment, postId, mutatePost]);

  return (
    <div className="border-b-[0.1px] border-gray-300 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-rows gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              className="disabled: opacity-80 peer resize-none 
              mt-3 w-full bg-white ring-0 outline-none text-[20px] placeholder-neutral-500 text-black"
              placeholder={placeholder}
            ></textarea>
            <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />
            <div className="mt-4 flex flex-row justify-end">
              <Button
                onClick={onSubmit}
                disabled={isLoading || !body} //nếu ko viết gì thì ko cho đăng
                label="Tweet"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-black text-2xl  text-center mb-4 font-bold">
            Welcome to Free Tweet
          </h1>
          <div className="flex flex-rows items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
