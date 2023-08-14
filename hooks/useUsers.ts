import useSWR from "swr";
import fetcher from "@/libs/fetcher";

//hook để gọi api và lấy data của tất cả users về
const useUsers = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/users", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUsers;
