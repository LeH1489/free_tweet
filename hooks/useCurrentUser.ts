import useSWR from "swr";
import fetcher from "@/libs/fetcher";

//hook để gọi api và lấy data của current user về
const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
