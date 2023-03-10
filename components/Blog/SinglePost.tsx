import Link from "next/link";
import React from "react";

type Props = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tag: string;
  isPageList: boolean;
};

const SinglePost = (props: Props) => {
  const { slug, title, date, description, tag, isPageList } = props;
  // console.log({ slug, title, date, description });

  return (
    <Link href={`/posts/${slug}`}>
      {isPageList ? (
        <section className="mb-8 mx-auto bg-sky-900 rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300">
          <div className="lg:flex items-center">
            <h2 className="text-gray-100 font-medium text-2xl mb-2 mr-2">
              {title}
            </h2>
            <span className="text-gray-400 mr-2">{date}</span>
            <span className="cursor-pointer px-2 font-medium pb-1 text-sm text-white rounded-xl bg-gray-500 inline-block">
              {tag}
            </span>
          </div>
          <p className="text-gray-100 ">{description}</p>
        </section>
      ) : (
        <section className="mb-8 lg:w-1/2 mx-auto bg-sky-900 rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-3">
            <h2 className="text-gray-100 font-medium text-2xl mb-2">{title}</h2>
            <div className="text-gray-400">{date}</div>
            <span className="px-2 font-medium pb-1 text-white  rounded-xl bg-gray-500 inline-block">
              {tag}
            </span>
          </div>
          <p className="text-gray-100 ">{description}</p>
        </section>
      )}
    </Link>
  );
};

export default SinglePost;
