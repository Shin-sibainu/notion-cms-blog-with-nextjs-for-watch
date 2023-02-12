import Link from "next/link";
import React from "react";

type Props = {
  totalCount: number;
};

const Pagination = (props: Props) => {
  const { totalCount } = props;

  const PER_PAGE = 4;

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);
  // console.log(range(1, 10)); //[1,2,3,4,5,6,7,8,9,10]

  return (
    <section className="mb-8 lg:w-1/2 mx-auto rounded-md p-5">
      <ul className="flex items-center justify-center gap-4">
        {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
          <li key={index} className="bg-sky-900 rounded-full w-6 h-6 relative">
            <Link
              href={`/posts/page/${number}`}
              className="text-xs absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-gray-100"
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Pagination;
