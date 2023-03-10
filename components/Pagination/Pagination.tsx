import Link from "next/link";
import React from "react";
import { getPageLink } from "../../lib/blog-helper";
import { NUMBER_OF_POSTS_PER_PAGE } from "../../src/server_constants";

// type Props = {
//   totalCount: number;
// };

export interface Props {
  currentPage: number;
  numberOfPage: number; //全ページ数
  tag: string;
}

const Pagination = (props: Props) => {
  const { currentPage, numberOfPage, tag } = props;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === numberOfPage;

  const startPage = currentPage - 2 < 1 ? 1 : currentPage - 2;
  const endPage =
    currentPage + 2 > numberOfPage ? numberOfPage : currentPage + 2;

  /* TODO:タグ検索のとき1,2,3まででてきてしまう。3はいらない。 */
  let pages = [];

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // const range = (start: number, end: number) =>
  //   [...Array(end - start + 1)].map((_, i) => start + i);
  // console.log(range(1, 10)); //[1,2,3,4,5,6,7,8,9,10]

  return (
    <section className="mb-8 lg:w-1/2 mx-auto rounded-md p-5">
      <ul className="flex items-center justify-center gap-4">
        <Link
          href={getPageLink(1, tag)}
          className={isFirstPage && "pointer-events-none"}
        >
          &lt;&lt;
        </Link>
        {pages.map((page: number, index) => (
          <li key={index} className="bg-sky-900 rounded-lg w-6 h-8 relative">
            <Link
              href={getPageLink(page, tag)}
              className={
                page === currentPage
                  ? `text-xs absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 pointer-events-none`
                  : `text-xs absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-gray-100`
              }
            >
              {page}
            </Link>
          </li>
        ))}
        <Link
          href={getPageLink(numberOfPage, tag)}
          className={isLastPage && "pointer-events-none"}
        >
          &gt;&gt;
        </Link>
      </ul>
    </section>
  );
};

export default Pagination;
