import MainLayout from "@/layouts/main-layout";

import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPageContext,
} from "next";
import { useRouter } from "next/router";
import { IPost } from ".";
import { useEffect, useState } from "react";

interface Props {
  post: IPost;
}

export default function Post({ post: serverPost }: Props) {
  const router = useRouter();

  const [post, setPost] = useState(serverPost);

  useEffect(() => {
    async function load() {
      const res = await fetch(
        `${process.env.API_URL}/posts/${router.query.id}`
      );
      const data = await res.json();
      setPost(data);
    }

    if (!post) load();
  }, []);

  if (!post) {
    return (
      <MainLayout>
        <p>Loading...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <button onClick={() => router.back()}>go back</button>

      <h1>{post.title}</h1>
      <hr />
      <p>{post.description}</p>
    </MainLayout>
  );
}

interface PostNextPageContext extends NextPageContext {
  query: {
    id: string;
  };
}

export async function getServerSideProps({ query, req }: PostNextPageContext) {
  const res = await fetch(`${process.env.API_URL}/posts/${query.id}`);
  const post = await res.json();
  return { props: { post } }; // вернуть нужно объект
}
