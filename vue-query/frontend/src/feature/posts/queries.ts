import { useQuery, useQueryClient } from "@tanstack/vue-query";
import axios from "axios";
import type { MaybeRef, Ref } from "vue";

type Post = { id: number; title: string; author: string };
type Posts = ReadonlyArray<Post>;

const fetchPosts = async (title: string) => {
  const response = await axios.get<Posts>(`/api/posts`, {
    params: { title_like: title },
  });
  return response.data;
};

export const usePostsQuery = (
  title: Ref<string>,
  select: MaybeRef<((data: Posts) => Posts) | undefined>
) => {
  const queryClient = useQueryClient();
  console.log(queryClient.getQueryData(["todo", title]));
  return useQuery({
    queryKey: ["posts", title],
    queryFn: () => fetchPosts(title.value),
    keepPreviousData: true,
    // initialData: () => {
    //   console.log(queryClient.getQueryData(["todo", "x"]));

    //   return [{ id: 10, title: "initialData", author: "x" }];
    // },
    select,
    enabled: false,
  });
};

const usePostsCount = (title: Ref<string>) =>
  usePostsQuery(title, (data) => data.length);
