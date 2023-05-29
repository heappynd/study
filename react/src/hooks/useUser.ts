import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) =>
  axios.get(`https://jsonplaceholder.typicode.com${url}`);

function useUser(id: number) {
  const { data, error, isLoading } = useSWR(`/users/${id}`, fetcher);

  return {
    user: data?.data,
    isLoading,
    isError: error,
  };
}

export default useUser;
