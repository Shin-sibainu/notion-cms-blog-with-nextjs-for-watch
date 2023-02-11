import Link from "next/link";
import React from "react";

type Props = {
  slug: string;
  title: string;
  date: string;
  description: string;
};

const SinglePost = (props: Props) => {
  const { slug, title, date, description } = props;

  return (
    <Link href={`posts/${slug}`}>
      <section className="mb-12 lg:w-1/2 mx-auto bg-sky-900 rounded-md p-5">
        <div className="flex items-center">
          <h2 className="text-gray-100 font-medium text-2xl mb-2 mr-2">
            {title}
          </h2>
          <div className="text-gray-400">{date}</div>
        </div>
        <p className="text-gray-100 ">{description}</p>
      </section>
    </Link>
  );
};

export default SinglePost;
