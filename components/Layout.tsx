import React, { useEffect, useState } from "react";
import { getAllTags, getPosts } from "../lib/notion";
import Navbar from "./Navbar/Navbar";

const Layout = ({ children }) => {
  // const [allTags, setAllTags] = useState<string[]>([]);

  // useEffect(() => {
  //   const fetchAllTags = async () => {
  //     const allTags = await getAllTags();
  //     setAllTags(allTags);
  //   };
  //   fetchAllTags();
  // }, []);

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
