import useSWR from "swr";
import fetcher from "@/libs/fetcher";

//hook để gọi api và lấy data của 1 users bất kỳ về
const useUser = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/users/${userId}` : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;
