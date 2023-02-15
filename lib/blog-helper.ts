export const getTagLink = (tag: string) => {
  return `/blog/tag/${encodeURIComponent(tag)}`;
};

export const getPageLink = (page: number, tag: string) => {
  if (page === 1) {
    return tag ? getTagLink(tag) : "/posts/page/1";
  }
  return tag
    ? // ? `posts/tag/${encodeURIComponent(tag)}/page/${page.toString()}`
      `/posts/tag/${encodeURIComponent(tag)}/page/${page}`
    : `/posts/page/${page.toString()}`;
};
