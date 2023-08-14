import useSWR from "swr";
import fetcher from "@/libs/fetcher";

//custom hook lấy noti cho user theo id của user
const useNotifications = (userId?: string) => {
  const url = userId ? `/api/notifications/${userId}` : null;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return { data, error, isLoading, mutate };
};

export default useNotifications;
