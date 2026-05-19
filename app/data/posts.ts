import { postsPart1 } from "./posts-rich-1";
import { postsPart2 } from "./posts-rich-2";
import { postsPart3 } from "./posts-rich-3";

export interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  summary: string;
  content: string;
  image: string;
  category: string;
  readTime: string;
}

export const posts: Post[] = [...postsPart1, ...postsPart2, ...postsPart3];
