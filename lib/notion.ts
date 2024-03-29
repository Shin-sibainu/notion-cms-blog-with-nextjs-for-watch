import { Client } from "@notionhq/client";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
  PartialPageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { NotionToMarkdown } from "notion-to-md";
import { NUMBER_OF_POSTS_PER_PAGE } from "../src/server_constants";
import { NotionPage, PostMetaData } from "./interfaces";

const notion: Client = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m: NotionToMarkdown = new NotionToMarkdown({ notionClient: notion });

export const getAllPosts = async () => {
  //https://ymtdzzz.dev/post/use-notion-as-cms/
  const posts: QueryDatabaseResponse = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
    page_size: 100,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });

  const allPosts: (PageObjectResponse | PartialPageObjectResponse)[] =
    posts.results;

  return allPosts.map(
    (post: PageObjectResponse | PartialPageObjectResponse) => {
      return getPageMetaData(post);
    }
  );
};

const getPageMetaData = (
  post: PageObjectResponse | PartialPageObjectResponse
) => {
  const getTags = (tags: { name: string }[]): string[] => {
    const allTags = tags.map((tag) => {
      return tag.name;
    });

    return allTags;
  };

  return {
    id: post.id,
    title: post.properties.Name.title[0].plain_text,
    tags: getTags(post.properties.Tags.multi_select),
    description: post.properties.Description.rich_text[0].plain_text,
    date: getToday(post.properties.Date.last_edited_time),
    slug: post.properties.Slug.rich_text[0].plain_text,
  };
};

//更新日取得のための関数
const getToday = (datestring: string) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let date = new Date();

  if (datestring) {
    date = new Date(datestring);
  }

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  let today = `${month} ${day}, ${year}`;

  return today; //今日の日付を返す
};

/* singlePost */
export const getSinglePost = async (slug: string) => {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
    filter: {
      property: "Slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });

  const page = response.results[0];
  // console.log(page);
  const metadata = getPageMetaData(page);
  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdBlocks);

  return {
    metadata,
    markdown: mdString,
  };
};
/* home用記事取得(4つ) */
export const getPosts = async (pageSize: number = 4) => {
  const allPosts = await getAllPosts();
  return allPosts.slice(0, pageSize);
};
//ページ番号に応じた記事取得
export const getPostsByPage = async (page: number) => {
  if (page < 1) {
    return [];
  }

  const allPosts = await getAllPosts();

  //そのページの先頭記事配列番号の取得
  const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;

  return allPosts.slice(startIndex, endIndex);
};
//ページネーション箇所のページ数取得
export const getNumberOfPages = async () => {
  const allPosts: PostMetaData[] = await getAllPosts();
  return (
    Math.floor(allPosts.length / NUMBER_OF_POSTS_PER_PAGE) +
    (allPosts.length % NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0)
  );
};
//タグに応じた記事取得
export const getPostsByTag = async (tagName: string, pageSize = 4) => {
  if (!tagName) return [];

  const allPosts = await getAllPosts();
  // console.log(allPosts.map((post) => post.tags.map((tag) => tag)));
  // console.log(allPosts.map((post) => post.tags[0]).filter((tag) => tag)[0]);
  //全ての記事から同じタグだけを抽出する
  return allPosts
    .filter((post) => post.tags.find((tag) => tag === tagName))
    .slice(0, pageSize);
};

export const getAllTags = async () => {
  const allPosts = await getAllPosts();

  const allTagsDuplicationLists = allPosts.flatMap((post) => post.tags);
  const set = new Set(allTagsDuplicationLists);
  const allTagsList = Array.from(set);

  return allTagsList;
};

export const getPostsByTagAndPage = async (tagName: string, page: number) => {
  if (page < 1) {
    return [];
  }

  const allPosts = await getAllPosts();
  const posts = allPosts.filter((post) =>
    post.tags.find((tag) => tag === tagName)
  );

  const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;

  return posts.slice(startIndex, endIndex);
};

//タグ記事リスト専用ページ番号取得
export const getNumberOfPagesByTag = async (tagName: string) => {
  const allPosts = await getAllPosts();
  const posts = allPosts.filter((post) =>
    post.tags.find((tag: string) => tag === tagName)
  );
  // console.log(tagName); //blog, programming
  // console.log(posts.length); // blog...7, programming...6
  return Math.floor(posts.length / NUMBER_OF_POSTS_PER_PAGE) +
    (posts.length % NUMBER_OF_POSTS_PER_PAGE) >
    0
    ? 1
    : 0;
};
