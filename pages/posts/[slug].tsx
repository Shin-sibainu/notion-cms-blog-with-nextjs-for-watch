import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { getAllPosts, getSinglePost } from "../../lib/notion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Link from "next/link";

export const getStaticPaths = async () => {
  const posts = await getAllPosts();
  const paths = posts.map(({ slug }) => ({ params: { slug } }));
  console.log(paths);

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const post = await getSinglePost(params.slug);

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

const CodeBlock = ({ language, codestring }) => {
  return (
    <SyntaxHighlighter language={language} style={vscDarkPlus} PreTag="div">
      {codestring}
    </SyntaxHighlighter>
  );
};

const Post = ({ post }) => {
  return (
    <section className="container lg:px-2 px-5 h-screen lg:w-2/5 mx-auto font-Zen mt-20">
      <h2 className="text-dark-100 w-full text-2xl font-medium">
        {post.metadata.title}
      </h2>
      <div className="border-b-2 w-1/3 mt-1 border-sky-900"></div>
      <span className="text-dark-300">Posted date at {post.metadata.date}</span>
      <br />
      <p className="px-2 font-medium pb-1 mt-2 text-gray-400 rounded-xl bg-sky-900 inline-block">
        {post.metadata.tags}
      </p>
      <ReactMarkdown
        className="mt-10 text-dark-100 font-medium"
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <CodeBlock
                codestring={String(children).replace(/\n$/, "")}
                language={match[1]}
              />
            ) : (
              <code>{children}</code>
            );
          },
        }}
      >
        {post.markdown}
      </ReactMarkdown>

      <Link href="/">
        <span className="pb-20 block text-sky-900 mt-3">
          &#x2190;Homeに戻る
        </span>
      </Link>
    </section>
  );
};

export default Post;
