import useSWR from "swr";
import fetcher from "@/libs/fetcher";

//hook để gọi api và lấy data của tất cả Posts về
const usePosts = (userId?: string) => {
  const url = userId ? `/api/posts?userId=${userId}` : "/api/posts";

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePosts;
