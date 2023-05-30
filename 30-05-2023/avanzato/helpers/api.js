const API_ENDPOINT = "https://dummyjson.com";

export const fetchUserMappedPosts = () => {
  const postsPromise = fetch(`${API_ENDPOINT}/posts`).then((response) =>
    response.json()
  );

  const usersPromise = fetch(`${API_ENDPOINT}/users`).then((response) =>
    response.json()
  );

  return Promise.allSettled([postsPromise, usersPromise]).then(
    ([postsResult, usersResult]) => {
      if (
        postsResult.status === "rejected" ||
        usersResult.status === "rejected"
      )
        throw new Error("Failed to fetch posts and/or users");

      const posts = postsResult.value.posts;
      const users = usersResult.value.users;

      const updatedPosts = posts.map((post) => {
        const user = users.find((user) => post.userId === user.id);
        return {
          ...post,
          user: user || null,
        };
      });

      return updatedPosts;
    }
  );
};
