import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export interface PostMetaData {
  id: string;
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
}

export type NotionPage = DatabaseObjectResponse;
