import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePostStore = create(
  persist(
    (set, get) => ({
      posts: [],

      addPost: (title, content, userId) => {
        const newPost = {
          id: Date.now().toString(),
          userId,
          title,
          content,
          createdAt: new Date().toISOString(),
        };
        set({ posts: [newPost, ...get().posts] });
      },

      deletePost: (id) => {
        set({ posts: get().posts.filter((p) => p.id !== id) });
      },

      getPostById: (id) => {
        return get().posts.find((p) => p.id === id);
      },

      getUserPosts: (userId) => {
        return get().posts.filter((p) => p.userId === userId);
      },
    }),
    {
      name: "post-storage",
    }
  )
);