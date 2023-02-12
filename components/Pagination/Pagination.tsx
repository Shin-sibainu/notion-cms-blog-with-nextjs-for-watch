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
      <ul>
        {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
          <li key={index}>
            <Link href={`/posts/page/${number}`}>{number}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Pagination;
