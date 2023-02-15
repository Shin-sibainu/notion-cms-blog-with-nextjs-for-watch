import Head from "next/head";
import Link from "next/link";
import React from "react";
import SinglePost from "../../../components/Blog/SinglePost";
import Pagination from "../../../components/Pagination/Pagination";
import Tag from "../../../components/Tag/Tag";
import {
  getAllPosts,
  getNumberOfPages,
  getPostsByPage,
} from "../../../lib/notion";

export const getStaticPaths = async () => {
  const numberOfPage = await getNumberOfPages();

  let params = [];
  for (let i = 1; i <= numberOfPage; i++) {
    params.push({ params: { page: i.toString() } });
  }

  // console.log(params);

  return {
    // paths: [`/posts/page/1`], // /posts/page/1
    paths: params,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  //何ページ目の記事を持ってくるのか
  const currentPage = context.params?.page;
  const data = await getPostsByPage(parseInt(currentPage.toString(), 10)); //page ... 今見てるページ番号
  const numberOfPages = await getNumberOfPages();

  return {
    props: {
      posts: data,
      currentPage: currentPage,
      numberOfPages: numberOfPages,
    },
    revalidate: 60, //60s毎にISR発動
  };
};

const BlogPageList = ({ posts, currentPage, numberOfPages }) => {
  return (
    <div className="container h-full w-full mx-auto font-Zen">
      <Head>
        <title>Notion-Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="contianer w-full mt-16">
        <h1 className="text-5xl text-dark-100 mb-16 text-center font-medium">
          Notion Blog🚀
        </h1>
        {/* page番号に応じて内容を変える */}
        <section className="sm:grid grid-cols-2 gap-3 w-5/6 mx-auto">
          {posts.map((post, index) => (
            <div className="block" key={index}>
              <SinglePost
                slug={post.slug}
                title={post.title}
                date={post.date}
                description={post.description}
                tag={post.tags}
                isPageList={true}
              />
            </div>
          ))}
        </section>
        <Pagination
          currentPage={parseInt(currentPage, 10)}
          numberOfPage={numberOfPages}
          tag=""
        />
      </main>
    </div>
  );
};

export default BlogPageList;
