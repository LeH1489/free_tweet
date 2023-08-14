import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";
import { toast } from "react-hot-toast";
import axios from "axios";

const useFollow = (userId: string) => {
  //hook lấy data của current user
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();

  //hook lấy user bất kỳ theo id
  const { mutate: mutateFetchedUser } = useUser(userId);

  const loginModal = useLoginModal();

  //kiểm tra xem có follow hay chưa
  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [currentUser, userId]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen(); //nếu user chưa log in thì => login
    }

    try {
      let request;

      //nếu user đã follow rồi thì unfollow
      if (isFollowing) {
        request = () => axios.delete("/api/follow", { params: { userId } });
      } else {
        request = () => axios.post("/api/follow", { userId });
      }

      await request();
      mutateCurrentUser();
      mutateFetchedUser();
      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  }, [
    currentUser,
    isFollowing,
    userId,
    mutateCurrentUser,
    mutateFetchedUser,
    loginModal,
  ]);

  return { isFollowing, toggleFollow };
};

export default useFollow;
